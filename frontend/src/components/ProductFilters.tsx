interface ProductFiltersProps {
  search: string;
  category: string;
  categories: string[];

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onClear: () => void;
}


function ProductFilters({
  search,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
  onClear,
}: ProductFiltersProps) {
  return (
    <div className="filters">
      <input
        className="search-input"
        type="search"
        placeholder="Search products, suppliers..."
        value={search}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
      />

      <select
        value={category}
        onChange={(event) =>
          onCategoryChange(event.target.value)
        }
      >
        <option value="">
          All categories
        </option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <button
        className="secondary-button"
        type="button"
        onClick={onClear}
      >
        Clear
      </button>
    </div>
  );
}

export default ProductFilters;