from fastapi import APIRouter, Query
import pandas as pd
import os

router = APIRouter()
SCENARIO_DIR = "./data/csv"


@router.get("/metrics")
def get_combined_metrics(res: float = Query(..., ge=0.1, le=0.6)):
    cost_df = pd.read_csv(os.path.join(SCENARIO_DIR, "cost_vs_tariff.csv"))
    emissions_df = pd.read_csv(os.path.join(SCENARIO_DIR, "emissions_by_carrier.csv"))
    ramping_df = pd.read_csv(os.path.join(SCENARIO_DIR, "thermal_ramping.csv"))

    cost_row = cost_df[cost_df["res_share"] == res].iloc[0]
    emissions_row = emissions_df[emissions_df["RES Share"] == res].iloc[0]
    ramping_row = ramping_df[ramping_df["res_share"] == res].iloc[0]

    return {
        "total_cost": cost_row["total_cost"],
        "tariff": cost_row["tariff"],
        "emissions": {
            "CCGT": emissions_row["CCGT"],
            "OCGT": emissions_row["OCGT"],
            "coal": emissions_row["coal"]
        },
        "thermal_ramping": ramping_row["thermal_ramping"]
    }

@router.get("/generation-mix")
def get_generation_mix(res: float = Query(..., ge=0.1, le=0.6)):
    file_path = os.path.join(SCENARIO_DIR, "generation_by_carrier.csv")
    if not os.path.exists(file_path):
        return {"error": "generation_by_carrier.csv not found"}

    df = pd.read_csv(file_path)
    
    # Убедимся, что колонка res_share в виде float
    df["res_share"] = df["res_share"].str.replace("%", "").astype(float) / 100

    row = df[df["res_share"] == res]
    if row.empty:
        return {"error": f"No generation data for RES {res}"}

    row = row.iloc[0]

    # Вернём нужные значения по источникам
    return {
        "coal": row["coal [GWh]"],
        "CCGT": row["CCGT [GWh]"],
        "OCGT": row["OCGT [GWh]"],
        "onwind": row["onwind [GWh]"],
        "solar": row["solar [GWh]"],
        "ror": row["ror [GWh]"]
    }

@router.get("/system-cost-breakdown")
def get_system_cost_breakdown(res: float = Query(..., ge=0.1, le=0.6)):
    file_path = os.path.join(SCENARIO_DIR, "cost_table_by_carriers.csv")
    if not os.path.exists(file_path):
        return {"error": "cost_table_by_carriers.csv not found"}

    df = pd.read_csv(file_path)

    res_col = f"RES {int(res * 100)}%"

    if res_col not in df.columns:
        return {"error": f"{res_col} not found in table"}

    records = []
    for _, row in df.iterrows():
        records.append({
            "cost_type": row["Cost types"],
            "carrier": row["Carriers"],
            "value": row[res_col]
        })

    return records

@router.get("/daily-profiles")
def get_daily_profiles(res: float = Query(..., ge=0.1, le=0.6)):
    profile_dir = os.path.join(SCENARIO_DIR, "daily_profiles")
    res_int = int(res * 100)

    def load_profile(season):
        file_name = f"{season}_day_RES{res_int}.csv"
        path = os.path.join(profile_dir, file_name)

        if not os.path.exists(path):
            return {"error": f"{file_name} not found"}

        df = pd.read_csv(path)

        # Format time labels like "00:00", "01:00", etc.
        labels = df["snapshot"].apply(lambda x: x.split(" ")[1][:5]).tolist()

        carriers = [col for col in df.columns if col != "snapshot"]
        colors = {
            "Load": "black",
            "coal": "#7f7f7f",
            "CCGT": "#1f77b4",
            "OCGT": "#ff7f0e",
            "onwind": "#2ca02c",
            "solar": "#d62728",
            "ror": "#9467bd",
            "battery": "#8c564b",
            "hydro": "#17becf"
        }


        datasets = []
        for carrier in carriers:
            datasets.append({
                "label": carrier,
                "data": df[carrier].round(2).tolist(),
                "backgroundColor": colors.get(carrier, "#ccc"),
                "borderColor": colors.get(carrier, "#ccc"),
                "fill": carrier != "Load",
                "borderWidth": 2 if carrier == "Load" else 1,
                "pointRadius": 0,
                "tension": 0.4,
                "borderDash": [6, 3] if carrier == "Load" else []
            })


        return {
            "labels": labels,
            "datasets": datasets
        }

    return {
        "winter": load_profile("winter"),
        "summer": load_profile("summer")
    }
