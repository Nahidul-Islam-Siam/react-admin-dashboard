
import { useState, useEffect } from "react";

import axios from "axios";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://api.restful-api.dev/objects'); 
      setProducts(response.data);
     
    } catch (err) {
      setError(err.message); 
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, error };
};

export default useProducts;
