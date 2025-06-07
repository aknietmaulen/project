from fastapi import APIRouter
import xarray as xr
import os
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data","renewable_profiles")

router = APIRouter()
@router.get("/solar/points")
def get_solar_points():
    # path = "./data/renewable_profiles/profile_solar.nc"
    file_path = os.path.join(DATA_DIR, "profile_solar.nc")
    if not os.path.exists(file_path):
        return {"error": "File not found"}

    ds = xr.open_dataset(file_path)
    data = ds["potential"]
    lons = ds["x"].values
    lats = ds["y"].values
    z = data.values

    # Flatten grid into point cloud
    points = []
    for i, lat in enumerate(lats):
        for j, lon in enumerate(lons):
            value = float(z[i][j])
            if not np.isnan(value):
                points.append({"lat": lat, "lon": lon, "value": value})

    return points

@router.get("/wind/points")
def get_wind_points():
    file_path = os.path.join(DATA_DIR, "profile_onwind.nc")

    if not os.path.exists(file_path):
        return {"error": "File not found"}

    ds = xr.open_dataset(file_path)
    data = ds["potential"]
    lons = ds["x"].values
    lats = ds["y"].values
    z = data.values

    # Flatten grid into point cloud
    points = []
    for i, lat in enumerate(lats):
        for j, lon in enumerate(lons):
            value = float(z[i][j])
            if not np.isnan(value):
                points.append({"lat": lat, "lon": lon, "value": value})

    return points

