import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { StyleFeedWrap, StyleFilter, StyleNewSpan, StyleLikeSpan } from "./style";
import LikeList from "../LikeList/index";
import MainList from "../MainList/index";
import { useState } from "react";

const UserfeedList = () => {
  const [filter, setFilter] = useState(false);
  const { state } = useLocation();

  return (
    <StyleFeedWrap>
      <StyleFilter>
        <p>게시글</p>
        <div>
          <StyleNewSpan
            Filter={filter}
            tabIndex={-1}
            onClick={() => {
              setFilter(false);
            }}
          >
            최신
          </StyleNewSpan>

          <StyleLikeSpan
            Filter={filter}
            tabIndex={-1}
            onClick={() => {
              setFilter(true);
            }}
          >
            인기
          </StyleLikeSpan>
        </div>
      </StyleFilter>

      {filter ? <LikeList></LikeList> : <MainList></MainList>}
    </StyleFeedWrap>
  );
};
export default UserfeedList;
