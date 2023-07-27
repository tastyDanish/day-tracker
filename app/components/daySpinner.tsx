"use client";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/components/daySpinner.module.css";
import { AnimatePresence, motion, useAnimate } from "framer-motion";

export interface DaySpinnerProps {
  onclick(PartOfDay: number): void;
}

const nightColor = "hsl(257,91,30)";
const eveningColor = "hsl(37,100,27)";
const dayColor = "hsl(196,100,45)";
const morningColor = "hsl(40, 76%, 46%)";

const forwardColors = [
  [nightColor, morningColor],
  [morningColor, dayColor],
  [dayColor, eveningColor],
  [eveningColor, nightColor],
];

const backwardColors = [
  [dayColor, morningColor],
  [eveningColor, dayColor],
  [nightColor, eveningColor],
  [morningColor, nightColor],
];

const convertPartToString = (rotations: number) => {
  switch (rotations % 4) {
    case -3:
      return "Day";
    case -2:
      return "Evening";
    case -1:
      return "Night";
    case 0:
      return "Morning";
    case 1:
      return "Day";
    case 2:
      return "Evening";
    case 3:
      return "Night";
    default:
      return "Invalid number";
  }
};

const DaySpinner = (props: DaySpinnerProps) => {
  const [scope, animate] = useAnimate();
  const [bgScope, bgAnimate] = useAnimate();
  const [partOfDay, setPartOfDay] = useState(0);
  const rotation = useRef(0);

  const handleClick = (timeJump: number) => {
    return () => {
      rotation.current = rotation.current + timeJump;
      const degrees = rotation.current * 90;
      const bgColor =
        timeJump < 0
          ? backwardColors[Math.abs(rotation.current % 4)]
          : forwardColors[rotation.current % 4];
      bgAnimate(bgScope.current, {
        backgroundColor: bgColor,
      });
      setPartOfDay(rotation.current);
      animate(
        scope.current,
        { transform: `rotate(${degrees}deg)` },
        { duration: 0.5, ease: "easeInOut" }
      );
    };
  };

  return (
    <>
      <div className={styles.dayCounter}>
        DAY: {Math.floor(rotation.current / 4)}
      </div>
      <div className={styles.textContainer}>
        <button
          disabled={rotation.current < 1}
          className={styles.nextButton}
          onClick={handleClick(-1)}>
          {"<"}
        </button>
        <div className={styles.dayText}>{convertPartToString(partOfDay)}</div>
        <button
          className={styles.nextButton}
          onClick={handleClick(1)}>
          {">"}
        </button>
      </div>
      <AnimatePresence>
        {convertPartToString(partOfDay) === "Day" && (
          <div className={styles.cloudContainer}>
            <motion.div
              className={styles.cloud}
              initial={{ opacity: 0, x: -800 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -800 }}
              transition={{ duration: 0.6 }}
            />
            <motion.div
              className={styles.cloud}
              initial={{ opacity: 0, x: 800 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 800 }}
              transition={{ duration: 0.6 }}
            />
          </div>
        )}
      </AnimatePresence>

      <div
        className={styles.background}
        ref={bgScope}>
        <div
          className={styles.skySpinner}
          ref={scope}>
          <div className={styles.day} />
          <div className={styles.night} />
        </div>
      </div>
    </>
  );
};

export default DaySpinner;
