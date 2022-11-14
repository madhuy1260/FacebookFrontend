import LoginForm from "../../components/login/LoginForm";
import Footer from "../../components/login/Footer";
import { useState } from "react";
import "./Login.css";
import RegisterForm from "../../components/login/RegisterForm";
// import { Dummy } from "../../components/login/Dummy";

function Login() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}
        <Footer />
      </div>
    </div>
  );
}

export default Login;
