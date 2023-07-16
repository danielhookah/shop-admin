import React from "react";
import { Product } from "../types/product";
import Card from "./Card";
import { P } from "./Typography";
import styled from "styled-components";
import { eventEmitter } from "utils/eventEmitter";
import { deleteProduct, getProductsByUserId } from "../store/actions/productActions";
import { useAppDispatch } from "../hooks/redux";

const Wrapper = styled(Card)`
  cursor: pointer;
  height: 300px;
  position: relative;
  pointer-events: initial;
  
  ::after {
    content: 'x';
    position: absolute;
    right: -5px;
    top: -5px;
    height: 20px;
    width: 20px;
    color: black;
    border-radius: 50px;
    border: 1px solid black;
    background: white;
    line-height: 16px;
    text-align: center;
    cursor: pointer;
    pointer-events: initial;
  }
`;

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const handleOpenProductModal = () => eventEmitter.dispatch('onClickModalOpen', product)
  const handleDeleteProduct = () => dispatch(deleteProduct(`${product.id}`));

  return (
    <Wrapper onClick={handleDeleteProduct}>
      <div onClick={handleOpenProductModal}>
        <P variant="large" color="secondary">{product.name}</P>
      </div>
    </Wrapper>
  );
};

export default ProductCard;
