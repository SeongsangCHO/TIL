import React from "react";
import Header from "./Header";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const RegisterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const NickInput = styled.input`
  width: 100% type= "text";
`;
function Register() {
  return (
    <RegisterWrapper>
      <form>
        <div>
          <label>닉네임</label>
        </div>
        <NickInput></NickInput>
      </form>
    </RegisterWrapper>
  );
}

export default Register;
