from fastapi import FastAPI
from sqlalchemy import text

from app.api.products import router as products_router
from app.database.connection import Base, engine
from app.models import Product


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Pharmacy Management API",
    description="REST API for pharmacy inventory management.",
    version="0.3.0",
)


app.include_router(products_router)


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