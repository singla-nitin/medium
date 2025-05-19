import { Avatar } from './BlogCard';

// Define the BlogCardProps interface with the expected properties
interface BlogCardProps {
  id: string;
  authName: string; // Author name, used directly in the component
  title: string;
  content: string;
  publishedDate: string;
}

// Accept blog as props and destructure them correctly
export default function FullBlog({ id, authName, title, content, publishedDate }: BlogCardProps) {
  return (
    <div className='flex min-h-screen'>
      <div className="p-6 mx-auto max-w-4xl font-sans flex-grow ">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 mb-6">Posted on {publishedDate || 'Unknown Date'}</p>

        <div className="grid grid-cols-1 gap-6">
          <p className="leading-relaxed">{content}</p>
        </div>
      </div>
      <div className="w-1/4 text-left p-6">
        <div className="font-semibold mb-1  underline">Author</div>
        <div className='flex flex-row'>
        <div className="flex justify-center flex-col">
          <Avatar  size={18} name={authName} />
        </div>
        <div className="font-bold text-2xl pl-2">{authName}</div>
        </div>        
      </div>
    </div>
  );
}
