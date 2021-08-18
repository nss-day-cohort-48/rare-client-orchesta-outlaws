import React, { createContext, useState } from "react";
import { authFetch } from "../../utils/auth";
import { apiURL } from "../../utils/api";

export const ReactionContext = createContext();

export const ReactionProvider = (props) => {
  const [reactions, setReactions] = useState([]);

  const getAllReactions = () => {
    return authFetch(`${apiURL}/reactions`)
      .then((res) => res.json())
      .then(setReactions);
  };

  const deleteReaction = (reactionId) => {
    return authFetch(`${apiURL}/reactions/${reactionId}`, {
      method: "DELETE",
    }).then(getAllReactions);
  };

  const createReaction = (reactObj) => {
    return authFetch(`${apiURL}/reactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reactObj),
    }).then(getAllReactions);
  };

  return (
    <ReactionContext.Provider
      value={{ reactions, getAllReactions, deleteReaction, createReaction }}
    >
      {props.children}
    </ReactionContext.Provider>
  );
};
