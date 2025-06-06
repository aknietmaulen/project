from fastapi import APIRouter
import pandas as pd
import os

router = APIRouter()
DATA_DIR = "./data/csv"

# 1. For SystemCostChart.jsx => cost_vs_tariff.csv
@router.get("/cost-tariff")
def get_cost_vs_tariff():
    file_path = os.path.join(DATA_DIR, "cost_vs_tariff.csv")
    if not os.path.exists(file_path):
        return {"error": "File not found"}
    df = pd.read_csv(file_path)
    return df.to_dict(orient="records")

# 2. For CarrierCostTable.jsx => cost_table_by_carriers.csv
@router.get("/carrier-costs")
def get_cost_table_by_carriers():
    file_path = os.path.join(DATA_DIR, "cost_table_by_carriers.csv")
    if not os.path.exists(file_path):
        return {"error": "File not found"}
    df = pd.read_csv(file_path)
    return df.to_dict(orient="records")

# 3. For CostBreakdown.jsx => system_cost_components.csv
@router.get("/cost-breakdown")
def get_system_cost_breakdown():
    file_path = os.path.join(DATA_DIR, "system_cost_components.csv")
    if not os.path.exists(file_path):
        return {"error": "File not found"}
    df = pd.read_csv(file_path)
    return df.to_dict(orient="records")

@router.get("/ramping")
def get_ramping_curve():
    path = "./data/csv/thermal_ramping.csv"
    if not os.path.exists(path):
        return {"error": "File not found"}
    df = pd.read_csv(path)
    return df.to_dict(orient="records")

@router.get("/generation-mix")
def get_generation_mix():
    path = "./data/csv/generation_mix.csv"
    if not os.path.exists(path):
        return {"error": "File not found"}
    df = pd.read_csv(path)
    return df.to_dict(orient="records")

@router.get("/emissions")
def get_emissions():
    path = "./data/csv/emissions.csv"
    if not os.path.exists(path):
        return {"error": "File not found"}
    df = pd.read_csv(path)
    return df.to_dict(orient="records")