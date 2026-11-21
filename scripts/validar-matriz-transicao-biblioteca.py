#!/usr/bin/env python3
"""Validação estrutural da matriz nominal da Biblioteca (sem certificação jurídica).

Uso: python scripts/validar-matriz-transicao-biblioteca.py
"""
import csv
from collections import Counter
from pathlib import Path

CSV = Path(__file__).resolve().parents[1] / "docs/dados/BIBLIOTECA_MATRIZ_TRANSICAO_2008_IDS_2026-11-21.csv"

def validar(path=CSV):
    with path.open(encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f, delimiter=";"))
    assert len(rows) == 2008, f"Linhas inválidas: {len(rows)}"
    ids = [r["id"] for r in rows]
    assert len(set(ids)) == 2008, "IDs duplicados"
    expected = {f"{law}:art{n}" for law in ("L10406", "L13105") for n in range(1, 1001)}
    expected.update(f"L10406:art{s}" for s in ("48-A", "49-A", "206-A", "421-A", "819-A", "853-A", "980-A"))
    expected.add("L13105:art699-A")
    assert set(ids) == expected, "Universo de IDs com lacunas/excessos"
    by_id = {r["id"]: r for r in rows}
    old = Counter(r["classe_historica_por_id"] for r in rows)
    new = Counter(r["classe_reconciliada_por_id"] for r in rows)
    assert old == {
        "texto_identico": 1673, "diferenca_textual": 113,
        "dispositivo_ausente": 48, "identico_ou_editorial_nao_individualizado": 174,
    }, old
    assert new == {
        "texto_identico": 1678, "diferenca_textual": 110,
        "revogacao_agrupada_documentada": 46,
        "identico_ou_editorial_nao_individualizado": 174,
    }, new
    changed = {r["id"] for r in rows
               if r["classe_historica_por_id"] != r["classe_reconciliada_por_id"]}
    rev = {f"L10406:art{n}" for n in range(757, 803)}
    fixed = {"L10406:art756", "L10406:art999", "L13105:art999",
             "L10406:art1000", "L13105:art1000"}
    assert changed == rev | fixed, f"Transições inesperadas: {changed ^ (rev | fixed)}"
    assert all(by_id[id]["classe_reconciliada_por_id"] == "revogacao_agrupada_documentada" for id in rev)
    assert all(by_id[id]["classe_reconciliada_por_id"] == "texto_identico" for id in fixed)
    ambiguous = [r for r in rows
                 if r["classe_reconciliada_por_id"] == "identico_ou_editorial_nao_individualizado"]
    assert len(ambiguous) == 174
    assert all(901 <= int(r["numero_base"]) <= 1000 for r in ambiguous)
    print("OK: 2.008 IDs únicos; 51 transições; 46 revogações; 174 candidatos com 1 nota editorial não localizada.")
    print("Conciliação agregada condicionada: 1.851 idênticos, 110 diferenças textuais, 1 editorial, 46 revogações.")
    print("Não comprova reexecução integral nem classifica diferenças como erro jurídico material.")

if __name__ == "__main__":
    validar()
