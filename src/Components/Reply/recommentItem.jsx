import React, { useCallback, useState, useRef } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";

import { ReactComponent as ReplyUpdate } from "../../Static/Icons/ReplyUpdate.svg";
import { ReactComponent as ReplyDelete } from "../../Static/Icons/ReplyDelete.svg";

import displayedAt from "../../Utils/displayAt";
import { delRecomment } from "../../Hooks/useRecomment";
import { ReactComponent as Profile } from "../../Static/Icons/myPageProfile.svg";
import { useRecoilState } from "recoil";
import { replyState } from "../../Recoil/Atoms/ReplyAtoms";
import Modal from "../Common/Modal/Modal";
import Lottie from "lottie-react";
import LeftArrow from "../../Static/Lottie/leftArrow.json";
import RightArrow from "../../Static/Lottie/RightArrow.json";

function RecommentItem({ data }) {
  const [inputState, setInputState] = useRecoilState(replyState);
  const [showModal, setShowModal] = useState(false);
  const [doneSlide, setDoneSlide] = useState(false);
  const queryClient = useQueryClient();

  //대댓글 삭제
  const delRecommentData = useMutation(() => delRecomment(data), {
    onSuccess: data => {
      queryClient.invalidateQueries("GET_RECOMMENT");
    },
    onError: error => {
      console.error(error);
    }
  });
  //대댓글 삭제 버튼
  const handleDelreply = () => {
    delRecommentData.mutate();
  };

  const onShowEditInput = useCallback(() => {
    setInputState(prev => ({
      ...prev,
      postId: data.commentId,
      recommentId: data.recommentId,
      showInput: "대댓글수정"
    }));
    slideRef.current.style.transform = "translateX(0%)";
  }, []);

  const userData = JSON.parse(window.localStorage.getItem("userData"));

  //슬라이드 만들기

  const slideRef = useRef();
  const [firstTouchX, setFirstTouchX] = useState("");

  const onTouchStart = e => {
    if (userData.nickname === data.nickname) {
      setFirstTouchX(e.changedTouches[0].pageX);
    }
  };

  const onTouchEnd = e => {
    if (userData.nickname !== data.nickname) return;
    let totalX = e.changedTouches[0].pageX - firstTouchX;
    if (200 > totalX || 400 > totalX > 300) {
      slideRef.current.style.transform = "translateX(-13.3rem)";
      setDoneSlide(true);
      return;
    }
    if ((totalX < 270 && totalX > 200) || totalX > 400) {
      slideRef.current.style.transform = "translateX(0%)";
      setDoneSlide(false);
    }
  };

  const onShowModal = useCallback(() => {
    slideRef.current.style.transform = "translateX(0%)";
    setShowModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <Body onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} ref={slideRef}>
        <RecommentBox>
          <div>{data.image ? <img src={data.image} /> : <Profile />}</div>
          <RecommentBody>
            <Nick>{data.nickname}</Nick>
            <div>{data.comment}</div>
            <RecommentFooter>
              <div>{displayedAt(data.createdAt)}</div>
            </RecommentFooter>
          </RecommentBody>
        </RecommentBox>
        {data.nickname === userData.nickname && (
          <>
            <LottieWrap>
              {!doneSlide ? <Lottie animationData={LeftArrow} /> : <Lottie animationData={RightArrow} />}
            </LottieWrap>
            <ButtonWrap>
              <button onClick={onShowEditInput}>
                <ReplyUpdate />
              </button>
              <button onClick={onShowModal}>
                <ReplyDelete />
              </button>
            </ButtonWrap>
          </>
        )}
      </Body>
      {showModal && (
        <Modal onClickYes={handleDelreply} onClickNo={onCloseModal}>
          <p>정말로 삭제하시겠습니까?</p>
        </Modal>
      )}
    </>
  );
}

export default RecommentItem;

const Body = styled.div`
  padding: 0rem 3.2rem;
  display: flex;
  transition: all 0.5s ease-in-out;
`;

const Nick = styled.div`
  font-family: "Anton";
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ButtonWrap = styled.div`
  width: 6rem;
  height: 7.2rem;
  display: flex;
  & button {
    border: none;
  }
`;

const RecommentBox = styled.div`
  font-size: 1rem;
  display: flex;
  padding: 1.5rem 1.6rem;
  gap: 0.8rem;
  min-width: 66vw;
  & img {
    width: 4rem;
    height: 4rem;
    border-radius: 10rem;
  }
`;

const RecommentBody = styled.div`
  width: 80%;
`;

const RecommentFooter = styled.div`
  color: #999999;
  margin-top: 1rem;
`;

const LottieWrap = styled.div`
  min-width: 6rem;
`;
