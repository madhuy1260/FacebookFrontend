import React, { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import { useDispatch, useSelector } from "react-redux";
import getCroppedImg from "../../helpers/getCroppedImg";
import { updateprofilePicture } from "../../functions/user";
import { uploadImages } from "../../../src/functions/uploadImages";
import { createPost } from "../../../src/functions/post";
import PulseLoader from "react-spinners/PulseLoader";
import Cookies from "js-cookie";

export default function UpdateProfilePicture({
  setImage,
  image,
  setError,
  setShow,
  pRef,
}) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const slider = useRef(null);
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const zoomIn = () => {
    // if (zoom < 3) {
    //   setZoom((prev) => prev + 0.2);
    // }
    slider.current.stepUp();
    setZoom(slider.current.value);
  };

  const zoomOut = () => {
    // if (zoom > 1) {
    //   setZoom((prev) => prev - 0.2);
    // }
    slider.current.stepDown();
    setZoom(slider.current.value);
  };

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          //   console.log(img);
          setImage(img);
        } else {
          return img;
        }
      } catch (err) {
        console.log(err);
      }
    },
    [croppedAreaPixels, image, setImage]
  );

  const updateProfilePicture = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/profile_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await uploadImages(formData, path, user.token);
      const updated_picture = await updateprofilePicture(
        res[0].url,
        user.token
      );
      if (updated_picture === "Okay") {
        const new_post = await createPost(
          "profilePicture",
          null,
          description,
          res,
          user.id,
          user.token
        );
        if (new_post === "Okay") {
          setLoading(false);
          pRef.current.style.backgroundImage = `url(${res[0].url})`;
          Cookies.set("user", JSON.stringify({ ...user, picture: res[0].url }));
          dispatch({ type: "UPDATEPICTURE", payload: res[0].url });
          setImage("");
          setShow(false);
        } else {
          setLoading(false);
          setError(new_post);
        }
      } else {
        setLoading(false);
        setError(updated_picture);
      }
    } catch (err) {
      setLoading(false);
      setError(err.response.data.error);
    }
  };

  return (
    <div className="postBox update_img">
      <div className="box_header">
        <div className="small_circle" onClick={() => setImage("")}>
          <i className="exit_icon"></i>
        </div>
        <span>Update Profile Picture</span>
      </div>
      <div className="update_image_desc">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea_blue details_input"
          placeholder="Description"
        ></textarea>
      </div>

      <div className="update_center">
        <div className="crooper">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
          />
        </div>
        <div className="slider">
          <div className="slider_circle hover1" onClick={() => zoomOut()}>
            <i className="minus_icon"></i>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            ref={slider}
            step={0.2}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          />
          <div className="slider_circle hover1" onClick={() => zoomIn()}>
            <i className="plus_icon"></i>
          </div>
        </div>
      </div>
      <div className="flex_up">
        <div className="gray_btn" onClick={() => getCroppedImage("show")}>
          <i className="crop_icon"></i> Crop Photo
        </div>
        <div className="gray_btn">
          <i className="temp_icon"></i> Make Temporary
        </div>
      </div>
      <div className="flex_p_t">
        <i className="public_icon"></i> Your Profile picture is public
      </div>
      <div className="update_submit_wrap">
        <div className="blue_link" onClick={() => setImage("")}>
          Cancel
        </div>
        <button
          disabled={loading}
          className="blue_btn"
          onClick={() => updateProfilePicture()}
        >
          {loading ? <PulseLoader color="#fff" size={5} /> : "Save"}
        </button>
      </div>
    </div>
  );
}
