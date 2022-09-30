import styled from "styled-components";
export const StyleModalBox = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 25rem;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
`;
export const StyleModal = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 1rem;
  justify-content: center;
  align-items: center;
  width: 32.4rem;
  height: 20.4rem;
  & button {
    border: none;
    background-color: white;
    font-size: 1.6rem;
  }
  & div {
    gap: 10rem;
    margin-top: 3rem;
    display: flex;
  }
  & button:last-child {
    font-weight: bold;
  }
`;

export const StyleInput = styled.input`
  width: 80%;
  height: 3.7rem;
  border: none;
  background: rgba(153, 153, 153, 0.5);
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
  font-size: 1.6rem;

  &::placeholder {
    font-weight: bold;
  }
`;
