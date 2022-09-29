import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { StyleFeedWrap, StyleFilter, StyleNewSpan, StyleLikeSpan, Banner } from "./style";
import LikeList from "../LikeList/index";
import MainList from "../MainList/index";
import { useState } from "react";

import BannerImage from "../../../Static/Icons/eventBanner.jpeg";

const googleForms =
  "https://docs.google.com/forms/d/e/1FAIpQLSeWiKM8eSltDGdPzS3c0uQD91BbLAfJRzbUp1ODGnCQFRyHVA/viewform?usp=sf_link";

const UserfeedList = () => {
  const [filter, setFilter] = useState(false);
  const { state } = useLocation();

  return (
    <StyleFeedWrap>
      <Banner>
        <a target="_blank" href={googleForms}>
          <img src={BannerImage} alt="리뷰 이벤트" />
        </a>
      </Banner>
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
