import userReducer from "./reducers/user";
// import error from "./error";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({ reducer: { user: userReducer } });
