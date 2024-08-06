import { useRef } from "react";
import "./inputs.scss";

export default function BigTextArea({ text, setInputText, ...props }) {
  const input = useRef();

  function handleOnChange(e) {
    console.log("MyValue", e.target.value);
    setInputText(e);
  }

  return (
    <div className="theme-input">
      <textarea value={text} onChange={handleOnChange} {...props} />
    </div>
  );
}
