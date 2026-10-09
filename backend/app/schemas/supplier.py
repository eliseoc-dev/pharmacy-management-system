from pydantic import BaseModel, ConfigDict, Field


class SupplierCreate(BaseModel):
    name: str = Field(
        min_length=1,
        max_length=150,
    )

    contact_name: str | None = None
    email: str | None = None
    phone: str | None = None


class SupplierResponse(SupplierCreate):
    id: int

    model_config = ConfigDict(
        from_attributes=True
    )