import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Processing = () => {
  const [dotCount, setDotCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Dot animation logic
    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev < 5 ? prev + 1 : 1));
    }, 200); // Change dots every 200ms

    // Redirect after 2 seconds
    const redirectTimeout = setTimeout(() => {
      navigate("/dashboard");
    }, 1000);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <div className="flex w-full items-center  justify-center min-h-screen bg-gray-100">
      <div className="bg-gray-300 w-full m-20  text-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Payment is</h1>
        <div className="text-xl">
          Processing
          {Array(dotCount).fill(".").join("")}
        </div>
      </div>
    </div>
  );
};

export default Processing;
