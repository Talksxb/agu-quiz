"""Exporta uma edição compilada para Word/PDF de revisão, sem publicar.

Dependências opcionais: python-docx, reportlab e PyMuPDF. Os JSON do leitor
devem ter sido validados por `node scripts/metodo-agu.cjs --check`.
"""
import argparse
import hashlib
import io
import json
import re
import zipfile
from datetime import datetime
from html import escape
from pathlib import Path


def export_chapter(root, chapter_id, destination):
    from docx import Document
    from docx.shared import Inches, Pt
    from reportlab.lib import colors
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont
    from reportlab.pdfgen import canvas
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, LongTable, TableStyle
    import fitz

    if not re.fullmatch(r"[a-z0-9-]+", chapter_id):
        raise ValueError("ID de capítulo inválido")
    metadata = json.loads((root / "livros/metodo" / (chapter_id + ".json")).read_text())
    reader = json.loads((root / metadata["readerPath"]).read_text())
    destination.mkdir(parents=True, exist_ok=True)
    font = Path("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf")
    if not font.exists():
        raise RuntimeError("Fonte DejaVuSerif ausente; instalar fonts-dejavu-core para preservar Unicode")
    pdfmetrics.registerFont(TTFont("AGUSerif", str(font)))
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name="AGUText", fontName="AGUSerif", fontSize=10.5, leading=15, spaceAfter=9))
    styles.add(ParagraphStyle(name="AGUSmall", parent=styles["AGUText"], fontSize=8, leading=11))
    for h in ("Title", "Heading1", "Heading2", "Heading3"):
        styles[h].fontName = "AGUSerif"
    word = Document()
    word.styles["Normal"].font.name = "DejaVu Serif"
    word.styles["Normal"].font.size = Pt(11)
    word.core_properties.title = metadata["title"]
    word.core_properties.author = "Projeto AGU — edição de revisão"
    fixed_date = datetime.strptime(metadata["dates"]["edition"], "%Y-%m-%d")
    word.core_properties.created = fixed_date
    word.core_properties.modified = fixed_date
    story = []
    report = {"schema": "agu-review-export-v1", "id": chapter_id, "edition": metadata["edition"],
              "sourceSha256": metadata["sourceSha256"], "inputSha256": metadata["inputSha256"],
              "sectionHashes": [], "visualDifferences": list(metadata.get("visualDifferences", [])),
              "publication": "revisao; sem aprovação nem publicação automática"}

    def paragraph(text, heading=0, small=False):
        if heading:
            word.add_heading(text, level=min(heading, 4))
        else:
            word.add_paragraph(text)
        style = styles["Heading" + str(min(heading, 3))] if heading else styles["AGUSmall" if small else "AGUText"]
        story.append(Paragraph(escape(text).replace("\n", "<br/>"), style))

    paragraph(metadata["title"], 1)
    paragraph("EDIÇÃO PARA REVISÃO — " + metadata["edition"])
    paragraph("Fonte editorial: " + metadata["canonical"] + " · SHA-256 " + metadata["sourceSha256"], small=True)
    paragraph("Datas: edição " + metadata["dates"]["edition"] + "; corte histórico " + metadata["dates"]["auditCutoff"] +
              "; consulta jurídica " + metadata["dates"]["legalConsultation"], small=True)
    paragraph("Leitura, produção editorial, auditoria e domínio são estados independentes.", small=True)
    for section, page in zip(metadata["sections"], reader["pages"]):
        digest = hashlib.sha256(page["text"].encode()).hexdigest()
        if digest != section["sha256"]:
            raise ValueError("Fonte/compilação divergente na seção " + section["id"])
        report["sectionHashes"].append({"id": section["id"], "sha256": digest})
        paragraph(section["title"], 2)
        # Não reconstruir direito, remover qualificações nem corrigir a extração.
        # Delimitadores inline permanecem visíveis para o revisor confrontá-los.
        for block in re.split(r"\n\s*\n", page["text"]):
            if block.strip():
                heading = re.fullmatch(r"(#{1,6})\s+([^\n]+)", block.strip())
                paragraph(heading[2] if heading else block, min(len(heading[1]) + 1, 4) if heading else 0)
        for resource in metadata["resources"]:
            if resource["sectionId"] != section["id"]:
                continue
            paragraph(resource["title"], 3)
            if resource["type"] == "figure":
                asset = (root / resource["src"]).resolve()
                if root.resolve() not in asset.parents:
                    raise ValueError("Recurso fora do projeto")
                svg = fitz.open(stream=asset.read_bytes(), filetype="svg")
                image = svg[0].get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False)
                data = image.tobytes("png")
                svg.close()
                pic = word.add_picture(io.BytesIO(data), width=Inches(6))
                pic._inline.docPr.set("descr", resource["alt"])
                width = 470
                height = width * image.height / image.width
                if height > 630:
                    width *= 630 / height
                    height = 630
                story.extend([Image(io.BytesIO(data), width=width, height=height), Spacer(1, 8)])
            else:
                table = word.add_table(rows=0, cols=len(resource["rows"][0]))
                table.style = "Table Grid"
                for row in resource["rows"]:
                    for cell, value in zip(table.add_row().cells, row):
                        cell.text = value
                pdf_table = LongTable([[Paragraph(escape(v), styles["AGUSmall"]) for v in row] for row in resource["rows"]],
                                      colWidths=[470 / len(resource["rows"][0])] * len(resource["rows"][0]), repeatRows=1)
                pdf_table.setStyle(TableStyle([("GRID", (0, 0), (-1, -1), .4, colors.grey),
                                               ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#e9f4f2")),
                                               ("VALIGN", (0, 0), (-1, -1), "TOP")]))
                story.append(pdf_table)
            paragraph("Alternativa textual: " + resource["alt"], small=True)
    report["visualDifferences"].append("Word/PDF de revisão: paginação própria; delimitadores Markdown inline visíveis; SVG rasterizado em alta resolução com alternativa textual. A fonte SVG e o texto canônico permanecem versionados.")
    paragraph("Relatório da transposição", 2)
    for difference in report["visualDifferences"]:
        paragraph(difference, small=True)
    docx = destination / (chapter_id + "_revisao.docx")
    pdf = destination / (chapter_id + "_revisao.pdf")
    word.save(docx)
    # ZIP determinístico: repetir a mesma edição não cria uma variante por relógio.
    original = io.BytesIO(docx.read_bytes())
    with zipfile.ZipFile(original) as source, zipfile.ZipFile(docx, "w", compression=zipfile.ZIP_DEFLATED) as target:
        for name in sorted(source.namelist()):
            entry = zipfile.ZipInfo(name, (2026, 1, 1, 0, 0, 0))
            entry.compress_type = zipfile.ZIP_DEFLATED
            target.writestr(entry, source.read(name))

    def invariant_canvas(*args, **kwargs):
        kwargs["invariant"] = 1
        return canvas.Canvas(*args, **kwargs)

    SimpleDocTemplate(str(pdf), title=metadata["title"], author="Projeto AGU", leftMargin=54, rightMargin=54,
                      topMargin=48, bottomMargin=48).build(story, canvasmaker=invariant_canvas)
    report["outputs"] = [{"file": p.name, "sha256": hashlib.sha256(p.read_bytes()).hexdigest()} for p in (docx, pdf)]
    (destination / (chapter_id + "_diferencas.json")).write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    return report


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--chapter", required=True)
    parser.add_argument("--out", type=Path, required=True)
    args = parser.parse_args()
    result = export_chapter(Path(__file__).resolve().parents[1], args.chapter, args.out)
    print(json.dumps({"id": result["id"], "outputs": result["outputs"], "report": "diferenças declaradas; sem publicação"}, ensure_ascii=False))
