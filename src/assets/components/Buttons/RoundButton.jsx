import React from "react";
import "./buttons.scss";
export default function RoundButton({ icon }) {
  return (
    <button style={styles.button}>
      <img src={icon} style={styles.icon} alt="icon" />
    </button>
  );
}

const styles = {
  button: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 50,
    display: "flex",
    padding: 0,
    borderStyle: "solid",
  },
  icon: {
    width: 40,
    height: 40,
    margin: "auto",
  },
};
