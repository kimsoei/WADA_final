import styled from "styled-components";
import { useState } from "react";

const TabMenuWrap = styled.div`
  width: 402px;
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};
  padding-left: 20px;
  gap: 20px;
  background-color: #fff;
  z-index: 5;
`;

const TabItem = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.2s ease;

  font-weight: ${({ $selected }) => ($selected ? 600 : 500)};

  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.gray[800] : theme.colors.gray[300]};

  border-bottom: ${({ theme, $selected }) =>
    $selected ? `3px solid ${theme.colors.gray[800]}` : "none"};
`;

export default function TabMenu({ items = [], onChange }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleClick = (index) => {
    setSelectedTab(index);
    onChange?.(items[index]);
  };

  return (
    <TabMenuWrap>
      {items.map((tab, index) => (
        <TabItem
          key={index}
          $selected={selectedTab === index}
          onClick={() => handleClick(index)}
        >
          {tab}
        </TabItem>
      ))}
    </TabMenuWrap>
  );
}
