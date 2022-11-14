import React, { useState, useRef, useEffect, useCallback } from "react";
import ClickOutside from "../../helpers/clickOutside";
import Cropper from "react-easy-crop";
import { useSelector } from "react-redux";
import getCroppedImg from "../../helpers/getCroppedImg";
import { uploadImages } from "../../functions/uploadImages";
import { updateCover } from "../../functions/user";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";
import OldCovers from "./OldCovers";

export default function Cover({ cover, visitor, photos }) {
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [coverPicture, setCoverPicture] = useState("");
  const menuRef = useRef(null);
  const refInput = useRef(null);
  const [show, setShow] = useState(false);
  const cRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  ClickOutside(menuRef, () => setShowCoverMenu(false));

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/jpg" &&
      file.type !== "image/png" &&
      file.type !== "image/gif" &&
      file.type !== "image/webp"
    ) {
      setError(`${file.name} format is not supported ...`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb is allowed...`);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCoverPicture(event.target.result);
    };
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // const zoomIn = () => {
  //   // if (zoom < 3) {
  //   //   setZoom((prev) => prev + 0.2);
  //   // }
  //   slider.current.stepUp();
  //   setZoom(slider.current.value);
  // };

  // const zoomOut = () => {
  //   // if (zoom > 1) {
  //   //   setZoom((prev) => prev - 0.2);
  //   // }
  //   slider.current.stepDown();
  //   setZoom(slider.current.value);
  // };

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          //   console.log(img);
          setCoverPicture(img);
        } else {
          return img;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [croppedAreaPixels]
  );

  const coverRef = useRef(null);
  const [width, setWidth] = useState();

  useEffect(() => {
    setWidth(coverRef.current.clientWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);

  const updateCoverPicture = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/cover_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await uploadImages(formData, path, user.token);
      const updated_picture = await updateCover(res[0].url, user.token);
      if (updated_picture === "Okay") {
        const new_post = await createPost(
          "coverPicture",
          null,
          null,
          res,
          user.id,
          user.token
        );
        if (new_post === "Okay") {
          setLoading(false);
          setCoverPicture("");
          cRef.current.src = res[0].url;
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
    <div className="profile_cover" ref={coverRef}>
      {coverPicture && (
        <div className="save_changes_cover">
          <div className="save_changes_left">
            <i className="public_icon"></i> Your Cover photo is public
          </div>
          <div className="save_changes_right">
            <button
              className="blue_btn opacity_btn"
              onClick={() => setCoverPicture("")}
            >
              Cancel
            </button>
            <button className="blue_btn" onClick={() => updateCoverPicture()}>
              {loading ? <PulseLoader color="#fff" size={5} /> : "Save Changes"}
            </button>
          </div>
        </div>
      )}
      <input
        type="file"
        ref={refInput}
        hidden
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        onChange={handleImage}
      />
      {error && (
        <div className="postError comment_error">
          <div className="postError_error">{error}</div>
          <button
            className="blue_btn"
            onClick={() => {
              setError("");
            }}
          >
            Try Again
          </button>
        </div>
      )}
      {coverPicture && (
        <div className="cover_crooper">
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            aspect={width / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
            objectFit="horizontal-cover"
          />
        </div>
      )}
      {cover && !coverPicture && (
        <img src={cover} className="cover" alt="" ref={cRef} />
      )}
      {!visitor && (
        <div className="update_cover_wrapper">
          <div
            className="open_cover_update"
            onClick={() => {
              setShowCoverMenu((prev) => !prev);
            }}
          >
            <i className="camera_filled_icon"></i>
            Add Cover Photo
          </div>
          {showCoverMenu && (
            <div className="open_cover_menu" ref={menuRef}>
              <div
                className="open_cover_menu_item hover1"
                onClick={() => setShow(true)}
              >
                <i className="photo_icon"></i>
                Select Photo
              </div>
              <div
                className="open_cover_menu_item hover1"
                onClick={() => refInput.current.click()}
              >
                <i className="upload_icon"></i>
                Upload Photo
              </div>
            </div>
          )}
        </div>
      )}
      {show && (
        <OldCovers
          photos={photos}
          setCoverPicture={setCoverPicture}
          setShow={setShow}
        />
      )}
    </div>
  );
}
