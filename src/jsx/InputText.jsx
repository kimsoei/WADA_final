import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const InputWrap = styled.div`
    width: 100%;
    max-width: 362px;
    display: flex;
    flex-direction: column;
`;

const TitleWrap = styled.div`
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray[800]};
    display: flex;
    align-items: center;
    margin-bottom: 12px;
`;

const EssentialIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-left: 4px;
`;

const errorAnimation = {
    initial: { x: 0 },
    animate: {
        x: [0, -4, 0, 4, 0, -4, 0, 4, 0],
        transition: { duration: 0.2 },
    },
};

const MotionInput = styled(motion.input)`
    width: 100%;
    padding: ${({ $isTopic }) => ($isTopic ? '12px 16px' : '12px 16px 60px 16px')};
    border-radius: ${({ theme }) => theme.radius.small};
    border: 1px solid
        ${({ theme, $hasError, $hasValue }) =>
        $hasError
            ? theme.colors.error
            : $hasValue
            ? theme.colors.primary
            : theme.colors.gray[300]};
    color: ${({ theme }) => theme.colors.gray[800]};
    font-size: 14px;
    line-height: 22px;
    resize: none;
    height: auto;

    &::placeholder {
        color: ${({ theme }) => theme.colors.gray[400]};
    }

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
    }

    &::-webkit-scrollbar {
        display: none; 
    }
`;

const MotionErrorMsg = styled(motion.p)`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.error};
    line-height: 150%;
    margin-top: 8px;
`;

function InputText({
    title = '제목',
    placeholder = '텍스트를 입력해주세요',
    type = 'default',
    topic = true,
    value,
    onChange,
}) {
    const [touched, setTouched] = useState(false);

    const isEssential = type === 'essential';
    const hasError = isEssential && touched && value.trim() === '';
    const hasValue = value.trim() !== '';

    const handleBlur = () => setTouched(true);

    const handleChange = (e) => {
        onChange?.(e.target.value);
    }

    return (
        <InputWrap>
        <TitleWrap>
            {title}
            {isEssential && <EssentialIcon src="/essential.svg" alt="필수 입력" />}
        </TitleWrap>

        <MotionInput
            as={topic ? 'input' : 'textarea'}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            $hasError={hasError}
            $hasValue={hasValue}
            $isTopic={topic}
            {...(hasError ? errorAnimation : {})}
        />

        {hasError && (
            <MotionErrorMsg {...errorAnimation}>
            필수 입력사항입니다.
            </MotionErrorMsg>
        )}
        </InputWrap>
    );
}

export default InputText;
