import React, { useEffect, useState } from "react";
import styles from "./calender.module.css";

export const Calendar = ({ handleClick, value }) => {
  const [selected, setSelected] = useState(0);

  const arr = [];
  var current = new Date();
  var stop = new Date();
  stop.setDate(stop.getDate() + 7);

  for (var i = 0; i < 7; i++) {
    arr.push(current.toDateString());
    current.setDate(current.getDate() + 1);
  }

  return (
    <div>
      {arr.map((val, idx) => {
        return (
          <div
            className={
              idx === selected ? styles.dateActive : styles.dateContainer
            }
            key={idx}
            onClick={(e) => {
              setSelected(idx);
              handleClick(val);
            }}
          >
            <p>{val}</p>
          </div>
        );
      })}
    </div>
  );
};
