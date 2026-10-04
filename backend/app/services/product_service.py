from datetime import date, timedelta

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.product_repository import (
    create_product,
    delete_product,
    get_expiring_products,
    get_low_stock_products,
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


def list_all_products(
    db: Session,
    search: str | None = None,
    category: str | None = None,
):
    return get_products(
        db,
        search=search,
        category=category,
    )


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


def list_low_stock_products(
    db: Session,
):
    return get_low_stock_products(db)


def list_expiring_products(
    db: Session,
    days: int,
):
    if days < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Days cannot be negative.",
        )

    expiration_limit = date.today() + timedelta(days=days)

    return get_expiring_products(
        db,
        expiration_limit,
    )


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