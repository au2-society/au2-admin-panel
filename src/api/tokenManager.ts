import Cookies from "js-cookie";

class TokenManager {
  static setTokens(accessToken: string, refreshToken: string) {
    Cookies.set("accessToken", accessToken, {
      secure: true,
      sameSite: "None",
    });
    Cookies.set("refreshToken", refreshToken, {
      secure: true,
      sameSite: "None",
    }); 
  }

  static getAccessToken(): string | undefined {
    return Cookies.get("accessToken");
  }

  static getRefreshToken(): string | undefined {
    return Cookies.get("refreshToken");
  }

  static clearTokens() {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  }
}

export default TokenManager;
