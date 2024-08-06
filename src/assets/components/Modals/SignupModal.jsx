import google from "../../images/google.svg";
import facebook from "../../images/facebook.svg";
import apple from "../../images/apple.svg";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/slices/ui-slice";
import SignInButton from "../Buttons/SigninButton";
import { useEffect, useRef, useState } from "react";
import "./modal.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../../../firebase";
import { ref, onValue, set } from "firebase/database";
import DarkButton from "../Buttons/DarkButton";

export default function SignupModal() {
  const [hasEmailError, setEmailHasError] = useState(false);
  const [emailError, setEmailError] = useState();

  const [hasPasswordError, setPasswordHasError] = useState(false);
  const [passwordError, setPasswordError] = useState();

  const [hasNameError, setNameHasError] = useState(false);
  const [nameError, setNameError] = useState();

  const [isProgress, setIsProgress] = useState(false);

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

  // Rest of your code...

  const dispatch = useDispatch();

  const email = useRef();
  const password = useRef();
  const name = useRef();

  function handleOnLogin() {
    dispatch(uiActions.toggleSignup());
    dispatch(uiActions.toggleLogin());
  }

  function handleOnCreate() {
    console.log("Creating user");
    console.log(email.current.value, password.current.value);
    setIsProgress(true);
    if (
      validateEmail(email.current.value) &&
      validatePassword(password.current.value) &&
      validatePassword(name.current.value)
    ) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // firebase
          //   .database()
          setIsProgress(false);
          dispatch(uiActions.toggleSignup());
          const userRef = ref(
            database,
            "users/" + userCredential.user.uid + "/profile"
          );

          set(userRef, {
            name: name.current.value,
            email: email.current.value,
            uid: userCredential.user.uid,
          });

          const user = {
            name: name.current.value,
            email: email.current.value,
            uid: userCredential.user.uid,
          };
          dispatch(uiActions.setLoggedIn({ loggedIn: true }));
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("loggedIn", true);
          console.log(userCredential);
        })
        .catch((error) => {
          setIsProgress(false);
          if (error.code === "auth/email-already-in-use") {
            setEmailHasError(true);
            setEmailError("Email already in use");
            setPasswordHasError(false);
          }
          console.log("FirebaseError", error);
        });
    } else {
      setIsProgress(false);
      if (!validateEmail(email.current.value)) {
        setEmailHasError(true);
        setEmailError("Invalid email");
      } else {
        setEmailHasError(false);
      }

      if (!validatePassword(password.current.value)) {
        setPasswordHasError(true);
        setPasswordError("Invalid password");
      } else {
        setPasswordHasError(false);
      }

      if (!validatePassword(name.current.value)) {
        setNameHasError(true);
        setNameError("Invalid name");
      } else {
        setNameHasError(false);
      }
    }
  }

  useEffect(() => {
    // Disable scroll on mount
    document.body.style.overflow = "hidden";

    // Enable scroll on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="login-modal">
      <div className="login-details">
        <div
          className="close-cross"
          onClick={() => dispatch(uiActions.toggleSignup())}
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

        <h2>Sign up</h2>

        <div className="login-form">
          <h4>Name</h4>
          <div className="input-field">
            <input ref={name} placeholder="Name"></input>
          </div>
          {hasNameError && <p className="login-form-error">{nameError}</p>}

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
        <DarkButton isProgress={isProgress} onClick={handleOnCreate}>
          Signup
        </DarkButton>
        <p className="login-paragraph">
          By tapping “Sign Up” or “Continue with Google, Facebook, or Apple,”
          you agree to GrabIt's Terms and Conditions and Privacy Policy.
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
          <p className="dont-have-account">Already a user?</p>
          <p onClick={handleOnLogin} className="signup">
            Login
          </p>
        </div>
      </div>
    </div>
  );
}
