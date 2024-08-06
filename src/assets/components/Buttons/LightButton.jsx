export default function LightButton({ children }) {
  return (
    <button className="light-button m-t-1">
      <div>
        <p>{children}</p>
        <progress value="50" max="100"></progress>
      </div>
    </button>
  );
}
