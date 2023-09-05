import React from "react";
import Card from "../UI/Card";
import "./Options.scss";

const Options = ({ options, option, setOption }) => {
  return (
    <Card className="options">
      <ul>
        {options.map((opt) => (
          <li
            key={opt}
            className={`${option === opt ? "active" : ""}`}
            onClick={() => {
              setOption(opt);
            }}
          >
            <p
              className={`${option === opt ? "active" : ""}`}
            >{`${opt[0].toUpperCase()}${opt.slice(1)}`}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default Options;
