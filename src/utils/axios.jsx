import axios from "axios";

const api = axios.create({});

// request 인터셉터
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let hasAlerted = false;

// response 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const msg = error?.response?.data?.message;
    const status = error?.response?.status;
    
    if (status === 401 && msg === "Token has expired" && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log('refresh 성공~');
        const { newAccessToken, newRefreshToken } = await refreshToken();
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        if (!hasAlerted) {
          hasAlerted = true; 
          alert("다시 로그인해주세요");
          window.location.replace('/Login');
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    localStorage.removeItem("accessToken");
    throw new Error("No refresh token available");
  }

  try {
    const response = await axios.post(
      "/api/auth/reissue",
      {}, 
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    const newAccessToken = response.data.access_token;
    const newRefreshToken =  response.data.refresh_token;
    return {
      newAccessToken,newRefreshToken
    };
  } catch (error) {
    console.error("리프레시 토큰 갱신 실패:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export default api;
