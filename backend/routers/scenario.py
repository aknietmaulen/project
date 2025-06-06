from fastapi import APIRouter, Query

router = APIRouter()

@router.get("/details")
def fetch_scenario_data(res: float = Query(...)):
    # Заглушка: вернём фиктивные данные
    return {
        "res": res,
        "tariff": 0.045,
        "ramping": 120.0,
        "co2_mt": 25.3,
        "total_cost": 5000,
        "generation_mix": {
            "coal": 60,
            "solar": 20,
            "wind": 10,
            "hydro": 10
        }
    }
