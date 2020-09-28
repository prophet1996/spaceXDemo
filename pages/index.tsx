import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useLayoutEffect } from "react";
import {Filter} from "../components";
import { fetcher, debounce } from "../utils";

export async function getServerSideProps() {
  const data = await fetcher("https://api.spacexdata.com/v3/launches");
  return { props: { data } };
}

export default function Home({ data }) {
  const [openFilter, setOpenFilter] = useState(true);
  const [stateData,setData] = useState(data);
  const [filterState, setFilterState] = useState({
    year: "0000",
    landing: false,
    launch: true,
  });
  const _updateSpaceData = async ()=>{
   await debounce(async ()=>fetcher("https://api.spacexdata.com/v3/launches",setData),1000,true)();
  }
  const handleChangeFilterValue = (newFilterValue) => {
    setFilterState(newFilterValue);
    _updateSpaceData();
  };
  useLayoutEffect(()=>{
    window.history.pushState('', null,`?year=${filterState.year}&launch=${filterState.launch?"Yes":"No"}&landing=${filterState.landing?"Yes":"No"}`);
  },[])

  //to apply filter functions in one loop
  const booleanFilterFunctions = [
    (launchData) =>
      launchData.launch_year === filterState.year ||
      filterState.year === "0000",
    (launchData) => launchData.launch_success === filterState.launch,
    (launchData) => launchData.land_success === filterState.landing,
  ];

  return (
    //Wrapper for to level grad based layout
    <div className={styles.wrapper}>
      <Head>
        <title>SpaceX Launch</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="Description" content="Owner: Ishank Sharma spaceX demo"></meta>
      </Head>
      <header className={styles.header}>
        <h2 className={styles.title}>SpacEx Launch Programs</h2>
      </header>
      <aside className={styles.aside}>
        <button
          type="button"
          onClick={() => setOpenFilter(!openFilter)}
          className={styles.collapsible}
        >
          Filters
        </button>

        <div
          className={`${styles.filterContent} ${
            !openFilter ? styles.invisible : ""
          }`}
        >
          <Filter handleChangeFilterValue={handleChangeFilterValue} />
        </div>
      </aside>
      <main className={styles.main}>
        <div className={styles.grid}>
          {stateData
            .filter((launchData) => {
              let result = true;
              for (let i of booleanFilterFunctions)
                result = result && i(launchData);
              return result;
            })
            .map((launchData,id) => (
              <a key={launchData.flight_id+""+id} className={styles.card}>
                <img alt={launchData.links.mission_patch_small} loading="lazy" src={launchData.links.mission_patch_small}></img>

                <h3>
                  {launchData.mission_name} #{launchData.flight_number}
                </h3>
                <b>Mission Ids</b>
                <ul>
                  {launchData.mission_id.length > 0 &&
                    launchData.mission_id.map((missionId) => (
                      <li key={missionId}>{missionId}</li>
                    ))}
                  {launchData.mission_id.length <= 0 && "N/A"}
                </ul>
                <span>
                  <b>Launch Year: </b>
                  <i>{launchData.launch_year}</i>
                </span>
                <span>
                  <b>Successful Launch: </b>
                  <i>{launchData.launch_success ? "Yes" : "No"}</i>
                </span>
                <span>
                  <b>Successful Landing: </b>
                  <i>{launchData.land_success ? "Yes" : "No"}</i>
                </span>
              </a>
            ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a rel="noopener noreferrer">
          Created by{"    "}
          <h3>Ishank Sharma</h3>
        </a>
      </footer>
    </div>
  );
}
