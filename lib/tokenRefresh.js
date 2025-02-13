import { signIn, signOut } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

const tokenRefresh = async (session) => {
  console.log("Refresh token...");
  const isTokenExpired = (token) => {
    if (!token) return true;

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = session.refreshToken;

    if (isTokenExpired(refreshToken)) {
      console.error("Refresh token has expired");
      signOut();
      return Promise.reject("Refresh token expired");
    }

    try {
      const result = await signIn("refresh-token", {
        redirect: false,
        refreshToken,
      });

      if (result?.error) {
        console.error("Token refresh failed:", result.error);
        signOut();
        return Promise.reject(result.error);
      } else {
        console.log("Token refreshed successfully:", result);
        return Promise.resolve(result);
      }
    } catch (error) {
      console.error("An error occurred during token refresh:", error);
      signOut();
      return Promise.reject(error);
    }
  };

  if (session && isTokenExpired(session.accessToken)) {
    return refreshAccessToken();
  }

  return Promise.resolve();
};

export default tokenRefresh;
