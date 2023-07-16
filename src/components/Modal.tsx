import Card from "components/Card";
import { useOnClickOutside } from "hooks/onClickOutside";
import React, { MouseEventHandler, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { rgba } from "utils/rgba";

const modalRoot = document.getElementById("modal-root")!;

export interface IModal {
  isOpen: boolean;
  onCancelClick: () => void;
  children: React.ReactNode
}

const WrapperModal = styled.div`
  ${({ theme }) => `
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: grid;
    justify-content: center;
    align-items: center;
    background-color: ${rgba(theme.palette.neutral.black, 0.3)};
  `}
`;

const StyledCard = styled(Card)`
  max-height: 85vh;
  overflow-y: auto;
  width: 90vw;
  overscroll-behavior: contain;
`;

export const Modal: React.FC<IModal> = ({
  isOpen,
  onCancelClick,
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(wrapperRef, () => {
    onCancelClick();
  });

  return ReactDOM.createPortal(
    <>
      {isOpen ? (
        <WrapperModal>
          <div ref={wrapperRef}>
            <StyledCard>{children}</StyledCard>
          </div>
        </WrapperModal>
      ) : null}
    </>,
    modalRoot
  );
};
