import { useState, React } from "react";
import Link from "next/link";

export default function organistaions({ element }) {
  const [data, setData] = useState(element);

  return (
    <li className="py-3 sm:py-4 w-full">
      <div className="w-full">
        <div className="relative group w-auto">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 0 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600">
            <span className="flex items-center space-x-5 px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-pink-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </span>
            <span className="px-6 pl-6 text-gray-100">{element.name} </span>
            <span className="px-6  text-gray-100 grid grid-cols-2">
              <div className="h-6 w-full text-lg ">{element.upVotes}</div>
              {/* <div className='h-6 w-full text-lg sm:visible'>{element.upVotes} &uarr;</div> */}
              <div>
                <svg
                  className="w-6 h-6  dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
                  ></path>
                </svg>
              </div>
            </span>
            <span className="px-6  text-gray-100 grid grid-cols-2">
              <div className="h-6 w-full text-lg">{element.downVotes}</div>
              <div>
                <svg
                  className="w-6 h-6 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                  ></path>
                </svg>
              </div>
            </span>
            <span className="px-6  text-gray-100 grid grid-cols-2">
              <div className="h-6 w-full px-2 text-lg">{element.view}</div>
              <div className="p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </div>
            </span>

            <span className="pl-6 text-indigo-400 group-hover:text-gray-100 transition duration-200 group-hover:scale-125">
              <Link
                href={{
                  pathname: "/viewDocument",
                  query: data,
                }}
              >
                View &rarr;
              </Link>
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
