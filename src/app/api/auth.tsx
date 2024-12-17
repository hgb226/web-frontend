import axios from "axios";

const API_URL = "http://127.0.0.1:5000/auth";

export async function logIn(email: string, password: string): Promise<any> {
  try {
    await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
    const userInfo = await axios.get(`${API_URL}/me`, { withCredentials: true });
    return userInfo.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed.");
  }
}


export async function signUp(email: string, password: string): Promise<any> {
  try {
    const response = await axios.post(`${API_URL}/signup`, { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Signup failed.");
  }
}


export async function logOut() {
  try {
    await axios.post(`${API_URL}/logout`, { withCredentials: true });
    console.log("Signed out successfully.");
  } catch (error) {
    console.error("Failed to sign out:", error);
    throw error;
  }
}
