import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { instance } from "../../../Utils/Instance";
import PostBox from "../../Common/PostBox";

const SearchedHashTag = ({ searhValue }) => {
  const [ref, inView] = useInView();
  const [tap, setTap] = useState("최신");
  const [search, setSearch] = useState("");

  const { state } = useLocation();

  useEffect(() => {
    if (state && state !== "search") {
      setSearch(state);
    } else {
      setSearch(searhValue);
    }
  }, [state, searhValue]);

  const getSearchHashTagOrder = async pageParam => {
    const res = await instance.get(`/api/post/search/popular/${pageParam}?hashtag=${search}`);

    const { Post, isLast } = res.data;
    return { Post, nextPage: pageParam + 1, isLast };
  };

  const getSearchHashTagNewest = async pageParam => {
    const res = await instance.get(`/api/post/search/new/${pageParam}?hashtag=${search}`);
    const { Post, isLast } = res.data;
    return { Post, nextPage: pageParam + 1, isLast };
  };

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["searchHashtag", search, tap],
    ({ pageParam = 1 }) => (tap === "인기" ? getSearchHashTagOrder(pageParam) : getSearchHashTagNewest(pageParam)),
    {
      enabled: !!search,
      getNextPageParam: lastPage => (!lastPage.isLast ? lastPage.nextPage : undefined)
    }
  );

  useEffect(() => {
    if (inView && search) fetchNextPage();
  }, [inView, search]);

  console.log(data);

  return (
    <Body>
      <ButtonWrap>
        <button
          onClick={() => {
            setTap("최신");
          }}
        >
          <span style={{ fontWeight: tap === "최신" ? "bold" : "normal" }}>최신</span>
        </button>
        <button
          onClick={() => {
            setTap("인기");
          }}
        >
          <span style={{ fontWeight: tap === "인기" ? "bold" : "normal" }}>인기</span>
        </button>
      </ButtonWrap>
      <div>
        {data?.pages.map((page, index) => (
          <div key={index}>
            {page?.Post.map((posts, index) => (
              <PostBox key={index} posts={posts} index={index} />
            ))}
          </div>
        ))}
      </div>
      {isFetchingNextPage ? <span></span> : <div ref={ref}></div>}
    </Body>
  );
};

export default SearchedHashTag;

const Body = styled.div`
  margin-bottom: 7rem;
  padding: 2.4rem 1.6rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  color: black;

  & button {
    border: none;
    background-color: white;
  }
`;
