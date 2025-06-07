from fastapi import APIRouter
import xarray as xr
import os
import numpy as np

router = APIRouter()
@router.get("/solar/points")
def get_solar_points():
    path = "./data/renewable_profiles/profile_solar.nc"
    if not os.path.exists(path):
        return {"error": "File not found"}

    ds = xr.open_dataset(path)
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
    path = "./data/renewable_profiles/profile_onwind.nc"
    if not os.path.exists(path):
        return {"error": "File not found"}

    ds = xr.open_dataset(path)
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

