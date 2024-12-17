import axios from "axios";

const API_URL = "http://127.0.0.1:5000/user";
export const fetchInfo = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/auth/me", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};

export const fetchCourse = async () => {
  try {
    const response = await axios.get(`${API_URL}/course`, {
      withCredentials: true
    });
    console.log("User Data:", response.data);
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};

export const changeInfo = async () => {
};
