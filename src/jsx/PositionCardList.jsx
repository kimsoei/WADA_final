import styled from "styled-components";
import { useState } from "react";

import PositionCard from "./PositionCard";

const CardListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

function PositionCardList({ cards = [], mode = "single" }) {
  const [selected, setSelected] = useState([]);

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
  };

  return (
    <CardListWrap>
      {cards.map((card, index) => {
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
          />
        );
      })}
    </CardListWrap>
  );
}
export default PositionCardList;
