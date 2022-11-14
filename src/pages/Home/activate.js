import { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import Header from "../../components/header/Header";
import LeftHome from "../../components/home/left";
import { useDispatch, useSelector } from "react-redux";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import CreatePost from "../../components/createPost";
import ActivateForm from "./ActivateForm";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

function Activate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useParams();
  useEffect(() => {
    activateAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/activate`,
        { token },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess(data.message);
      Cookies.set("user", JSON.stringify({ ...user, verified: true }));
      dispatch({ type: "VERIFY", payload: true });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(err.response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <div className="home">
      {success && (
        <ActivateForm
          type="success"
          header="Account Verification Succeded"
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account Verification Failed"
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}

export default Activate;
