import React from "react";
import Link from "next/link";
import MovieData from "../components/data/MovieDataCo";
const index = () => {
  return (
    <div className="flex w-[100%] gap-x-5 justity-between">
      <div className="bg-gray-400 w-full">
        <MovieData />
      </div>
    </div>
  );
};

export default index;
