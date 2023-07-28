"use client";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/components/daySpinner.module.css";
import { AnimatePresence, motion, useAnimate } from "framer-motion";

export interface DaySpinnerProps {
  onclick(amount: number): void;
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

const DaySpinner = (props: DaySpinnerProps) => {
  const [scope, animate] = useAnimate();
  const [bgScope, bgAnimate] = useAnimate();
  const [rotation, setRotation] = useState(0);
  const [dayPart, setDayPart] = useState("Morning");

  const dayPartName = (rotations: number) => {
    switch (rotations % 4) {
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

  const handleClick = (timeJump: number) => {
    const newRotation = rotation + timeJump;
    const degrees = newRotation * 90;
    const bgColor =
      timeJump < 0
        ? backwardColors[Math.abs(newRotation % 4)]
        : forwardColors[newRotation % 4];
    bgAnimate(bgScope.current, {
      backgroundColor: bgColor,
    });
    animate(
      scope.current,
      { transform: `rotate(${degrees}deg)` },
      { duration: 0.5, ease: "easeInOut" }
    );
    props.onclick(timeJump);
    setRotation(newRotation);
    setDayPart(dayPartName(newRotation));
  };

  return (
    <>
      <div className={styles.dayCounter}>DAY: {Math.floor(rotation / 4)}</div>
      <div className={styles.textContainer}>
        <button
          disabled={rotation < 1}
          className={styles.nextButton}
          onClick={() => handleClick(-1)}>
          {"<"}
        </button>
        <div className={styles.dayText}>{dayPart}</div>
        <button
          className={styles.nextButton}
          onClick={() => handleClick(1)}>
          {">"}
        </button>
      </div>

      <AnimatePresence>
        {dayPart === "Day" && (
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
      <AnimatePresence>
        {dayPart === "Night" && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={styles.star}
              style={{ top: 80, left: 400 }}>
              ✦
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={styles.star}
              style={{ top: 120, left: 720 }}>
              ✦
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={styles.star}
              style={{ top: 280, left: 460 }}>
              ✦
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={styles.star}
              style={{ top: 300, left: 750 }}>
              ✦
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={styles.star}
              style={{ top: 50, left: 600 }}>
              ✦
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={styles.star}
              style={{ top: 400, left: 600 }}>
              ✦
            </motion.div>
          </>
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
