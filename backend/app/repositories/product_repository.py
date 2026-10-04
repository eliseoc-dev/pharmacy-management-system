from sqlalchemy import select
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


def get_products(db: Session) -> list[Product]:
    statement = select(Product).order_by(Product.id.desc())

    return list(
        db.scalars(statement).all()
    )


def get_product_by_id(
    db: Session,
    product_id: int,
) -> Product | None:
    return db.get(Product, product_id)


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