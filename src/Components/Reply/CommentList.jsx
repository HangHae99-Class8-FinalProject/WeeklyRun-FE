import React, { useCallback, useState, useRef, useLayoutEffect, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";

import { ReactComponent as ReplyUpdate } from "../../Static/Icons/ReplyUpdate.svg";
import { ReactComponent as ReplyDelete } from "../../Static/Icons/ReplyDelete.svg";

import Recomment from "./Recomment";
import displayedAt from "../../Utils/displayAt";
import { delReply } from "../../Hooks/useReply";
import { ReactComponent as Profile } from "../../Static/Icons/myPageProfile.svg";
import { useRecoilState } from "recoil";
import { replyState } from "../../Recoil/Atoms/ReplyAtoms";
import Modal from "../Common/Modal/Modal";
import Lottie from "lottie-react";
import LeftArrow from "../../Static/Lottie/leftArrow.json";
import RightArrow from "../../Static/Lottie/RightArrow.json";

const CommentList = ({ reply }) => {
  const [showReply, setShowReply] = useState(false);
  const [inputState, setInpuState] = useRecoilState(replyState);
  const [showModal, setShowModal] = useState(false);
  const [doneSlide, setDoneSlide] = useState(false);

  const userData = JSON.parse(window.localStorage.getItem("userData"));

  const replyRef = useRef(null);

  useLayoutEffect(() => {
    if (replyRef.current !== null) replyRef.current.focus();
  });

  const queryClient = useQueryClient();

  const onShowInputRecomment = useCallback(() => {
    setInpuState(prev => ({
      ...prev,
      showInput: "대댓글작성",
      postId: reply.commentId
    }));
  }, []);

  const onShowInputEdit = useCallback(() => {
    setInpuState(prev => ({
      ...prev,
      showInput: "댓글수정",
      postId: reply.commentId
    }));
    slideRef.current.style.transform = "translateX(0%)";
  });

  const onShowRecomment = useCallback(() => {
    setShowReply(prev => !prev);
  }, []);

  //댓글 삭제
  const delReplyData = useMutation(() => delReply(reply.commentId), {
    onSuccess: data => {
      queryClient.invalidateQueries("GET_REPLY");
      slideRef.current.style.transform = "translateX(0%)";
    },
    onError: error => {}
  });

  const handleDelreply = () => {
    delReplyData.mutate();
    setShowModal(false);
  };

  //슬라이드 만들기

  const slideRef = useRef();
  const [firstTouchX, setFirstTouchX] = useState("");

  const onTouchStart = e => {
    if (userData.nickname === reply.nickname) {
      setFirstTouchX(e.changedTouches[0].pageX);
    }
  };

  const onTouchEnd = e => {
    if (userData.nickname !== reply.nickname) return;
    let totalX = firstTouchX - e.changedTouches[0].pageX;

    if (totalX > 80) {
      slideRef.current.style.transform = "translateX(-14rem)";
      setDoneSlide(true);
      return;
    }
    if (totalX < -10) {
      slideRef.current.style.transform = "translateX(0%)";
      setDoneSlide(false);
      return;
    }
  };
  const onShowModal = useCallback(() => {
    slideRef.current.style.transform = "translateX(0%)";
    setDoneSlide(false);
    setShowModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setDoneSlide(false);
    setShowModal(false);
  }, []);

  return (
    <>
      <Body onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} ref={slideRef}>
        <CommentWrap>
          <div>{reply.image ? <img src={reply.image} /> : <Profile />}</div>
          <CommentBody>
            <Nick>{reply.nickname}</Nick>
            <div>{reply.comment}</div>
            <CommentFooter>
              <div>{displayedAt(reply.createdAt)}</div>
              <div onClick={onShowInputRecomment}>답글달기</div>
              {!showReply && (
                <div onClick={onShowRecomment}>
                  {reply.recommentNum > 0 ? <>답글 {reply.recommentNum}개 더보기</> : null}
                </div>
              )}
              {showReply && <div onClick={onShowRecomment}>답글 닫기</div>}
            </CommentFooter>
          </CommentBody>
        </CommentWrap>

        {reply.nickname === userData.nickname && (
          <>
            <LottieWrap>
              {!doneSlide ? <Lottie animationData={LeftArrow} /> : <Lottie animationData={RightArrow} />}
            </LottieWrap>
            <ButtonWrap>
              <button onClick={onShowInputEdit}>
                <ReplyUpdate />
              </button>
              <button onClick={onShowModal}>
                <ReplyDelete />
              </button>
            </ButtonWrap>
          </>
        )}
      </Body>
      {showReply && <Recomment id={reply.commentId} />}
      {showModal && (
        <Modal onClickYes={handleDelreply} onClickNo={onCloseModal}>
          <p>정말로 삭제하시겠습니까?</p>
        </Modal>
      )}
    </>
  );
};

export default CommentList;

const Body = styled.div`
  display: flex;
  transition: all 0.5s ease-in-out;
  padding: 1.5rem 1.6rem;
`;

const ButtonWrap = styled.div`
  width: 6rem;
  height: 7.2rem;
  display: flex;
  & button {
    border: none;
  }
`;

const CommentWrap = styled.div`
  font-size: 1rem;
  display: flex;
  gap: 0.8rem;
  min-width: 80vw;
  & img {
    width: 4rem;
    height: 4rem;
    border-radius: 10rem;
  }
`;

const CommentFooter = styled.div`
  display: flex;
  color: #999999;
  margin-top: 1rem;
  gap: 1.6rem;
`;

const CommentBody = styled.div`
  width: 80%;
`;

const Nick = styled.div`
  font-family: "Anton";
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const LottieWrap = styled.div`
  min-width: 6rem;
`;
