import React from "react";
import styled from "styled-components";
import { IoPauseOutline } from "react-icons/io5";

export default function Login() {
  return (
    <MainWrapper>
      <Title>LOGIN</Title>
      <InputWrapper>
        <InputID type="text" placeholder="ID를 입력해주세요."></InputID>
        <InputPW type="password" placeholder="PW를 입력해주세요."></InputPW>
      </InputWrapper>
      <LoginBtn>로그인</LoginBtn>
      <Li>
        <li style={{ marginRight: "10px", borderRight: "2px solid #ccc" }}>
          <a style={{ paddingRight: "10px" }}> 회원가입 </a>
        </li>
        <li style={{ marginRight: "10px", borderRight: "2px solid #ccc" }}>
          <a style={{ paddingRight: "10px" }}> 비회원 주문조회 </a>
        </li>
        <li>
          <a style={{ paddingRight: "10px" }}> ID/PW 찾기 </a>
        </li>
      </Li>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  padding-top: 90px;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  height: 80vh;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  padding: 50px;
  font-weight: bold;
`;

const InputID = styled.input`
  width: 400px;
  height: 40px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
`;

const InputPW = styled.input`
  width: 400px;
  height: 40px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
`;

const LoginBtn = styled.button`
  width: 400px;
  height: 40px;
  padding: 10px;
  margin: 20px 0;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
`;

const Li = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 400px;
  padding: 20px;
`;
