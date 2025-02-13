import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
export default function Navbar() {
  const { data: session } = useSession();

  const router = useRouter();
  const handleSignIn = () => {
    router.push("/auth");
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link href="/" className="text-white text-xl font-bold">
        MovieApp
      </Link>

      <div className="flex gap-4">
        {session ? (
          <>
            <p className="text-white">Welcome, {session.user?.name}!</p>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleSignIn()}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
            {/* <Link href="/signup" className="bg-green-500 text-white px-4 py-2 rounded">
              Sign Up
            </Link> */}
          </>
        )}
      </div>
    </nav>
  );
}
