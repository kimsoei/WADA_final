import styled from "styled-components";
import { useState } from "react";

import PositionCard from "./PositionCard";
import { useEffect } from "react";

const CardListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

function PositionCardList({ cards = [], mode = "single", onSelect, purpose, onChange }) {
  const [selected, setSelected] = useState([]);
  const [cardList, setCardList] = useState(cards);

  const positionClick = (index) => {
    if (mode === "single") {
      setSelected([index]);
    } else {
      setSelected((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    }

    if (onSelect) {
      onSelect(cards[index]);
    }
  };

  useEffect(() => {
    setCardList(cards);
  }, [cards]);

 const handleDelete = (index) => {
  const newCardList = cardList.filter((_, i) => i !== index);
  setCardList(newCardList);
  if (onChange) onChange(newCardList);
};


  return (
    <CardListWrap>
      {cardList.map((card, index) => {
        let type = "default";
        if (mode === "single") {
          if (selected.length > 0) {
            type = selected.includes(index) ? "selected" : "disabled";
          }
        } else {
          type = selected.includes(index) ? "selected" : "default";
        }

        return (
          <PositionCard
            key={index}
            type={type}
            title={card.title}
            skills={card.skills}
            onClick={() => positionClick(index)}
            onDelete={() => handleDelete(index)}
            purpose={purpose}
          />
        );
      })}
    </CardListWrap>
  );
}
export default PositionCardList;
