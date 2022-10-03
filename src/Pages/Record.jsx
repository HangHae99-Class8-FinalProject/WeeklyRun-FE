import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";

import RunTimer from "../Components/RecordPage/RunTimer";
import RunningMap from "../Components/RecordPage/RunningMap/index";
import { instance } from "../Utils/Instance";
import { runData } from "../Recoil/Atoms/RunData";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/Common/Modal/Modal";

import { ReactComponent as StopIcon } from "../Static/Icons/StopIcon.svg";
import { ReactComponent as EndIcon } from "../Static/Icons/EndIcon.svg";
import { ReactComponent as StartIcon } from "../Static/Icons/StartIcon.svg";

const Record = () => {
  const [stopInterval, setStopInterval] = useState(true);
  const [endRun, setEndRun] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [start, setStart] = useState(false);
  const [noRecord, setNoRecord] = useState(false);
  const [goal, setGoal] = useState("");
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showScreenModal, setShowScreenModal] = useState(true);
  const [path, setPath] = useRecoilState(runData);
  const runLog = useRecoilValue(runData);

  const userNickname = JSON.parse(localStorage.getItem("userData")).nickname;

  const navigate = useNavigate();

  const clearPath = () => {
    setPath({
      path: [],
      distance: 0,
      time: "",
      speed: "",
      isFinish: false
    });
  };

  let hour = runLog.time.hour * 60 * 60;
  let minute = runLog.time.minute * 60;
  let second = runLog.time.second;

  let totalTime = hour + minute + second;

  const stopRun = useCallback(() => {
    setStopInterval(prev => !prev);
  }, []);

  const onStart = useCallback(async () => {
    const { data } = await instance.get("/api/user/startbtn");
    setShowModal(false);
    setStopInterval(false);
    setStart(true);
  }, []);

  const onClickEnd = useCallback(async () => {
    setStopInterval(true);

    if (Number(runLog.distance) <= 0) {
      setNoRecord(true);
    }
    setEndRun(true);
  });

  useEffect(() => {
    if (!runLog.time) return;
    async function getPace() {
      const { data } = await instance.post("/api/user/endrunning", {
        distance: runLog.distance,
        time: totalTime
      });
      if (data?.sec) {
        setPath(prev => ({
          ...prev,
          pace: data
        }));
        setShowWarningModal(false);
      } else {
        setShowWarningModal(true);
      }
    }
    getPace();
  }, [runLog.time]);

  const onFeed = async () => {
    if (runLog.isFinish) {
      if (goal) {
        const { data } = await instance.post("/api/user/distance", {
          distance: runLog.distance,
          time: totalTime
        });
      }
      clearPath();
      navigate("/post", { state: { runLog } });
    }
  };

  const onNotFeed = async () => {
    if (runLog.isFinish) {
      if (goal) {
        const { data } = await instance.post("/api/user/distance", {
          distance: runLog.distance,
          time: totalTime
        });
      }
      clearPath();
      navigate("/feed");
    }
  };

  const onClickContinue = () => {
    setEndRun(false);
    setNoRecord(false);
  };

  const onClickNoContinue = () => {
    clearPath();
    navigate("/feed");
  };

  const onClickGoalYes = useCallback(() => {
    navigate(`/user/${userNickname}`);
  }, []);

  const onClickGoalNo = useCallback(() => {
    setShowGoalModal(false);
  }, []);

  const onClickWarningYes = useCallback(() => {
    setShowWarningModal(false);
    navigate("/feed");
  }, []);

  const onCloseScreen = useCallback(() => {
    setShowScreenModal(false);
  }, []);

  useEffect(() => {
    async function getSetGoal() {
      const res = await instance.get("/api/user/goal");
      setGoal(res.data.goal);
      if (!res.data.goal) {
        setShowGoalModal(true);
      } else {
        setGoal(true);
      }
    }
    getSetGoal();
  }, []);

  return (
    <>
      <RunningMap stopInterval={stopInterval} endRun={endRun}></RunningMap>
      {start && (
        <RecordHeader>
          <HeaderWrap>
            <RunDistance>{(runLog.distance / 1000)?.toFixed(1)}km</RunDistance>
            <RunTimer stopInterval={stopInterval} endRun={endRun} />
          </HeaderWrap>
        </RecordHeader>
      )}
      {start && (
        <ButtonWrap>
          <div onClick={stopRun}>{!stopInterval ? <StopIcon /> : <StartIcon />}</div>
          <div onClick={onClickEnd}>
            <EndIcon />
          </div>
        </ButtonWrap>
      )}
      {showModal && (
        <Modal noneStyle={true}>
          <StartButton onClick={onStart}>
            <p>START!</p>
          </StartButton>
        </Modal>
      )}
      {endRun && (
        <Modal onClickNo={onNotFeed} onClickYes={onFeed}>
          <p>기록을 피드에 공유 하시겠습니까?</p>
        </Modal>
      )}
      {noRecord && (
        <Modal onClickYes={onClickContinue} onClickNo={onClickNoContinue}>
          <p>
            100m이하의 기록은 기록하실 수 없어요
            <br />
            이어하시겠어요?
          </p>
        </Modal>
      )}
      {showGoalModal && (
        <Modal onClickYes={onClickGoalYes} onClickNo={onClickGoalNo}>
          <p>
            목표 설정을 하지 않으면 기록 저장이 안돼요! <br />
            지금 목표를 설정하시겠어요?
          </p>
        </Modal>
      )}
      {showWarningModal && (
        <Modal onClickYes={onClickWarningYes}>
          <p>
            비 정상적인 속도로 감지되어
            <br />
            기록이 불가능합니다.
          </p>
        </Modal>
      )}
      {showScreenModal && (
        <Modal onClickYes={onCloseScreen}>
          <p>
            보다 정확한 측정을 위해
            <br /> 가급적 화면이 켜진 상태로 이용해주세요
          </p>
        </Modal>
      )}
    </>
  );
};

export default Record;

const StartButton = styled.div`
  background: #333333;
  border-radius: 1.2rem;
  height: 7.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 5rem;
  p {
    font-family: "Anton";
    font-size: 4.6rem;
    line-height: 5.5rem;
    text-align: center;
    letter-spacing: 0.02em;
    color: #ffffff;
  }
`;

const HeaderWrap = styled.div`
  width: 82%;
  display: flex;
  justify-content: space-between;
`;

const RecordHeader = styled.div`
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 6.2rem 3.2rem 4.2rem;
  position: fixed;
  width: 100%;
  top: 0;
  background: #333333;
  @media only screen and (min-width: 880px) {
    right: 10;
    max-width: 33.6rem;
  }
`;

const RunDistance = styled.div`
  font-family: "Anton";
  font-size: 4.8rem;
  line-height: 5.8rem;
  width: 9.6rem;
  height: 5.8rem;
  color: white;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12rem;
  width: 100%;
  height: 5.2rem;
  z-index: 10;
  position: absolute;
  top: 38rem;
`;
