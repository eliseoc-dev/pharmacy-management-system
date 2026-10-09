from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.supplier import Supplier
from app.schemas.supplier import SupplierCreate


def create_supplier(
    db: Session,
    data: SupplierCreate,
) -> Supplier:
    supplier = Supplier(
        **data.model_dump()
    )

    db.add(supplier)
    db.commit()
    db.refresh(supplier)

    return supplier


def get_suppliers(
    db: Session,
) -> list[Supplier]:
    statement = select(Supplier).order_by(
        Supplier.name.asc()
    )

    return list(
        db.scalars(statement).all()
    )