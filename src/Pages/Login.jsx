import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { ReactComponent as KakaoLoginIcon } from "../Icons/KakaoLoginIcon.svg";
import { ReactComponent as NaverLoginIcon } from "../Icons/NaverLoginIcon.svg";
import { ReactComponent as Logo } from "../Icons/LoginLogo.svg";
import Modal from "../Components/Common/Modal/Modal";

const KAKAO_LOGIN = "https://yunseong.shop/api/kakao/callback";
const NAVER_LOGIN = "http://yunseong.shop/api/naver/callback";

const Login = () => {
  const [visible, setVisible] = useState(true);

  const deferredPrompt = useRef(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      deferredPrompt.current = e;
    });

    if (!deferredPrompt.current) {
      setVisible(false);
    }
    setVisible(true);
  }, []);

  const installApp = () => {
    if (!deferredPrompt.current) return false;

    //홈 화면에 추가시키기
    deferredPrompt.current.prompt();

    deferredPrompt.current.userChoice.then(choice => {
      if (choice.outcome === "accepted") {
        setVisible(false);
      }
    });
  };

  const onClickNo = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <Modal onClickYes={installApp} onClickNo={onClickNo}>
          <p>
            원활한 동작을 위하여 앱을 설치해주세요 <br />
            설치하시겠습니까?
          </p>
        </Modal>
      )}
      <LoginLogo>
        <Logo />
      </LoginLogo>
      <LoginLink>
        <a href={KAKAO_LOGIN}>
          <KakaoLoginIcon />
        </a>
        <a href={NAVER_LOGIN}>
          <NaverLoginIcon />
        </a>
      </LoginLink>
    </>
  );
};

export default Login;

const LoginLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 10rem;
  padding: 1.2rem 0rem 0rem;
  height: 24.5rem;
  width: 100%;
  overflow: hidden;
`;

const LoginLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem;
  gap: 1rem;
  margin: 0 auto;
  width: 100%;
  position: absolute;
  bottom: 8.1rem;
`;
