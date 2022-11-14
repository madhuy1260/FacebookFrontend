import React, { useState } from "react";
import Bio from "./Bio";

export default function Detail({
  infos,
  updateDetails,
  img,
  value,
  placeholder,
  name,
  handleChange,
  text,
  rel,
}) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ marginLeft: "15px", marginRight: "15px" }}>
      <div className="add_details_flex " onClick={() => setShow(true)}>
        {value ? (
          <div className="info_profile ">
            <img src={`../../../icons/${img}.png`} alt="" />
            {value}
            <i className="edit_icon"></i>
          </div>
        ) : (
          <>
            <i className="rounded_plus_icon"></i>
            <span className="underline">Add {text}</span>
          </>
        )}
      </div>
      {show && (
        <Bio
          placeholder={placeholder}
          name={name}
          infos={infos}
          handleChange={handleChange}
          updateDetails={updateDetails}
          setShow={setShow}
          detail
          rel={rel}
        />
      )}
    </div>
  );
}
