import React, { useRef } from "react";
import Detail from "./Detail";
import ClickOutside from "../../helpers/clickOutside";

export default function EditDetails({
  infos,
  details,
  handleChange,
  updateDetails,
  setVisible,
}) {
  const modal = useRef(null);
  ClickOutside(modal, () => setVisible(false));
  return (
    <div className="blur">
      <div className="postBox infosBox" ref={modal}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setVisible(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Edit Details</span>
        </div>
        <div className="details_wrapper scrollbar">
          <div className="details_col">
            <span>Customize Your Intro</span>
            <span>Details you select will be public</span>
          </div>
          <div className="details_header">Other Name</div>
          <Detail
            value={details?.otherName}
            img="studies"
            placeholder="Add Other Name"
            name="otherName"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="other Name"
          />
          <div className="details_header">Work</div>
          <Detail
            value={details?.job}
            img="job"
            placeholder="Add Job Title"
            name="job"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="a job"
          />
          <Detail
            value={details?.workplace}
            img="job"
            placeholder="Add a workplace"
            name="workplace"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="workplace"
          />
          <div className="details_header">Education</div>
          <Detail
            value={details?.highSchool}
            img="studies"
            placeholder="Add a high school"
            name="highSchool"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="a high school"
          />
          <Detail
            value={details?.college}
            img="studies"
            placeholder="Add a college"
            name="college"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="college"
          />
          <div className="details_header">Current City</div>
          <Detail
            value={details?.currentCity}
            img="home"
            placeholder="Add current City"
            name="currentCity"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="a current City"
          />
          <div className="details_header">Home Town</div>
          <Detail
            value={details?.hometown}
            img="home"
            placeholder="Add home town"
            name="hometown"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="a home town"
          />
          <div className="details_header">Relationship</div>
          <Detail
            value={details?.relationship}
            img="relationship"
            placeholder="Add Relationship"
            name="relationship"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="a relationship"
            rel
          />
          <div className="details_header">Instagram</div>
          <Detail
            value={details?.instagram}
            img="instagram"
            placeholder="Add instagram"
            name="instagram"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="a instagram"
          />
        </div>
      </div>
    </div>
  );
}
