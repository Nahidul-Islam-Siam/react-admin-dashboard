import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import useProducts from "../../hooks/allProducts";

const extractColorFromName = (name) => {
  const colorRegex = /\b(black|white|blue|red|green|gold|silver|purple|brown|cloudy white|elderberry)\b/i;
  const match = name.match(colorRegex);
  return match ? match[0] : "N/A";
};

const extractCapacityFromName = (name) => {
  const capacityRegex = /(\d+\s?GB|\d+\s?TB)/i;
  const match = name.match(capacityRegex);
  return match ? match[0] : "N/A";
};

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { products, isLoading, error } = useProducts();

  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (products) {
      const filtered = products.filter((product) => {
        const data = product.data || {};
        const name = product.name.toLowerCase();
        const color = data.color || data.Color || extractColorFromName(product.name);
        const capacity = data.capacity || data["capacity GB"] || data.Capacity || extractCapacityFromName(product.name);

        const searchableText = `${name} ${color} ${capacity} 
          ${data.price || data.Price || ""} 
          ${data.generation || data.Generation || ""} 
          ${data["CPU model"] || ""} 
          ${data["Strap Colour"] || ""} 
          ${data.Description || ""}`.toLowerCase();

        return searchableText.includes(term);
      });

      setFilteredProducts(filtered);
    }
  };

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!products || products.length === 0) return <div>No products available.</div>;

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Product List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Color</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Capacity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Generation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">CPU Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredProducts.map((product) => {
              const data = product.data || {};
              const color = data.color || data.Color || extractColorFromName(product.name);
              const capacity = data.capacity || data["capacity GB"] || data.Capacity || extractCapacityFromName(product.name);

              return (
                <motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{color}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {data.price || data.Price ? `$${parseFloat(data.price || data.Price).toFixed(2)}` : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{capacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{data.generation || data.Generation || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{data["CPU model"] || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-400 hover:text-red-300">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductsTable;
