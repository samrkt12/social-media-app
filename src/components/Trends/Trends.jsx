import React from "react";
import Card from "../UI/Card";
import "./Trends.scss";
import { DUMMY_TRENDS } from "../../Data";
const Trends = ({ className }) => {
  return (
    <Card className={`trends ${className ? className : ""}`}>
      <div className="title">
        <span>Trends for you</span>
      </div>
      <div className="line" />
      {DUMMY_TRENDS.map((item) => (
        <div key={item.id} className="trend">
          <p>{`#${item.title}`}</p>
          <span>{`${item.count}k Tweets`}</span>
        </div>
      ))}
    </Card>
  );
};

export default Trends;
