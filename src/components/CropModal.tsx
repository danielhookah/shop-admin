import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "./Modal";
import UserInput from "./UserInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Product } from "../types/product";
import { createSchema } from "../validation/productSchemas";
import Button from "./Button";
import FileUpload from "./FileUpload";

export interface ICropModal {
  isOpen: boolean;
  onCancelClick: () => void;
  children: React.ReactNode;
}

export const CropModal: React.FC<ICropModal> = ({
                                                  isOpen,
                                                  onCancelClick,
                                                  children,
                                                }) => {

  return (
    <Modal isOpen={isOpen} onCancelClick={onCancelClick}>
      {children}
    </Modal>
  );
};
