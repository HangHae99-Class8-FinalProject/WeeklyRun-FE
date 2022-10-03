import React from "react";
import styled from "styled-components";

const PrevRecord = ({ data, nickname }) => {
  return (
    <RecordWrap>
      <RecordHeader>&times;</RecordHeader>
      <RecordBody>
        <div>이번 주 목표 : 30km</div>
      </RecordBody>
    </RecordWrap>
  );
};

export default PrevRecord;

const RecordWrap = styled.div`
  padding-top: 2rem;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: red;
`;

const RecordHeader = styled.div`
  padding: 0 2rem;
  display: flex;
  font-size: 4rem;
  justify-content: flex-end;
`;

const RecordBody = styled.div`
  padding: 0 2rem;
`;

const RecordProgress = styled.div``;
