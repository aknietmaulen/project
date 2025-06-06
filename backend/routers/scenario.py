from fastapi import APIRouter, Query
from pypsa_reader import get_geo_layers, get_scenario_details

router = APIRouter()

@router.get("/details")
def fetch_scenario_data(res: float = Query(...)):
    return get_scenario_details(res)

@router.get("/map_data")
def get_map_layers():
    return get_geo_layers()
