"""Ensaio de transposição para revisão; não publica capítulos."""
import importlib.util
import json
import tempfile
from pathlib import Path
from docx import Document
import fitz
import jsonschema

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("exporter", ROOT / "scripts/exportar-metodo-agu.py")
exporter = importlib.util.module_from_spec(spec)
spec.loader.exec_module(exporter)

for file in json.loads((ROOT / "livros/editorial/catalogo.json").read_text())["chapters"]:
    jsonschema.validate(json.loads((ROOT / file).read_text()), json.loads((ROOT / "schemas/metodo-agu/capitulo.schema.json").read_text()))
for card in json.loads((ROOT / "livros/candidatos/cartoes.json").read_text())["cards"]:
    jsonschema.validate(card, json.loads((ROOT / "schemas/metodo-agu/cartao.schema.json").read_text()))

with tempfile.TemporaryDirectory(prefix="agu-review-") as folder:
    out = Path(folder)
    report = exporter.export_chapter(ROOT, "amb-03", out)
    first = report["outputs"]
    assert exporter.export_chapter(ROOT, "amb-03", out)["outputs"] == first, "Mesma edição deve produzir os mesmos hashes de revisão"
    word = Document(out / "amb-03_revisao.docx")
    assert len(word.inline_shapes) == 4 and len(word.tables) == 2
    assert all(len(shape._inline.docPr.get("descr", "")) > 50 for shape in word.inline_shapes)
    pdf = fitz.open(out / "amb-03_revisao.pdf")
    assert sum(len(p.get_images()) for p in pdf) == 4
    assert "Competências e Cooperação Ambiental" in pdf[0].get_text()
    assert len(report["sectionHashes"]) == 17 and report["visualDifferences"]
    assert "não há aplicação da regra de transição" in "\n".join(p.text for p in word.paragraphs)
    pdf.close()
print("METODO_AGU_EXPORTACAO_OK: schemas, duas exportações idempotentes, 17 seções, 4 figuras com alternativas, 2 tabelas e diferenças explícitas")
