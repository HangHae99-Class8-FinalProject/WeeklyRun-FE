import styled from "styled-components";
export const StyleFeedWrap = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0rem 1.6rem 2rem 1.6rem;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 5rem;
`;
export const StyleFilter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  height: 2.3rem;
  & > p {
    font-weight: 400;
  }
  & > div {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0;
    gap: 1rem;
    & > span {
      font-size: 1.2rem;
    }
  }
`;
export const StyleNewSpan = styled.span`
  color: ${({ Filter }) => (Filter ? "#999999" : "#000000")};
`;
export const StyleLikeSpan = styled.span`
  color: ${({ Filter }) => (Filter ? "#000000" : "#999999")};
`;
