"use client";
import { useState } from "react";
import styles from "../styles/page.module.css";
import Roller, { createList } from "./components/roller";
import DaySpinner from "./components/daySpinner";

const Home = () => {
  const [doRoll, setDoRoll] = useState(false);

  const items = createList();

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <button
          onClick={(_) => {
            setDoRoll(!doRoll);
          }}>
          Roll it
        </button>
        {doRoll && (
          <Roller
            afterRoll={() => setDoRoll(!doRoll)}
            items={items}
          />
        )}
      </div>

      <DaySpinner onclick={() => {}} />
    </main>
  );
};

export default Home;
