import API from "./baseURL";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("users/getUsers", async (page) => {
  try {
    const {
      data: { data, errors },
    } = await API.get(`/users?&page=${page}`);
    if (data) {
      return {
        users: data.data,
        // numberOfPages: data.numberOfPages,
        // currentPage: data.currentPage,
        // total: data.total,
      };
    } else if (errors) {
      return {
        error: errors,
      };
    }
  } catch (err) {
    console.log(err.message);
  }
});

export const searchUsers = createAsyncThunk(
  "users/searchUsers",
  async (columnField, operatorValue) => {
    try {
      const {
        data: { data, errors },
      } = await API.get(
        `/users/search?columnField=${columnField}&operatorValue=${operatorValue}`
      );
      if (data) {
        return {
          users: data.data,
          numberOfPages: data.numberOfPages,
          currentPage: data.currentPage,
          total: data.total,
        };
      } else if (errors) {
        return {
          error: errors,
        };
      }
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  try {
    const {
      data: { data, errors },
    } = await API.delete(`/users/${id}`);
    if (data) {
      return { id };
    } else if (errors) {
      return {
        error: errors,
      };
    }
  } catch (err) {
    console.log(err.message);
  }
});

export const updateAPI = (id, formData) =>
  API.put(`/users/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
