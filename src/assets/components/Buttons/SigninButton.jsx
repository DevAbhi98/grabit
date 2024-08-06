import "./buttons.scss";
export default function SignInButton({ imageSrc }) {
  return (
    <button className="company-signin">
      <div className="signin">
        <img src={imageSrc} />
      </div>
    </button>
  );
}
