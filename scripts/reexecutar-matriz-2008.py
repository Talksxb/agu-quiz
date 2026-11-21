#!/usr/bin/env python3
"""Reexecução verificável de 2.008 chaves, a partir de snapshots oficiais íntegros.

Uso: python scripts/reexecutar-matriz-2008.py CC.html CPC.html --saida saida.csv
O programa NÃO altera o corpus e NÃO certifica a vigência jurídica.
"""
import argparse
import csv
import hashlib
import importlib.util
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMPARATOR = ROOT / "scripts/cotejar-biblioteca-lote04.py"
MATRIX = ROOT / "docs/dados/BIBLIOTECA_MATRIZ_TRANSICAO_2008_IDS_2026-11-21.csv"
MIRROR = ROOT / "docs/dados/BIBLIOTECA_HASHES_ESPELHO_2008_2026-11-21.csv"
EXPECTED_SOURCE = {
    "L10406": ("6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90", 1571920),
    "L13105": ("0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821", 938199),
}

def load_csv(path):
    with path.open(newline="", encoding="utf-8") as stream:
        rows = list(csv.DictReader(stream, delimiter=";"))
    keys = [row["id"] for row in rows]
    if len(keys) != len(set(keys)):
        raise ValueError(f"IDs repetidos em {path}")
    return {row["id"]: row for row in rows}

def validate_source(path, law):
    data = path.read_bytes()
    sha = hashlib.sha256(data).hexdigest()
    expected_sha, expected_len = EXPECTED_SOURCE[law]
    if sha != expected_sha or len(data) != expected_len:
        raise ValueError(f"Fonte {law} não reproduz snapshot histórico: {len(data)} bytes, SHA={sha}")
    return sha

def run(cc, cpc, output):
    source_sha = {"L10406": validate_source(cc, "L10406"),
                  "L13105": validate_source(cpc, "L13105")}
    history = load_csv(MATRIX)
    mirror_hashes = load_csv(MIRROR)
    if len(history) != 2008 or set(history) != set(mirror_hashes):
        raise ValueError("Universo histórico não possui exatamente as mesmas 2.008 chaves")
    spec = importlib.util.spec_from_file_location("cotejar", COMPARATOR)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    extracted = mod.run(str(cc), str(cpc), 1, 1000)
    all_results = {row["id"]: row for row in extracted["rows"]}
    if len(extracted["rows"]) != len(all_results):
        raise ValueError("Comparador emitiu IDs duplicados")
    if not set(history).issubset(all_results):
        raise ValueError(f"Chaves ausentes: {sorted(set(history) - set(all_results))}")
    extra = sorted(set(all_results) - set(history))
    # Marcadores de veto e vigência futura, fora do universo do espelho.
    if set(extra) != {"L10406:art69-A", "L13105:art529-A"}:
        raise ValueError(f"Chaves oficiais extras inesperadas: {extra}")
    rows = []
    for id in sorted(history):
        actual, previous, reference = all_results[id], history[id], mirror_hashes[id]
        if actual["mirror_sha256"] != reference["espelho_sha256_normalizado"]:
            raise ValueError(f"Espelho mudou para {id}: hash divergente")
        if not actual["mirror_present"]:
            raise ValueError(f"Espelho sem artigo {id}")
        rows.append({
            "id": id,
            "classe_historica": previous["classe_historica_por_id"],
            "classe_nova": actual["comparison_class"],
            "espelho_sha256": actual["mirror_sha256"],
            "oficial_sha256": actual["official_sha256"],
            "oficial_presente_individualmente": actual["official_present"],
            "intervalo_revogado": str(actual.get("official_revocation_range") or ""),
            "sha256_html_oficial": source_sha[id.split(":")[0]],
        })
    classes = Counter(row["classe_nova"] for row in rows)
    editoriais = [row["id"] for row in rows
                  if row["classe_nova"] == "diferenca_aparente_restrita_a_nota_editorial_revisar"]
    antigos = Counter((row["classe_historica"], row["classe_nova"]) for row in rows)
    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open("w", newline="", encoding="utf-8") as stream:
        writer = csv.DictWriter(stream, fieldnames=list(rows[0]), delimiter=";")
        writer.writeheader()
        writer.writerows(rows)
    print("IDs:", len(rows))
    print("Classes novas:", dict(classes))
    print("Editorial por ID:", editoriais)
    print("Matriz transição:", dict(antigos))
    print("Marcadores fora do universo:", extra)
    print("CSV gerado:", output)
    print("Importante: diferença textual inclui divergências editoriais ou gráficas não certificadas.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("cc", type=Path)
    parser.add_argument("cpc", type=Path)
    parser.add_argument("--saida", type=Path, default=Path("matriz-2008-reexecutada.csv"))
    args = parser.parse_args()
    run(args.cc, args.cpc, args.saida)
