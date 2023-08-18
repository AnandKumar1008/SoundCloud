import React, { useContext, useEffect, useState } from "react";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import "./Login.css";
import AppleIcon from "@mui/icons-material/Apple";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../MyContext";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useLocation, useNavigate } from "react-router-dom";
const Login = () => {
  const {
    loginPage,
    setLoginPage,
    setSongPlay,
    setUserName,
    setUserPhoto,
    login,
    setLogin,
    setIsPlaying,
  } = useContext(MyContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({ email: "", password: "" });
  useEffect(() => {
    document.body.style.overflow = !loginPage ? "auto" : "hidden";
    if (loginPage) {
      setSongPlay([]);
    }
  }, [loginPage]);
  const handleLoginPage = () => {
    setLoginPage(false);
    setIsPlaying(false);
    if (location.pathname === "/feed" || location.pathname === "/library")
      navigate("/home");
  };
  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserName(result.user.displayName);
        localStorage.setItem(
          "sound_cloud_google",
          JSON.stringify({
            userName: result.user.displayName,
            userPhoto: result.user.photoURL,
          })
        );
        console.log(result);
        setLogin(true);
        // setLogin(true);
        // setShowForm("none");
        setUserPhoto(result.user.photoURL);
        setLoginPage(false);
        navigate("/home");
        console.log("coming here");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
  const handleLogin = async () => {
    const url = "https://academics.newtonschool.co/api/v1/user/login";
    const data = {
      email: "user_email",
      password: "user_password",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          projectId: "yji0muf36wd4", // Your provided project ID
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        const token = responseData.token;
        console.log("Token:", token);
        setLogin(true);
        setLoginPage(false);
        // Save the token to a secure storage mechanism
      } else {
        console.error("Login was not successful:", responseData);
        // Handle unsuccessful login here
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here
    }
  };
  return (
    <div className={`sound_cloud-login ${loginPage ? "login_page" : ""}`}>
      <div className="sound_cloud-login_container">
        <div className="sound_cloud-login_container_close">
          <CloseRoundedIcon
            style={{ cursor: "pointer" }}
            onClick={handleLoginPage}
          />
        </div>
        <div className="sound_cloud-login_container_content">
          {/* <button className="sound_cloud-login_button_facebook">
            <span>
              <FacebookRoundedIcon />
            </span>
            <span>Continue With Facebook</span>
          </button> */}
          <button
            className="sound_cloud-login_button_google"
            onClick={handleGoogle}
          >
            <span style={{ padding: "0" }}>
              <FcGoogle style={{ fontSize: "1.2rem", padding: "0" }} />
            </span>{" "}
            <span>Continue with Google</span>
          </button>
          {/* <button className="sound_cloud-login_button_apple">
            <span>
              <AppleIcon />{" "}
            </span>{" "}
            <span>Continue With Apple</span>
          </button> */}
          <div className="sound_cloud-login_middle_div">
            <span></span>
            <span>or</span>
            <span></span>
          </div>
          <input
            type="email"
            placeholder="Your Email Adress"
            value={userDetail.email}
            onChange={(e) =>
              setUserDetail({ ...userDetail, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            value={userDetail.password}
            onChange={(e) =>
              setUserDetail({ ...userDetail, password: e.target.value })
            }
          />
          <button
            className="sound_cloud-login_button_continue"
            onClick={handleLogin}
          >
            Continue
          </button>
          <div className="sound_cloud-login_need_help">
            <p>Need Help ?</p>
          </div>
          <div className="sound_cloud-login_policy">
            <p>
              When registering, you agree that we may use your provided data for
              the registration and to send you notifications on our products and
              services. You can unsubscribe from notifications at any time in
              your settings. For additional info please refer to our Privacy
              Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;