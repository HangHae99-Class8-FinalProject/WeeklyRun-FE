import React, { useState, useCallback } from "react";
import styled from "styled-components";
import displayedAt from "../../Utils/displayAt";
import ReplyInput from "./ReplyInput";
import { useParams } from "react-router-dom";
import { ReactComponent as Profile } from "../../Static/Icons/myPageProfile.svg";
import { useRecoilState } from "recoil";
import { replyState } from "../../Recoil/Atoms/ReplyAtoms";

function PostItem({ data }) {
  const [inputState, setInputState] = useRecoilState(replyState);

  const { id: postId } = useParams();

  const onShowInput = useCallback(e => {
    setInputState(prev => ({
      ...prev,
      showInput: "댓글작성",
      postId: postId
    }));
  });

  return (
    <>
      <PostBox>
        <div>{data.profile ? <img src={data.profile} /> : <Profile />}</div>
        <PostBody>
          <Nick>{data.nickname}</Nick>
          <div>{data.content}</div>
          <PostFooter>
            <div>{displayedAt(data.createdAt)}</div>
            <div>좋아요{data.like}개</div>
            <div onClick={onShowInput}>답글달기</div>
          </PostFooter>
        </PostBody>
      </PostBox>
      <ReplyInput />
    </>
  );
}
export default PostItem;

const PostBox = styled.div`
  display: flex;
  padding: 1.5rem 1.6rem;
  gap: 0.8rem;
  max-width: 100vw;
  border-bottom: 1px solid #e6e6e6;
  & img {
    width: 4rem;
    height: 4rem;
    border-radius: 10rem;
  }
`;
const PostBody = styled.div`
  font-size: 1rem;
  font-size: 1.2rem;
`;
const Nick = styled.div`
  font-family: "Anton";
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const PostFooter = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-top: 1rem;
  color: #999999;
`;
