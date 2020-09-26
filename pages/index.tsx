import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Filter from "../components";

const fetcher = (url) =>
  fetch(url).then((r) =>
    r.json().then((data) =>
      data.map((d) => ({
        ...d,
        //lading data may not be available
        land_success: !!(
          d.rocket.first_stage &&
          d.rocket.first_stage.cores &&
          d.rocket.first_stage.cores[0] &&
          d.rocket.first_stage.cores[0].land_success
        ),
      }))
    )
  );

export async function getServerSideProps() {
  const data = await fetcher("https://api.spacexdata.com/v3/launches");
  return { props: { data } };
}

export default function Home({ data }) {
  const [openFilter, setOpenFilter] = useState(true);
  const [filterState, setFilterState] = useState({
    year: "0000",
    landing: false,
    launch: true,
  });
  const handleChangeFilterValue = (newFilterValue) => {
    setFilterState(newFilterValue);
  };

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
          {data
            .filter((launchData) => {
              let result = true;
              for (let i of booleanFilterFunctions)
                result = result && i(launchData);
              return result;
            })
            .map((launchData) => (
              <a key={launchData.flight_id} className={styles.card}>
                <img src={launchData.links.mission_patch_small}></img>

                <h3>
                  {launchData.mission_name} #{launchData.flight_number}
                </h3>
                <b>Mission Ids</b>
                <ul>
                  {launchData.mission_id.length > 0 &&
                    launchData.mission_id.map((missionId) => (
                      <li>{missionId}</li>
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
