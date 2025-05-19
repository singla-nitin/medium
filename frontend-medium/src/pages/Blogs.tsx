
import { BlogCard } from '../components/BlogCard';
import Appbar from '../components/Appbar';
import { useBlogs } from '../hooks';
import { Skeleton, Box } from "@mui/material";
// Define the structure of each blog post

  
export default function Blogs() {
    const { loading, blogs } = useBlogs();
    const renderBlogs = () => {
        return blogs.map((blog) => (
            <div  className='min-w-[600px] shadow-sm'>
                <BlogCard
               id={blog.id} 
            key={blog.id}
            authName={blog.author?.name || 'Unknown Author'}
            title={blog.title || 'Untitled'}
            content={blog.content || 'No content available'}
            publishedDate="30 AUG 2024"
          />
            </div>
          
        ));
      };
    
    
    

if (loading) {
        return (
     <div >
        <Appbar />
          <div className="pl-50 ">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
        )
    }

    return (

        <div>
            <Appbar />
            <div className='flex justify-center '>

                <div className=' max-w-xl '>
                
                {renderBlogs()}    






                </div>
            </div>
        </div>
    );
}

function BlogSkeleton() {
    return (
      <Box 
        sx={{
          
        //   maxWidth: 800,
          mb: 2,
          p: 2,
          border: '1px solid #e0e0e0',
          borderRadius: 1,
        }}
      >
        <Skeleton variant="text" width="60%" height={30} />
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="rectangular" height={118} sx={{ mt: 1, borderRadius: 1 }} />
      </Box>
    );
  }


 