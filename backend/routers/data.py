from fastapi import APIRouter
import pandas as pd
import os

router = APIRouter()
DATA_PATH = "./data/csv"

@router.get("/csv/{filename}")
def get_csv_data(filename: str):
    filepath = os.path.join(DATA_PATH, filename)
    if not os.path.exists(filepath):
        return {"error": "File not found"}
    df = pd.read_csv(filepath)
    return df.to_dict(orient="records")
