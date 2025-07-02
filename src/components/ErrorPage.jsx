import React from 'react';
import { Link } from 'react-router';
// import { motion } from 'framer-motion';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  ">
      <div className='animated-border p-2'>
<div className='bg-white rounded-xl'>
   {/* Animated Image */}
 <img
        src="https://img.freepik.com/free-vector/error-colored-isometric-composition-signs-tools-materials-solving-problems-errors-computer-vector-illustration_1284-67437.jpg"
        alt="404 Not Found"
        className="w-ful h-[50vh] rounded-xl mb-8"
        // animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }}
        // transition={{ duration: 2, repeat: Infinity }}
      />

     <div className='p-10 text-center'>
       {/* Text & Link */}
       <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-6 text-center">The page you're looking for doesn't exist or has been moved.</p>

      <Link
        to="/"
        className="px-6 py-3 bg-mySecondary text-white rounded-lg hover:bg-myPrimary transition font-medium shadow"
      >
        ⬅️ Go Back Home
      </Link>
     </div>
</div>
      </div>
     
    </div>
  );
};

export default ErrorPage;
