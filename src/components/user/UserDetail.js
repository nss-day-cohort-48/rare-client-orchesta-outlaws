import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./UserProvider";
import { Image } from "react-bootstrap";
import "./UserDetail.css";

export const UserDetail = (props) => {
  const { getUserById } = useContext(UserContext);
  const [user, setUser] = useState({});
  const { userId } = useParams();
  useEffect(() => {
    getUserById(userId).then(setUser);
  }, [userId]);
  return (
    <div className="user-detail__container">
      {user && user.user ? (
        <>
          <div className="user-detail__main">
            <div className="user-detail__image-container">
              <Image
                src={user.profile_image_url}
                alt={`Profile image for ${user.user.username}`}
              />
              <div className="user-detail__image-caption">{`${user.user.first_name} ${user.user.last_name}`}</div>
            </div>
            <div className="user-detail__info">
              <div className="user-detail__info-item">{user.user.username}</div>
              <div className="user-detail__info-item">{user.bio}</div>
              <div className="user-detail__info-item">CREATED ON</div>
              <div className="user-detail__info-item">PROFILE TYPE</div>
            </div>
          </div>
          <div className="user-detail__side">
            <div>Subscribe!</div>
          </div>
        </>
      ) : (
        "...loading user..."
      )}
    </div>
  );
};
