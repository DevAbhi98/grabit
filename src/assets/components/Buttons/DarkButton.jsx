import CircularProgress from "@mui/material/CircularProgress";
import Lottie from "react-lottie";
import animationData from "../../lotties/progressbar.json";

export default function DarkButton({
  children,
  isProgress,
  onClick,
  extraClasses,
}) {
  const loaderOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <button
      onClick={onClick}
      className={`dark-button m-t-1 ${
        isProgress && "disable-button"
      } ${extraClasses}`}
    >
      <div className="dark-button-content">
        {isProgress && <Lottie options={loaderOptions}></Lottie>}
        {!isProgress && <p>{children}</p>}
      </div>
    </button>
  );
}
