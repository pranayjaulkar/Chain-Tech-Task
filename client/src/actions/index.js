import axios from "axios";
import { setUser } from "../store/reducers/user";

const API = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? "/api"
      : "http://localhost:5000/api",
  withCredentials: true,
});

export const loginUser = (formData, navigate) => async (dispatch) => {
  try {
    const res = await API.post("/users/login", formData);
    if (res.data) {
      dispatch(setUser(res.data));
      navigate("/");
    }
  } catch (error) {
    console.log("error: ", error);
    if (error.response.data.error === "INVALID_EMAIL_OR_PASSWORD") {
      alert("Invalid email or password");
    } else {
      alert("Something went wrong. Please try again");
    }
  }
};

export const registerUser = (formData, navigate) => async (dispatch) => {
  try {
    const res = await API.post("/users/register", formData);
    if (res.data) {
      dispatch(setUser(res.data));
      navigate("/");
    }
  } catch (error) {
    console.log("error: ", error);
    if (error.response.data.error === "USER_ALREADY_EXISTS") {
      alert(`User with email  "${formData.email}"  already exists.`);
    } else {
      alert("Something went wrong. Please try again");
    }
  }
};

export const refreshAuthToken = (navigate) => async (dispatch) => {
  try {
    const res = await API.get("/users/refresh");
    if (res.data) {
      dispatch(setUser(res.data));
    }
  } catch (error) {
    console.log("error: ", error);
    if (error.response.data.error === "TOKEN_NOT_FOUND") {
      navigate("/login");
    }
  }
};

export const updateUser = (id, data, navigate) => async (dispatch) => {
  try {
    const res = await API.patch(`/users/${id}`, data);
    if (res.data) {
      console.log("res.data", res.data);
      dispatch(setUser(res.data));
      navigate("/");
    }
  } catch (error) {
    console.log("error: ", error);

    alert("Something went wrong. Please try again");
  }
};

export const logoutUser = (navigate) => async (dispatch) => {
  try {
    await API.get("/users/logout");
    dispatch(setUser(null));
    navigate("/login");
  } catch (error) {
    console.log("error: ", error);

    alert("Something went wrong. Please try again");
  }
};
