import React from "react";
import styled from "styled-components";
import { rgba } from "utils/rgba";
import { Image } from "./FileUpload";

export interface IGallery {
  images: (Image & {key: string})[]
  imageUrls: string[]
  onRemoveImage: (key: string, isUrl?: boolean) => void
}

const Wrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    align-items: center;
    overflow-x: auto;
    padding: 20px;
  `}
`;

const ImageWrapper = styled.div`
  margin: 0 10px;
  position: relative;
  pointer-events: none;
  
  &> img {
    max-height: 200px;
    pointer-events: none;
  } 

  &:after {
    content: "✖";
    cursor: pointer;
    position: absolute;
    background: white;
    border-radius: 50px;
    border: 1.5px solid black;
    top: -12px;
    right: -12px;
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: all;
  }
`

export const Gallery: React.FC<IGallery> = ({images, imageUrls, onRemoveImage}) => {
  return (
    <Wrapper>
      {images.map(el => {
        return <ImageWrapper onClick={() => onRemoveImage(el.key)} key={el.key}>
          <img src={el.base64} alt="" />
        </ImageWrapper>
      })}
      {imageUrls.map((el) => {
        return <ImageWrapper onClick={() => onRemoveImage(el, true)} key={el}>
          <img src={el} alt="" />
        </ImageWrapper>
      })}
    </Wrapper>
  )
};
