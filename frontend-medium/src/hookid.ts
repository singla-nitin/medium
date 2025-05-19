// import { useEffect, useState } from "react";
// import axios from "axios";
// interface Blog {
//     id: string;
//     title: string;
//     content: string;
//     author: {
//       name: string;
//     };
//   }

// export const useBlog = ({id}:{id:string}) => {
//   const [loading, setLoading] = useState(true);
//   const [blog, setBlog] = useState<Blog[]>([]);

//   useEffect(() => {
//     axios
//       .get(`https://backend.gavisohal87.workers.dev/api/v1/blog/${id}`,{
//         headers:{
//             Authorization: localStorage.getItem("token")
//         }
//       })
//       .then((response) => {
//         setBlog(response.data.post); 
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching blogs:", error);
//         setLoading(false); 
//       });
//   }, [])
  
  

//   return {
//     loading,
//     blog,
//   };
// };

import { useEffect, useState } from "react";
import axios from "axios";

interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  publishedDate?: string;
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`https://backend.gavisohal87.workers.dev/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        // Assuming response.data directly contains the blog object
        setBlog(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};
