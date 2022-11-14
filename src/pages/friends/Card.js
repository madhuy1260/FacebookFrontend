import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  acceptRequest,
  cancelRequest,
  deleteRequest,
} from "../../functions/user";

export default function Card({ userr, type, getData }) {
  const { user } = useSelector((state) => ({ ...state }));
  const cancelRequestHandler = async (userId) => {
    await cancelRequest(userId, user.token);
    getData();
    if (Response === "Okay") {
      getData();
    }
  };

  const confirmHandler = async (userId) => {
    const resp = await acceptRequest(userId, user.token);
    getData();
    if (resp === "Okay") {
      getData();
    }
  };

  const deleteHandler = async (userId) => {
    const resp = await deleteRequest(userId, user.token);
    getData();
    if (resp === "Okay") {
      getData();
    }
  };

  return (
    <div className="req_card">
      <Link to={`/profile/${userr.username}`}>
        <img src={userr.picture} alt="" />
      </Link>
      <div className="req_name">
        {userr.first_name} {userr.last_name}
      </div>
      {type === "sent" ? (
        <button
          className="blue_btn"
          onClick={() => cancelRequestHandler(userr._id)}
        >
          Cancel Request
        </button>
      ) : type === "request" ? (
        <>
          <button
            className="blue_btn"
            onClick={() => confirmHandler(userr._id)}
          >
            Confirm
          </button>
          <button className="gray_btn" onClick={() => deleteHandler(userr._id)}>
            Delete
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
