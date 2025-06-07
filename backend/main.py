# from fastapi import FastAPI
# from routers import overview, scenario, map
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()

# # CORS for frontend communication
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(overview.router, prefix="/overview")
# app.include_router(scenario.router, prefix="/scenario")
# app.include_router(map.router, prefix="/map")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse
import os

from backend.routers import overview, scenario, map

app = FastAPI()

# CORS для взаимодействия фронта с API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем API роутеры
app.include_router(overview.router, prefix="/overview")
app.include_router(scenario.router, prefix="/scenario")
app.include_router(map.router, prefix="/map")

# Путь до собранной React статики
current_dir = os.path.dirname(__file__)
static_path = os.path.abspath(os.path.join(current_dir, "..", "static"))

# Отдаём только JS/CSS и ассеты по пути /static/*
app.mount("/static", StaticFiles(directory=os.path.join(static_path, "static")), name="static")

# SPA fallback: любые другие пути → index.html
@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    return FileResponse(os.path.join(static_path, "index.html"))
