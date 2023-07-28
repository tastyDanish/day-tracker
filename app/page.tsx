"use client";
import { useState } from "react";
import styles from "../styles/page.module.css";
import Roller, { createList } from "./components/roller";
import DaySpinner from "./components/daySpinner";
import PlotClock from "./components/plotClock";

const Home = () => {
  const [doRoll, setDoRoll] = useState(false);
  const [time, setTime] = useState(0);

  const items = createList();

  const timeChange = (amount: number) => {
    setTime(time + amount);
  };

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
      <PlotClock time={time} />
      <DaySpinner onclick={timeChange} />
    </main>
  );
};

export default Home;
