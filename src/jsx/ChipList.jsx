import { useState } from 'react';
import { SmallChip, MediumChip, LargeChip } from './Chip';
import styled from 'styled-components';

const ChipCon = styled.div`
    height:auto;
`
const Title = styled.p`
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray[800]};
`;

const SubText = styled.p`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray[600]};
`;

const TitleWrap = styled.div`
    display:flex;
    margin-bottom: 2px;
`;

const EssentialIcon = styled.img`
    width: 20px;
    height: 20px;
`;

const ChipListWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;
    max-width: 402px;
    margin-top: 12px;
`;

const sizeToComponent = {
    small: SmallChip,
    medium: MediumChip,
    large: LargeChip,
};

function ChipList({ title, subtext, chips = [], size = 'medium', onChange, unLock = true, max = 3, type ='essential' }) {
    const [selectedChips, setSelectedChips] = useState([]);
    const [touched, setTouched] = useState(false);
    const selected = selectedChips.length > 0;  

    const isEssential = type === 'essential';
    const hasError = isEssential && touched && !selected;
    const hasValue = !!selected;

    const handleChips = (label) => {
        
        setTouched(true);
        const isSelected = selectedChips.includes(label);

         if (!isSelected && selectedChips.length >= max) {
            return;
        }
        const updated = isSelected
        ? selectedChips.filter((item) => item !== label)
        : [...selectedChips, label];

        setSelectedChips(updated);
        if (onChange) onChange(updated);
    };

    const ChipComponent = sizeToComponent[size] || MediumChip;

    return (
        <ChipCon>
        <TitleWrap>
                <Title>{title}</Title>
                {isEssential && <EssentialIcon src="/essential.svg" alt="필수 입력" />}
        </TitleWrap>
        
        {subtext && <SubText>{subtext}</SubText>}

        <ChipListWrap>
        {chips.map((label) => (
            <ChipComponent
            key={label}
            selected={selectedChips.includes(label)}
            onClick={unLock ? () => handleChips(label) : undefined}
            >
            {label}
            </ChipComponent>
        ))}
        </ChipListWrap>
        </ChipCon>
    );
}

export default ChipList;
