"use client";
import { motion, useAnimate } from "framer-motion";
import styles from "../../styles/components/roller.module.css";
import { useEffect, useRef, useState } from "react";

export interface RollerProps {
  afterRoll(): void;
  items: CardInfo[];
}

interface CardInfo {
  index: number;
  color: string;
}

export const createList = () => {
  let cardList: CardInfo[] = [];
  for (let i = 0; i < 40; i++) {
    cardList.push({ index: i, color: color() });
  }
  return cardList;
};

const color = () => {
  const result = Math.random();
  if (result <= 0.6) {
    return "grey";
  } else if (result <= 0.9) {
    return "blue";
  } else {
    return "red";
  }
};

const Roller = (props: RollerProps) => {
  const [rollerScope, animate] = useAnimate();
  const [showCard, setShowCard] = useState<CardInfo | null>();

  const colorToStyle = (color: string) => {
    switch (color) {
      case "grey":
        return styles.grey;
      case "blue":
        return styles.blue;
      case "red":
        return styles.red;
    }
  };

  const doAnimation = async () => {
    await animate(
      rollerScope.current,
      { x: -6400 },
      { delay: 0.4, duration: Math.random() * 2 + 6, ease: [0.2, 0.2, 0, 1] }
    );
  };

  useEffect(() => {
    doAnimation().then(() => setShowCard(props.items[37]));
  }, []);

  return (
    <>
      <div
        className={styles.overlay}
        onClick={() => {
          if (showCard) props.afterRoll();
        }}
      />
      <div className={styles.roller}>
        {showCard && (
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            transition={{ delay: 0.4 }}
            className={`${styles.showCard} ${colorToStyle(showCard.color)}`}
          />
        )}
        <div className={styles.rollerContainer}>
          <div
            ref={rollerScope}
            className={styles.cardContainer}>
            {props.items.map((card) => (
              <div
                style={{ color: "black" }}
                key={card.index}
                className={`${styles.rollerCard} ${colorToStyle(
                  card.color
                )}`}></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Roller;
