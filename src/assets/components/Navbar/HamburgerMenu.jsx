export default function HamburgerMenu({ isActive, handleClick }) {
  return (
    <div
      className={`hamburger ${isActive ? " is-active" : ""}`}
      id="hamburger-1"
      onClick={handleClick}
    >
      <span className="line"></span>
      <span className="line"></span>
      <span className="line"></span>
    </div>
  );
}
