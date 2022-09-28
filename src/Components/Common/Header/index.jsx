import React from "react";
import styled from "styled-components";

import { ReactComponent as MainLogo } from "../../../Static/Icons/MainLogo.svg";

const Header = () => {
  return (
    <StyleHeader>
      <MainLogo />
    </StyleHeader>
  );
};
export default Header;

const StyleHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
