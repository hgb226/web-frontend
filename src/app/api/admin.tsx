import axios from "axios";

export const fetchAllUser = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/admin/get_all_user", {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    localStorage.clear();
    throw error;
  }
};

export const findUser = async (token: any, str: string) => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/admin/find_user", {
      withCredentials: true,
      params: {
        search: str
      }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    localStorage.clear();
    throw error;
  }
};

export const fetchAllCourse = async (token: any) => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/admin/get_all_course", {
      withCredentials: true
    });
    console.log("Course Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch course data:", error);
    throw error;
  }
};
