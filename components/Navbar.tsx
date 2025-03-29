// components/Navbar.js

import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/auth");
  };
  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
      <div className=" font-bold">
        <span className="text-blue-300 text-2xl font-extrabold">
          Inventory App
        </span>
      </div>
      <div className="space-x-4">
        <button
          onClick={() => signOut()}
          className="bg-blue-800 text-white px-4 py-2 rounded"
        >
          Log Out
        </button>{" "}
        <button
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={() => handleSignIn()}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
