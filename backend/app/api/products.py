from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.product import (
    ProductCreate,
    ProductResponse,
    ProductUpdate,
)
from app.services.product_service import (
    create_new_product,
    delete_existing_product,
    get_existing_product,
    list_all_products,
    update_existing_product,
)


router = APIRouter(
    prefix="/products",
    tags=["Products"],
)


@router.post(
    "",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_product_endpoint(
    product_data: ProductCreate,
    db: Session = Depends(get_db),
):
    return create_new_product(
        db,
        product_data,
    )


@router.get(
    "",
    response_model=list[ProductResponse],
)
def list_products_endpoint(
    db: Session = Depends(get_db),
):
    return list_all_products(db)


@router.get(
    "/{product_id}",
    response_model=ProductResponse,
)
def get_product_endpoint(
    product_id: int,
    db: Session = Depends(get_db),
):
    return get_existing_product(
        db,
        product_id,
    )


@router.put(
    "/{product_id}",
    response_model=ProductResponse,
)
def update_product_endpoint(
    product_id: int,
    product_data: ProductUpdate,
    db: Session = Depends(get_db),
):
    return update_existing_product(
        db,
        product_id,
        product_data,
    )


@router.delete(
    "/{product_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_product_endpoint(
    product_id: int,
    db: Session = Depends(get_db),
):
    delete_existing_product(
        db,
        product_id,
    )