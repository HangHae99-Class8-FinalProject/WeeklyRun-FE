import React, { useEffect } from "react";
import RankHeader from "../Components/Rank/RankHeader";
import RankBody from "../Components/Rank/RankBody";
import { useQuery } from "react-query";
import { instance } from "../Utils/Instance";

const Rank = () => {
  const getRanking = async () => {
    const { data } = await instance.get("/api/user/rank");
    return data;
  };

  const getUserRank = async () => {
    const { data } = await instance.get("/api/user/myrank");
    return data;
  };

  const { data: rankingData } = useQuery("getRank", getRanking);
  const { data: userRank } = useQuery("getUserRank", getUserRank);

  return (
    <>
      <RankHeader />
      <RankBody rankData={rankingData} userRank={userRank} />
    </>
  );
};

export default Rank;
