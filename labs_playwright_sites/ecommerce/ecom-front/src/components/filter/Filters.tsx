import { Product } from "@/src/types/Product";
import { useState } from "react";

type FiltersProps = {
  setProducts: (products: Product[]) => void;
  allProducts: Product[]; // Pass original product list
};

const Filters = ({ setProducts, allProducts }: FiltersProps) => {
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sortOption, setSortOption] = useState<string>("");

  const applyFilters = () => {
    let filteredProducts = [...allProducts];

    // Filter by price range
    if (minPrice !== "" || maxPrice !== "") {
      filteredProducts = filteredProducts.filter((product) => {
        const price = product.price;
        return (
          (minPrice === "" || price >= minPrice) &&
          (maxPrice === "" || price <= maxPrice)
        );
      });
    }

    // Apply sorting
    switch (sortOption) {
      case "priceLowHigh":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "nameAZ":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameZA":
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setProducts(filteredProducts);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Price Filter */}
        <div className="flex items-center gap-2">
          <span>Price:</span>
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value ? parseFloat(e.target.value) : "")}
            className="border p-1 w-20 rounded"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value ? parseFloat(e.target.value) : "")}
            className="border p-1 w-20 rounded"
          />
        </div>

        {/* Sorting */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="nameAZ">Name: A to Z</option>
          <option value="nameZA">Name: Z to A</option>
        </select>

        {/* Apply Filters Button */}
        <button onClick={applyFilters} className="px-4 py-2 bg-blue-600 text-white rounded">
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filters;
