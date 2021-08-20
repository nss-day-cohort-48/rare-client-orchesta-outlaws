import React, { createContext } from "react";
import { apiURL } from "../../utils/api";
import { authFetch } from "../../utils/auth";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const getUserById = (id) => {
    return authFetch(`${apiURL}/authors/${id}`).then((res) => res.json());
  };

  return (
    <UserContext.Provider
      value={{
        getUserById,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
