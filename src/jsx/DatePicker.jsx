import styled from "styled-components";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { forwardRef } from "react";
import { useEffect } from "react";
import "../DatePickerStyle.css";

import { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko"; // 한국어 locale
import "react-datepicker/dist/react-datepicker.css";
registerLocale("ko", ko);

import { theme } from "../styles/theme";

//위 4줄은 date-picker 라이브러리 한글로 바꾸려고 긁어온거라 무시하심 댐다!! 혹시 작동 안되면 npm install date-fns 하시면 댐다!

const DatePickerWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TitleWrap = styled.div``;

const Title = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.gray[800]};
`;

const PickerCon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: auto;
`;

const Dash = styled.span`
  width: 12px;
  height: 2px;
  background-color: ${theme.colors.gray[900]};
`;

const PickerBox = styled.div`
  width: 164px;
  height: 40px;
  border: 1px solid ${theme.colors.gray[400]};
  padding: 8px 10px;
  border-radius: 2px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CalendarIcon = styled.i`
  width: 20px;
  height: 20px;
  background-image: url(${import.meta.env.BASE_URL + "/calendar.svg"});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

const DefaultDate = styled.p`
  font-size: 14px;
`;

const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
  <PickerBox onClick={onClick} ref={ref}>
    <DefaultDate>{value}</DefaultDate>
    <CalendarIcon />
  </PickerBox>
));

function DatePicker({ title, value, onChange }) {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  useEffect(() => {
    if (value?.length === 2) {
      setFromDate(value[0]);
      setToDate(value[1]);
    }
  }, [value]);

  const handleFromDate = (date) => {
    setFromDate(date);
    onChange?.([date, toDate]);
  };

  const handleToDate = (date) => {
    setToDate(date);
    onChange?.([fromDate, date]);
  };

  return (
    <DatePickerWrap>
      <TitleWrap>
        <Title>{title}</Title>
      </TitleWrap>

      <PickerCon>
        <ReactDatePicker
          selected={fromDate}
          onChange={handleFromDate}
          customInput={<CustomDateInput />}
          dateFormat="yyyy.MM.dd"
          locale="ko"
        ></ReactDatePicker>

        <Dash></Dash>

        <ReactDatePicker
          selected={toDate}
          onChange={handleToDate}
          customInput={<CustomDateInput />}
          dateFormat="yyyy.MM.dd"
          locale="ko"
        ></ReactDatePicker>
      </PickerCon>
    </DatePickerWrap>
  );
}

export default DatePicker;
