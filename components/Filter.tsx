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
      
      <label htmlFor="year">
      <h3 className={styles.title}>SpacEx Launch Programs</h3>
      </label>
      <select className={styles.select} name="year" id="year" value={year} onChange={(e)=>handleChangeToggle("year",e.target.value)}>
        {ListOfYears.map(year=>
        <option value={year} key={year}>{year}</option>
        )}
        <option value="0000">All Years</option>
      </select>
      <h3 className={styles.title}>Successful Launch</h3>
      <label htmlFor="Launch-Yes">

        <input
          type="button"
          id="Launch"
          onClick={()=>handleChangeToggle("Launch","Yes")}
          name="Launch-Yes"
          className={`${styles.chipButton} ${launch==="Yes"?styles.shadow:""}` }

        value="Yes"
        />
        </label>
      <label htmlFor="Launch-No">

      
        <input
          type="button"
          id="Launch"
          onClick={()=>handleChangeToggle("Launch","No")}
          name="Launch-No"
          className={`${styles.chipButton} ${launch==="No"?styles.shadow:""}` }

        value="No"
        />
        </label>
      <br />
      <h3 className={styles.title}>Successful Landing</h3>


      <label htmlFor="Landing-Yes">

     
      <input
        type="button"
        name="Landing"
        id="Landing-Yes"
        value="Yes"
        className={`${styles.chipButton} ${landing==="Yes"?styles.shadow:""}` }
        
        
        onClick={()=>handleChangeToggle("Landing","Yes")}
        >
      </input>
        </label>
      <label htmlFor="Landing-No">

      <input
        type="button"
        name="Landing"
        id="Landing-No"
        value="No"
        className={`${styles.chipButton} ${landing==="No"?styles.shadow:""}` }
        onClick={()=>handleChangeToggle("Landing","No")}
        >
      </input>

      </label>
      <br />
    </>
  );
};

export default Filter;