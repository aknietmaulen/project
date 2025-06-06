from fastapi import APIRouter
import pandas as pd
from pypsa_reader import get_summary_data

router = APIRouter()

@router.get("/metrics")
def fetch_metrics():
    return get_summary_data()