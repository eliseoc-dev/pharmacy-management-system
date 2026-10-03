from fastapi import FastAPI


app = FastAPI(
    title="Pharmacy Management API",
    description="REST API for pharmacy inventory management.",
    version="0.1.0",
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