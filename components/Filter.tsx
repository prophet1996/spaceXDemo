import React, { useState } from "react";
import styles from "./Filter.module.css";

const ListOfYears = Array(15)
  .fill(0)
  .map((_, idx) => (2006 + idx * 1).toString());
const Filter = ({ handleChangeFilterValue }) => {
  const [year, setYear] = useState("0000");
  const [launch, setLaunch] = useState("Yes");
  const [landing, setLanding] = useState("No");
  const handleChangeToggle = (name, value) => {
    let path ;
    if (name === "Launch") {
      handleChangeFilterValue({
        year,
        launch: value === "Yes",
        landing: landing === "Yes",
      });
      setLaunch(value);
      path=`?year=${year}&launch=${value}&landing=${landing}`;
    } else if (name === "year") {
      handleChangeFilterValue({
        year: value,
        launch: launch === "Yes",
        landing: landing === "Yes",
      });
      setYear(value);
      path=`?year=${value}&launch=${launch}&landing=${landing}`
      
      
    } else if (name === "Landing") {
      handleChangeFilterValue({
        year,
        launch: launch === "Yes",
        landing: value === "Yes",
      });
      
      setLanding(value);
      path=`?year=${year}&launch=${launch}&landing=${value}`

    }
    window.history.pushState('', null,path);
  };
  return (
    <>
      <label htmlFor="year">
        <h3 className={styles.title}>Launch Year</h3>
        <hr />
      </label>
      <span className={styles.yearsList}>
        {ListOfYears.map((mYear) => (
          <label htmlFor="year" key={mYear}>
            <input
              type="button"
              id={`year-${mYear}`}
              onClick={() => handleChangeToggle("year", mYear)}
              name={`year-${mYear}`}
              className={`${styles.chipButton} ${
                year===mYear ? styles.shadow : ""
              }`}
              value={mYear}
            />
          </label>
        ))}
        <label htmlFor="year">
          <input
            type="button"
            id="year-0000"
            name="year-0000"
            onClick={() => handleChangeToggle("year", "0000")}
            className={`${styles.chipButton} ${
              launch === "Yes" ? styles.shadow : ""
            }`}
            value="0000"
          />
        </label>
      </span>
      <label htmlFor="year">
        <h3 className={styles.title}>Successful Launch</h3>
        <hr />
      </label>
      <span className={styles.yearsList}>
        <label htmlFor="Launch-Yes">
          <input
            type="button"
            id="Launch"
            onClick={() => handleChangeToggle("Launch", "Yes")}
            name="Launch-Yes"
            className={`${styles.chipButton} ${
              launch === "Yes" ? styles.shadow : ""
            }`}
            value="Yes"
          />
        </label>
        <label htmlFor="Launch-No">
          <input
            type="button"
            id="Launch"
            onClick={() => handleChangeToggle("Launch", "No")}
            name="Launch-No"
            className={`${styles.chipButton} ${
              launch === "No" ? styles.shadow : ""
            }`}
            value="No"
          />
        </label>
      </span>
      <label htmlFor="year">
        <h3 className={styles.title}>Successful Landing</h3>
        <hr />
      </label>

      <span className={styles.yearsList}>
        <label htmlFor="Landing-Yes">
          <input
            type="button"
            name="Landing"
            id="Landing-Yes"
            value="Yes"
            className={`${styles.chipButton} ${
              landing === "Yes" ? styles.shadow : ""
            }`}
            onClick={() => handleChangeToggle("Landing", "Yes")}
          ></input>
        </label>
        <label htmlFor="Landing-No">
          <input
            type="button"
            name="Landing"
            id="Landing-No"
            value="No"
            className={`${styles.chipButton} ${
              landing === "No" ? styles.shadow : ""
            }`}
            onClick={() => handleChangeToggle("Landing", "No")}
          ></input>
        </label>
      </span>
      <br />
    </>
  );
};

export default Filter;
