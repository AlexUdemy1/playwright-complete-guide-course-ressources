"use client"
import { searchItem } from "@/app/api/search/route";
import { Product } from "@/src/types/Product";
import { useEffect, useState } from "react";

type SearchBarProps = {
  setProducts: (products: Product[]) => void;
};

const SearchBar = ({ setProducts }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState<Product[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  // Fetch autocomplete suggestions (runs on every keystroke)
  useEffect(() => {
    const fetchAutocomplete = async () => {
      if (query.trim().length > 2) {
          const data = await searchItem(query);
          setAutocompleteResults(data.slice(0, 5)); // Limit suggestions to 5
          setShowAutocomplete(true);
      } else {
        setShowAutocomplete(false);
      }
    };

    fetchAutocomplete();
  }, [query]);

  // Fetch products only when clicking the button
  const handleSearch = async () => {
    try {
      const data = await searchItem(query);
      setProducts(data);
      setShowAutocomplete(false); // Hide autocomplete after search
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="relative p-4">
      <div className="flex">
        <input
          type="text"
          placeholder="Search for a product..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded-l"
          onFocus={() => setShowAutocomplete(true)}
        />
        <button
          onClick={handleSearch}
          className="px-4 bg-blue-600 text-white rounded-r"
        >
          Search
        </button>
      </div>

      {/* Autocomplete dropdown */}
      {showAutocomplete && autocompleteResults.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow-lg">
          {autocompleteResults.map((product) => (
            <li
              key={product.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setQuery(product.name);
                setShowAutocomplete(false);
              }}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
