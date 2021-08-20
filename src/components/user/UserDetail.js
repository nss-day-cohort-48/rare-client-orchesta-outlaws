import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserProvider";
import "./UserDetail.css";

export const UserDetail = (props) => {
  const { getUserById } = useContext(UserContext);
  const [user, setUser] = useState({});
  useEffect(() => {
    getUserById(1).then(setUser);
  }, []);
  return (
    <div className="user-detail__container">{user && JSON.stringify(user)}</div>
  );
};
