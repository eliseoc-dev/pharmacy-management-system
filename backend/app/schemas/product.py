from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


class ProductBase(BaseModel):
    name: str = Field(min_length=1, max_length=150)
    description: str | None = None
    price: Decimal = Field(gt=0)
    stock: int = Field(ge=0)
    minimum_stock: int = Field(ge=0)
    category: str = Field(min_length=1, max_length=100)
    supplier: str | None = None
    expiration_date: date | None = None


class ProductCreate(ProductBase):
    pass


class ProductUpdate(ProductBase):
    pass


class ProductResponse(ProductBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)