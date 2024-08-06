import google from "../../images/google.svg";
import facebook from "../../images/facebook.svg";
import apple from "../../images/apple.svg";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/slices/ui-slice";
import SignInButton from "../Buttons/SigninButton";
import { useEffect, useRef, useState } from "react";
import "./modal.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../../../firebase.js";
import DarkButton from "../Buttons/DarkButton.jsx";
import { CircularProgress } from "@mui/joy";
import { ref, get, child } from "firebase/database";

export default function LoginModal() {
  const dispatch = useDispatch();

  const [isProgress, setIsProgress] = useState(false);

  const [hasEmailError, setEmailHasError] = useState(false);
  const [emailError, setEmailError] = useState();

  const [hasPasswordError, setPasswordHasError] = useState(false);
  const [passwordError, setPasswordError] = useState();

  const email = useRef();
  const password = useRef();

  function handleOnSignup() {
    dispatch(uiActions.toggleSignup());
    dispatch(uiActions.toggleLogin());
  }

  // Email and password validation function
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(" ", emailRegex.test(email));
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    // Add your password validation logic here
    // For example, you can check for minimum length, special characters, etc.
    console.log("ValidPassword", password.length >= 8);
    return password.length >= 8;
  }

  useEffect(() => {
    // Disable scroll on mount
    document.body.style.overflow = "hidden";

    // Enable scroll on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  function handleOnLogin() {
    setIsProgress(true);
    if (
      validateEmail(email.current.value) &&
      validatePassword(password.current.value)
    ) {
      setEmailHasError(false);
      setPasswordHasError(false);
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          console.log(userCredential);
          setIsProgress(false);
          dispatch(uiActions.toggleLogin());

          get(
            child(
              ref(database),
              "users/" + userCredential.user.uid + "/profile"
            )
          )
            .then((snapshot) => {
              if (snapshot.exists()) {
                let data = snapshot.val();
                const user = {
                  name: data.name,
                  email: data.email,
                  uid: data.uid,
                };

                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("loggedIn", true);

                console.log("LoginObject", data);

                dispatch(
                  uiActions.setLoggedIn({
                    loggedIn: true,
                  })
                );
              } else {
                console.log("Data not available");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          setIsProgress(false);
          if (error.code === "auth/invalid-credential") {
            setPasswordHasError(true);
            setPasswordError("Invalid email or password");
            setEmailHasError(true);
            setEmailError("Invalid email or password");
          }
          console.log("FirebaseError", error);
        });
    } else {
      setIsProgress(false);
      if (!validateEmail(email.current.value)) {
        setEmailHasError(true);
        setEmailError("Invalid email");
      }

      if (!validatePassword(password.current.value)) {
        setPasswordHasError(true);
        setPasswordError("Invalid password");
      }
    }
  }

  return (
    <div className="login-modal">
      <div className="login-details">
        <div
          className="close-cross"
          onClick={() => dispatch(uiActions.toggleLogin())}
        >
          <svg
            id="fi_2976286"
            enable-background="new 0 0 320.591 320.591"
            viewBox="0 0 320.591 320.591"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <g id="close_1_">
                <path d="m30.391 318.583c-7.86.457-15.59-2.156-21.56-7.288-11.774-11.844-11.774-30.973 0-42.817l257.812-257.813c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875l-259.331 259.331c-5.893 5.058-13.499 7.666-21.256 7.288z"></path>
                <path d="m287.9 318.583c-7.966-.034-15.601-3.196-21.257-8.806l-257.813-257.814c-10.908-12.738-9.425-31.908 3.313-42.817 11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414-6.35 5.522-14.707 8.161-23.078 7.288z"></path>
              </g>
            </g>
          </svg>
        </div>

        <h2>Login</h2>

        <div className="login-form">
          <h4>Email</h4>
          <div className="input-field">
            <input ref={email} placeholder="Email"></input>
          </div>
          {hasEmailError && <p className="login-form-error">{emailError}</p>}

          <h4>Password</h4>
          <div className="input-field">
            <input ref={password} placeholder="Password"></input>
          </div>
          {hasPasswordError && (
            <p className="login-form-error">{passwordError}</p>
          )}
        </div>

        <DarkButton onClick={handleOnLogin} isProgress={isProgress}>
          Login
        </DarkButton>
        <p className="login-paragraph">
          By continuing with the sign in process, we may send you a one-time
          verification code via text message to the phone number associated with
          your account. Message and data rates may apply.
        </p>

        <div className="continue-email">
          <div />
          <p>or continue with</p>
          <div />
        </div>

        <div className="signin-section">
          <SignInButton imageSrc={google} />
          <SignInButton imageSrc={facebook} />
          <SignInButton imageSrc={apple} />
        </div>

        <div className="signup-section">
          <p className="dont-have-account">Don't have an account?</p>
          <p className="signup" onClick={handleOnSignup}>
            Signup
          </p>
        </div>
      </div>
    </div>
  );
}
