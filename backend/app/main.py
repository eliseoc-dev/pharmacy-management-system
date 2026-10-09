from fastapi import FastAPI
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from fastapi.responses import JSONResponse
from app.api.products import router as products_router
from app.database.connection import Base, engine
from app.api.categories import router as categories_router
from app.api.suppliers import router as suppliers_router


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Pharmacy Management API",
    description="REST API for pharmacy inventory management.",
    version="0.3.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(
    request: Request,
    exc: Exception,
):
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server error."
        },
    )


app.include_router(products_router)
app.include_router(categories_router)
app.include_router(suppliers_router)


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