import React from "react";
import { Audio } from "react-loader-spinner";
import styled from "styled-components";

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;

  &::before {
    content: "";
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  }
`;

export default function Loader({ isLoaderShow }) {
  return (
    isLoaderShow && (
      <Overlay>
        <Audio heigth="100" width="100" color="#a749ff" ariaLabel="loading" />
      </Overlay>
    )
  );
}

