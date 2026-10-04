from datetime import date

from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate


def create_product(
    db: Session,
    product_data: ProductCreate,
) -> Product:
    product = Product(**product_data.model_dump())

    db.add(product)
    db.commit()
    db.refresh(product)

    return product


def get_products(
    db: Session,
    search: str | None = None,
    category: str | None = None,
) -> list[Product]:
    statement = select(Product)

    if search:
        search_term = f"%{search.lower()}%"

        statement = statement.where(
            or_(
                func.lower(Product.name).like(search_term),
                func.lower(Product.description).like(search_term),
                func.lower(Product.supplier).like(search_term),
            )
        )

    if category:
        statement = statement.where(
            func.lower(Product.category) == category.lower()
        )

    statement = statement.order_by(Product.id.desc())

    return list(db.scalars(statement).all())


def get_product_by_id(
    db: Session,
    product_id: int,
) -> Product | None:
    return db.get(Product, product_id)


def get_low_stock_products(
    db: Session,
) -> list[Product]:
    statement = (
        select(Product)
        .where(Product.stock <= Product.minimum_stock)
        .order_by(Product.stock.asc())
    )

    return list(db.scalars(statement).all())


def get_expiring_products(
    db: Session,
    expiration_limit: date,
) -> list[Product]:
    statement = (
        select(Product)
        .where(Product.expiration_date.is_not(None))
        .where(Product.expiration_date <= expiration_limit)
        .order_by(Product.expiration_date.asc())
    )

    return list(db.scalars(statement).all())


def update_product(
    db: Session,
    product: Product,
    product_data: ProductUpdate,
) -> Product:
    for field, value in product_data.model_dump().items():
        setattr(product, field, value)

    db.commit()
    db.refresh(product)

    return product


def delete_product(
    db: Session,
    product: Product,
) -> None:
    db.delete(product)
    db.commit()