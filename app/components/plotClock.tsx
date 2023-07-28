"use client";
import { useEffect, useState } from "react";
import styles from "../../styles/components/plotClock.module.css";
import { AnimatePresence, motion } from "framer-motion";

interface PlotCard {
  id: number;
  start: number;
  climax: number;
  name: string;
}

export interface PlotClockProps {
  time: number;
}

const PlotClock = (props: PlotClockProps) => {
  const [cards, setCards] = useState<PlotCard[]>([]);

  const addCard = () => {
    const newId = cards.length == 0 ? 1 : cards[cards?.length - 1].id + 1;
    const newCard = {
      id: newId,
      start: props.time,
      climax: 20,
      name: "new plot",
    };
    setCards([...cards, newCard]);
  };
  const removeCard = (deleteId: number) => {
    const newList = cards.reduce((acc: PlotCard[], curr: PlotCard) => {
      if (curr.id === deleteId) return acc;
      acc.push(curr);
      return acc;
    }, []);
    setCards(newList);
  };

  return (
    <>
      <button
        className={styles.plotButton}
        onClick={addCard}>
        New Plot
      </button>
      <div className={styles.plotClock}>
        <AnimatePresence mode={"popLayout"}>
          {cards?.map((card) => (
            <motion.div
              layout
              initial={{ x: -500 }}
              animate={{ x: 0 }}
              exit={{ x: -500, opacity: 0 }}
              transition={{ type: "spring" }}
              key={card.id}
              className={styles.plotCard}>
              <div
                className={styles.plotProgress}
                style={{
                  width: `${
                    ((props.time - card.start) / (card.climax - card.start)) *
                    100
                  }%`,
                }}
              />
              {card.name}
              <button onClick={() => removeCard(card.id)}>delete plot</button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default PlotClock;
