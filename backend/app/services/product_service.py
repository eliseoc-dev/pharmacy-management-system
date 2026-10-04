from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.product_repository import (
    create_product,
    delete_product,
    get_product_by_id,
    get_products,
    update_product,
)
from app.schemas.product import ProductCreate, ProductUpdate


def create_new_product(
    db: Session,
    product_data: ProductCreate,
):
    return create_product(db, product_data)


def list_all_products(db: Session):
    return get_products(db)


def get_existing_product(
    db: Session,
    product_id: int,
):
    product = get_product_by_id(db, product_id)

    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found.",
        )

    return product


def update_existing_product(
    db: Session,
    product_id: int,
    product_data: ProductUpdate,
):
    product = get_existing_product(db, product_id)

    return update_product(
        db,
        product,
        product_data,
    )


def delete_existing_product(
    db: Session,
    product_id: int,
) -> None:
    product = get_existing_product(db, product_id)

    delete_product(db, product)