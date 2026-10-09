from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.repositories.supplier_repository import (
    create_supplier,
    get_suppliers,
)
from app.schemas.supplier import (
    SupplierCreate,
    SupplierResponse,
)


router = APIRouter(
    prefix="/suppliers",
    tags=["Suppliers"],
)


@router.post(
    "",
    response_model=SupplierResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_supplier_endpoint(
    data: SupplierCreate,
    db: Session = Depends(get_db),
):
    return create_supplier(db, data)


@router.get(
    "",
    response_model=list[SupplierResponse],
)
def list_suppliers_endpoint(
    db: Session = Depends(get_db),
):
    return get_suppliers(db)