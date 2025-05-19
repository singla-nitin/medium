import { useEffect, useState } from "react";
import axios from "axios";
interface Blog {
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
    };
  }

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`https://backend.gavisohal87.workers.dev/api/v1/blog/bulk`,{
        headers:{
            Authorization: localStorage.getItem("token")
        }
      })
      .then((response) => {
        setBlogs(response.data.post); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false); 
      });
  }, [])
  console.log(blogs);
  

  return {
    loading,
    blogs,
  };
};
