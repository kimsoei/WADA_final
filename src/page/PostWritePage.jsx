import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { theme } from "../styles/theme";

import Header from "../jsx/Header";
import ProgressBar from "../jsx/ProgressBar";
import InputText from "../jsx/InputText";
import InputDropdown from "../jsx/InputDropdown";
import SelectBtnWrap from "../jsx/SelectBtnWrap";
import ActionBtn from "../jsx/ActionBtn";

import BottomSheet from "../jsx/BottomSheet";
import PositionCardList from "../jsx/PositionCardList";
import DatePicker from "../jsx/DatePicker";

import { useParams } from "react-router-dom";

const Scrim = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  width: 402px;
  height: 874px;
  top: 0;
  left: 0;
  z-index: 999;
`;

const InfoTextWrap = styled.div`
  height: 148px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 0px;
`;

const StepText = styled.p`
  font-size: 14px;
  line-height: 150%;
  font-weight: 500;
  color: ${theme.colors.gray[500]};
`;

const InfoTitle = styled.p`
  font-size: 24px;
  line-height: 28px;
  font-weight: 700;
  color: ${theme.colors.gray[800]};
`;

const InfoText = styled.p`
  font-size: 18px;
  line-height: 150%;
  font-weight: 500;
  color: ${theme.colors.gray[800]};
`;

const InfoSubText = styled.p`
  font-size: 14px;
  line-height: 150%;
  font-weight: 500;
  color: ${theme.colors.gray[400]};
`;

const InputWrap = styled.div`
  width: 100%;
`;

const StepOneWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const StepTwoWrap = styled.div`
  padding-top: 24px;
  height: 472px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 64px;
`;

const ScrollLock = styled.div`
  overflow-y: hidden;
`;

export default function PostWritePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      db.collection("post")
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const postData = doc.data();
            setFormData({
              topic: postData.topic || "",
              category: postData.category || "",
              purpose: postData.purpose || [],
              status: postData.status || "",
              description: postData.description || "",
              positions: postData.positions || [],
              projectDate: postData.projectDate || [],
            });

            setEditPositionCards(postData.positions || []);
          }
        });
    }
  }, [id]);

  useEffect(() => {
    db.collection("profile")
      .get()
      .then((qs) => {
        const data = [];
        qs.forEach((doc) => data.push(doc.data()));
        setProfile(data[0] || null);
      });
  }, []);

  const [editpositionCards, setEditPositionCards] = useState([]);

  const [formData, setFormData] = useState({
    topic: "",
    category: "",
    purpose: [],
    status: "",
    description: "",
    positions: [],
    projectDate: [],
  });

  const isStep1Valid =
    formData.topic.trim() !== "" &&
    formData.category !== "" &&
    formData.purpose.length > 0 &&
    formData.description.trim() !== "";

  const isStep2Valid = formData.positions.length > 0;
  const positionCardLimit = formData.positions.length >= 3;

  const handleNext = () => {
    if (step === 1 && isStep1Valid) {
      setStep(2);
      return;
    }

    if (step === 2 && isStep2Valid) {
      if (id) {
        db.collection("post")
          .doc(id)
          .update(formData)
          .then(() => {
            alert("수정 완료!");
            navigate("/post");
          });
        return;
      }

      const timestamp = new Date().getTime().toString();

      db.collection("post")
        .doc(timestamp)
        .set({
          id: timestamp,
          date: Date.now(),
          viewCount: 0,
          author: profile?.name || "익명",
          ...formData,
        })
        .then(() => {
          alert("작성 완료!");
          navigate("/post");
        });
    }
  };

  return (
    <>
      {bottomSheetOpen && <Scrim onClick={() => setBottomSheetOpen(false)} />}

      <Header type="back" title="파티 모집 작성" backTo="/post" />
      <div className="white-bg">
        <ProgressBar step={step} />
      </div>

      <div className={`write_content_wrap ${step === 2 ? "no-scroll" : ""}`}>
        <InfoTextWrap>
          <StepText>{step}/2</StepText>
          <InfoTitle>
            {step === 1 ? "기본 정보 입력" : "모집 포지션 입력"}
          </InfoTitle>
          <InfoText>
            {" "}
            {step === 1
              ? "프로젝트의 기본 정보를 입력해주세요"
              : "필요한 파티원의 포지션을 등록해주세요"}
          </InfoText>
          <InfoSubText>
            {step === 1 ? "" : "최대 3개까지 선택할 수 있어요."}
          </InfoSubText>
        </InfoTextWrap>

        <InputWrap key={step}>
          {step === 1 ? (
            <StepOneWrap>
              <InputText
                title="프로젝트 주제"
                placeholder="구체적인 프로젝트 주제를 입력해 주세요"
                type="essential"
                topic={true}
                value={formData.topic}
                onChange={(val) => setFormData({ ...formData, topic: val })}
              />

              <InputDropdown
                title="카테고리"
                placeholder="카테고리를 선택해주세요"
                items={["졸업작품", "사이드 프로젝트", "공모전", "기타"]}
                type="essential"
                value={formData.category}
                onSelect={(val) => setFormData({ ...formData, category: val })}
              />
              <div>
                <SelectBtnWrap
                  title="프로젝트 목적"
                  subtext="최대 2개까지 선택할 수 있어요"
                  items={[
                    "포트폴리오",
                    "수상",
                    "네트워킹",
                    "실무연습",
                    "졸업",
                    "자기개발",
                    "기타",
                  ]}
                  mode="multi"
                  essential={true}
                  value={formData.purpose}
                  onChange={(val) => setFormData({ ...formData, purpose: val })}
                />
              </div>

              <div>
                <SelectBtnWrap
                  title="프로젝트 현황"
                  items={["진행전", "진행중"]}
                  mode="single"
                  essential={false}
                  value={formData.status}
                  onChange={(val) => setFormData({ ...formData, status: val })}
                  popperPlacement="bottom-start"
                />
              </div>

              <div className="DateRealative">
                <DatePicker
                  title="프로젝트 기간"
                  selected={formData.projectDate?.[0] || null}
                  onChange={(dates) =>
                    setFormData({ ...formData, projectDate: dates })
                  }
                  startDate={formData.projectDate?.[0] || null}
                  endDate={formData.projectDate?.[1] || null}
                  selectsRange
                  placeholderText="기간 선택"
                  dateFormat="yyyy.MM.dd"
                  popperPlacement="bottom"
                  popperModifiers={[
                    {
                      name: "offset",
                      options: {
                        offset: [0, 10],
                      },
                    },
                  ]}
                />
              </div>

              <InputText
                title="프로젝트 소개"
                placeholder="프로젝트 상세 정보를 입력해 주세요."
                type="essential"
                topic={false}
                value={formData.description}
                onChange={(val) =>
                  setFormData({ ...formData, description: val })
                }
              />
            </StepOneWrap>
          ) : (
            <StepTwoWrap>
              <PositionCardList
                cards={formData.positions.map((pos) => ({
                  title: pos.position,
                  skills: pos.stack,
                }))}
                mode="single"
                purpose="show"
                onChange={(newList) => {
                  const updatedPositions = newList.map(({ title, skills }) => ({
                    position: title,
                    stack: skills,
                  }));
                  setFormData({ ...formData, positions: updatedPositions });
                }}
              />
              <ActionBtn
                type={positionCardLimit ? "disabled" : "outline"}
                btnName="+ 파티원 추가"
                onClick={() => {
                  if (!positionCardLimit) setBottomSheetOpen(true);
                }}
              />
            </StepTwoWrap>
          )}
        </InputWrap>

        <div className="writeActionBtn">
          <ActionBtn
            btnName={step === 1 ? "다음" : id ? "수정 완료" : "작성 완료"}
            onClick={handleNext}
            type={
              step === 1
                ? isStep1Valid
                  ? "default"
                  : "disabled"
                : isStep2Valid
                ? "default"
                : "disabled"
            }
          ></ActionBtn>
        </div>

        {bottomSheetOpen && (
          <ScrollLock>
            <BottomSheet
              onClose={() => setBottomSheetOpen(false)}
              onAdd={(newPosition) => {
                setFormData((prev) => ({
                  ...prev,
                  positions: [...prev.positions, newPosition],
                }));
                setBottomSheetOpen(false);
              }}
            ></BottomSheet>
          </ScrollLock>
        )}
      </div>
    </>
  );
}
