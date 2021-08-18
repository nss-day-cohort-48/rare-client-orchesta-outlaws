import React, { createContext, useState } from "react";
import { apiURL } from "../../utils/api";
import { authFetch } from "../../utils/auth";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = () => {
    return authFetch(`${apiURL}/categories`)
      .then((res) => res.json())
      .then(setCategories);
  };

  const addCategory = (catObj) => {
    return authFetch(`${apiURL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(catObj),
    }).then(() => {
      getAllCategories();
    });
  };

  const updateCategory = (catObj) => {
    return authFetch(`${apiURL}/categories/${catObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(catObj),
    }).then(() => {
      getAllCategories();
    });
  };

  const deleteCategory = (catId) => {
    return authFetch(`${apiURL}/categories/${catId}`, {
      method: "DELETE",
    }).then(getAllCategories);
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        getAllCategories,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
