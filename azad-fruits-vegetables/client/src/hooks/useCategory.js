import { useState, useEffect } from "react";
import axios from "axios";

const useCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/category/all");
         console.log("FULL DATA:", data);
        console.log("CATEGORY:", data.category);

       if (data?.status === "success") {
          setCategories(data.category);
        }
    } catch (error) {
      console.log(error);
      setCategories([]);
    }
  };

  return categories;
};

export default useCategory;