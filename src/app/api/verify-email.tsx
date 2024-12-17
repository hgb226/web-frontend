import axios from "axios";

export const verifyEmail = async (token: string) => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/auth/verify-email?token=${token}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};