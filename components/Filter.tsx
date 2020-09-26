import React, { useState } from "react";
import styles from "./Filter.module.css";


const ListOfYears = Array(30).fill(0).map((_, idx) => 1990 + (idx * 1));
const Filter = ({ handleChangeFilterValue }) => {
  const [year, setYear] = useState("0000");
  const [launch, setLaunch] = useState("Yes");
  const [landing, setLanding] = useState("No");
  const handleChangeToggle = (name,value) => {
    if (name === "Launch"){
      handleChangeFilterValue({
        year,
        launch: value === "Yes",
        landing: landing === "Yes",
      });
      setLaunch(value);
    }
    else if (name=== "year") {
      handleChangeFilterValue({
        year: value,
        launch: launch === "Yes",
        landing: landing === "Yes",
      });
      setYear(value);
    } else if (name==="Landing") {

      handleChangeFilterValue({
        year,
        launch: launch === "Yes",
        landing: value === "Yes",
      });

      setLanding(value);
    }
  };
  return (
    <>
      <h4 className={styles.title}>SpacEx Launch Programs</h4>

      <select className={styles.select} name="year" id="year" value={year} onChange={(e)=>handleChangeToggle("year",e.target.value)}>
        {ListOfYears.map(year=>
        <option value={year} key={year}>{year}</option>
        )}
        <option value="0000">All Years</option>
      </select>
      <h4 className={styles.title}>Successful Launch</h4>

        <input
          type="button"
          id="Yes-Launch"
          onClick={()=>handleChangeToggle("Launch","Yes")}
          name="Launch"
        className={styles.chipButton}
        value="Yes"
        />

      
        <input
          type="button"
          id="No-Launch"
          onClick={()=>handleChangeToggle("Launch","No")}
          name="Launch"
        className={styles.chipButton}
        value="No"
        />
      <br />
      <h4 className={styles.title}>Successful Landing</h4>


     
      <input
        type="button"
        name="Landing"
        value="Yes"
        className={styles.chipButton}

        onClick={()=>handleChangeToggle("Landing","Yes")}
      >
      </input>
      <input
        type="button"
        name="Landing"
        value="No"
        className={styles.chipButton}
        onClick={()=>handleChangeToggle("Landing","No")}
        >
      </input>
      <br />
    </>
  );
};

export default Filter;