from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_root():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json()["message"] == (
        "Pharmacy Management API is running."
    )


def test_health():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_products_endpoint_exists():
    response = client.get("/products")

    assert response.status_code == 200
    assert isinstance(response.json(), list)