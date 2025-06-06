from fastapi import FastAPI
from routers import overview, scenario
from fastapi.middleware.cors import CORSMiddleware
from routers import data

app = FastAPI()

# CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(overview.router, prefix="/overview")
app.include_router(scenario.router, prefix="/scenario")
app.include_router(data.router, prefix="/data")
