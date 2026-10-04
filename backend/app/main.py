from fastapi import FastAPI
from sqlalchemy import text

from app.database.connection import engine


app = FastAPI(
    title="Pharmacy Management API",
    description="REST API for pharmacy inventory management.",
    version="0.2.0",
)


@app.get("/")
def root():
    return {
        "message": "Pharmacy Management API is running."
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.get("/database-health")
def database_health():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "database": "connected"
        }

    except Exception:
        return {
            "database": "disconnected"
        }