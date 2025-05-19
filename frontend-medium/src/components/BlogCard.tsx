import React from 'react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
    id:string
  authName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
    id,
  authName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  const contentLength = content.length;

  return (
    <Link to={`/blog/${id}`}>
    <div className="p-4 border border-gray-300 rounded-lg cursor-pointer"> 
      <div className="flex items-center">
        <div className="flex justify-center flex-col">
          <Avatar size={20} name={authName} />
        </div>
        <div className="font-extralight pl-2">{authName}</div>
        <div className="flex justify-center flex-col pl-3">
          <Circle />
        </div>
        <div className="pl-2 text-slate-600">{publishedDate}</div>
      </div>
      <div className="font-bold text-xl mt-2">{title}</div>
      <div className="text-md font-thin mt-1">
        {contentLength > 100 ? content.slice(0, 100) + '...' : content}
      </div>
      <div className="w-full font-thin text-slate-400 text-sm mt-1">
        {`${Math.ceil(contentLength / 100)} min read`}
      </div>
    </div>
    </Link>
  );
};

export function Avatar({ name, size }: { name: string; size: number }) {
  return (
    <div
      className="relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <span className="text-xs text-gray-600 dark:text-gray-300">
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}

function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-400"></div>;
}








