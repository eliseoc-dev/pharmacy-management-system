from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.repositories.category_repository import (
    create_category,
    get_categories,
)
from app.schemas.category import (
    CategoryCreate,
    CategoryResponse,
)


router = APIRouter(
    prefix="/categories",
    tags=["Categories"],
)


@router.post(
    "",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_category_endpoint(
    data: CategoryCreate,
    db: Session = Depends(get_db),
):
    return create_category(db, data)


@router.get(
    "",
    response_model=list[CategoryResponse],
)
def list_categories_endpoint(
    db: Session = Depends(get_db),
):
    return get_categories(db)