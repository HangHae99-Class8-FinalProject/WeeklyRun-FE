import React, { useRef, useLayoutEffect, useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import useInput from "../../../Hooks/useInput";
import { postData } from "../../../Recoil/Atoms/PostData";
import { isAndroid } from "react-device-detect";

const AddContent = ({ merge, prevContent }) => {
  const [content, onChangeContent] = useInput(prevContent || "");

  const [post, setPost] = useRecoilState(postData);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    if (textRef.current !== null) textRef.current.focus();
  });

  useLayoutEffect(() => {
    const detecMobileKeyboard = () => {
      if (isAndroid) {
        textRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      }
    };
    window.addEventListener("resize", detecMobileKeyboard);

    return () => window.removeEventListener("resize", detecMobileKeyboard);
  });

  useEffect(() => {
    if (merge) {
      setPost(prev => ({
        ...prev,
        content
      }));
    }
  }, [merge]);

  return (
    <ContentBox>
      <Write value={content} ref={textRef} onChange={onChangeContent}></Write>
    </ContentBox>
  );
};

export default AddContent;

const ContentBox = styled.div`
  width: 98%;
  height: 22rem;
`;

const Write = styled.textarea`
  background: #e6e6e6;
  border-radius: 0.4rem;
  padding: 1rem 0 1rem 1rem;
  gap: 1rem;
  width: 100%;
  height: 18rem;
  &:focus {
    outline: none;
  }
`;
