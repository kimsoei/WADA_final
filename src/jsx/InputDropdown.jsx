import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const DropdownWrap = styled.div`
  width: 100%;
  max-width: 362px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const TitleWrap = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray[800]};
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const EssentialIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const MotionDropdownHeader = styled(motion.button)`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 22px;
  text-align: left;
  background-color: #fff;
  border: 1px solid ${({ theme, $hasError, open }) =>
    $hasError ? theme.colors.error : open ? theme.colors.primary : theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.radius.small};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme, $inValue }) => $inValue ? theme.colors.gray[800] : theme.colors.gray[400]};
  cursor: pointer;
`;

const StyledArrow = styled.img`
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
  transform: ${({ open }) => (open ? 'rotate(-180deg)' : 'rotate(0deg)')};
`;

const DropdownList = styled(motion.ul)`
  width: 100%;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.radius.small};
  margin-top: 4px;
  overflow: hidden;
  z-index: 10;
  padding: 4px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DropdownItem = styled.li`
  padding: 12px;
  font-size: 14px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.secondary : '#fff'};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.gray[800]};
  border-radius: ${({ theme }) => theme.radius.small};
  cursor: pointer;
`;

const MotionErrorMsg = styled(motion.p)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
  line-height: 150%;
  margin-top: 8px;
`;

const dropdownAnimation = {
  open: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
  closed: { opacity: 0, height: 0, transition: { duration: 0.5 } },
};

const errorShake = {
  initial: { x: 0 },
  animate: {
    x: [0, -4, 0, 4, 0, -4, 0, 4, 0],
    transition: { duration: 0.3 },
  },
};

function InputDropdown({
  items = [],
  title = '항목 선택',
  placeholder = '선택해주세요',
  onSelect,
  type = 'default',
  value = '',
}) {
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const selected = value;

  const isEssential = type === 'essential';
  const hasError = isEssential && touched && !selected;
  const hasValue = !!selected;

  const handleToggle = () => {
    if (open && !selected) {
      setTouched(true);
    }
    setOpen(!open);
  };

  const handleSelect = (item) => {
    setOpen(false);
    onSelect?.(item);
  };

  return (
    <DropdownWrap>
      <TitleWrap>
        {title}
        {isEssential && <EssentialIcon src="/essential.svg" alt="필수 입력" />}
      </TitleWrap>

      <MotionDropdownHeader
        onClick={handleToggle}
        open={open}
        $inValue={hasValue}
        $hasError={hasError}
        {...(hasError ? errorShake : {})}
      >
        {selected || placeholder}
        <StyledArrow src="/arrow_bottom.svg" open={open} alt="화살표" />
      </MotionDropdownHeader>

      <AnimatePresence>
        {open && (
          <DropdownList
            initial="closed"
            animate="open"
            exit="closed"
            variants={dropdownAnimation}
          >
            {items.map((item) => (
              <DropdownItem
                key={item}
                onClick={() => handleSelect(item)}
                selected={selected === item}
              >
                {item}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </AnimatePresence>

      {hasError && (
        <MotionErrorMsg {...errorShake}>필수 선택 항목입니다.</MotionErrorMsg>
      )}
    </DropdownWrap>
  );
}

export default InputDropdown;
