import React, { useState, createRef, useId } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Button from "./Button";
import { ButtonGroup } from "./ButtonGroup";
import Box from "./Box";

export type Image = {
  blob: Blob,
  base64: string
}

interface IFileUpload {
  onSubmit: (data: Image) => void;
}

export const FileUpload: React.FC<IFileUpload> = ({ onSubmit }) => {
  const inputFileRef = React.useRef();
  const [image, setImage] = useState("");
  const [inputKey, setInputKey] = useState(1);
  const cropperRef = createRef<ReactCropperElement>();

  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const cleanUp = () => {
    cropperRef.current?.cropper.destroy();
    setInputKey(prevState => {
      return prevState + 1;
    });
    setImage("");
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      cropperRef.current?.cropper.getCroppedCanvas().toBlob((blob) => {
        onSubmit({
          blob: blob as Blob,
          base64: cropperRef.current?.cropper.getCroppedCanvas().toDataURL() as string,
        });
        cleanUp();
      });
    }
  };

  return (
    <Box mb={2}>
      {image &&
        <Cropper
          key={inputKey}
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={16 / 9}
          aspectRatio={16 / 9}
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
        />
      }
      <ButtonGroup mt={2}>
        <Button type="button" onClick={() => inputFileRef.current.click()}>
          Select image
        </Button>
        <input
          style={{display: "none"}}
          ref={inputFileRef}
          key={inputKey}
          type="file"
          onChange={onChange}
        />
        <Button type="button" ml="auto" onClick={cleanUp}>
          Cancel
        </Button>
        <Button type="button" onClick={getCropData}>
          Crop
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default FileUpload;
