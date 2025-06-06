import os
import pypsa

data_path = "./data"
res_levels = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6]

def get_summary_data():
    results = []
    for res in res_levels:
        filename = f"elec_s_14_ec_lv1.0_RES{res}-1H_dle.nc"
        full_path = os.path.join(data_path, filename)
        if not os.path.exists(full_path):
            continue
        n = pypsa.Network(full_path)
        co2_emissions = (
            n.generators_t.p
            .div(n.generators.efficiency)
            .mul(n.generators.carrier.map(n.carriers.co2_emissions))
            .sum()
        )
        results.append({
            "res": res,
            "co2_mt": co2_emissions.sum() / 1e6,
            "cost": n.objective / 1e6,
        })
    return results

def get_scenario_details(res):
    filename = f"./data/elec_s_14_ec_lv1.0_RES{res}-1H_dle.nc"
    if not os.path.exists(filename):
        return {"error": "File not found"}
    n = pypsa.Network(filename)

    co2 = (
        n.generators_t.p
        .div(n.generators.efficiency)
        .mul(n.generators.carrier.map(n.carriers.co2_emissions))
        .sum()
        .sum() / 1e6
    )

    cost = n.objective / 1e6
    ramping = n.generators_t.p.diff().abs().sum().sum() / 1e3
    tariff = cost / n.loads_t.p_set.sum().sum()

    gen_mix = (
        n.generators_t.p.groupby(n.generators.carrier, axis=1)
        .sum()
        .mean()
        .to_dict()
    )

    return {
        "res": res,
        "co2_mt": co2,
        "total_cost": cost,
        "tariff": tariff,
        "ramping": ramping,
        "generation_mix": gen_mix,
    }

import geopandas as gpd
import json

def get_geo_layers():
    wind = gpd.read_file("data/maps/wind.geojson")
    solar = gpd.read_file("data/maps/solar.geojson")
    plants = gpd.read_file("data/maps/thermal_plants.geojson")
    lines = gpd.read_file("data/maps/transmission_lines.geojson")

    return {
        "wind": json.loads(wind.to_json()),
        "solar": json.loads(solar.to_json()),
        "thermal": json.loads(plants.to_json()),
        "grid": json.loads(lines.to_json())
    }
