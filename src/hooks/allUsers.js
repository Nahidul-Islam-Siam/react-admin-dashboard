
import { useState, useEffect } from "react";

import axios from "axios";

const useUsers = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users'); 
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

export default useUsers;
