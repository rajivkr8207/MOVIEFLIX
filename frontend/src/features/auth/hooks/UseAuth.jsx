"use client";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { LoginUser, LogOutUser, RegisterUser } from "../services/auth.api";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
} from "../../../stores/slices/authSlice";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      const res = await RegisterUser(data);
      toast.success(res.message);
      navigate("/auth/login");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleLogin = async (data) => {
    dispatch(loginStart());
    try {
      const res = await LoginUser(data);
      dispatch(loginSuccess(res.user));
      toast.success(res.message);
      navigate("/");
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message));
      toast.error(error.response?.data?.message);
    }
  };

  const handleLogout = async () => {
    try {
      await LogOutUser();
      dispatch(logout());
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };
  return { handleRegister, handleLogin, handleLogout };
};

export default useAuth;
