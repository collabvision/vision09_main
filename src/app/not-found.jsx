"use client";    
import FuzzyText from '../components/FuzzyText';


export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
      
  
<FuzzyText 
  baseIntensity={0.1}
  hoverIntensity={0.41}
  enableHover
>
  404
          </FuzzyText>
        

      <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-xl">
        Oops! The page you are looking for does not exist.
      </p>

      <a
        href="/"
        className="mt-8 px-6 py-3 bg-white text-black rounded-lg font-medium hover:scale-105 transition"
      >
        Go Back Home
      </a>

    </div>
  );
}