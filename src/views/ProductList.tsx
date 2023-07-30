import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "hooks/redux";
import { ProductModal } from "components/ProductModal";
import { eventEmitter } from "utils/eventEmitter";
import { getCategories } from "store/actions/categoryActions";
import { getAttributes } from "store/actions/attributeActions";
import { getProductsByUserId } from "store/actions/productActions";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/product";

const Wrapper = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  gap: 20px;
  grid-auto-rows: max-content;
  color: ${({ theme }) => theme.palette.neutral.white};
`;
const ProductList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const dispatch = useAppDispatch();
  const products = useSelector(
    (state: RootState) => state.product.products,
  );
  const user = useSelector(
    (state: RootState) => state.auth.user,
  );

  eventEmitter.subscribe("onClickModalOpen", (data?: Product) => {
    setSelectedProduct(data);
    setIsModalOpen(true);
  });

  useEffect(() => {
    dispatch(getCategories({}));
    dispatch(getAttributes({}));
    user && dispatch(getProductsByUserId(user.id));
  }, [user]);

  return (
    <Wrapper>
      {products.map(el => <ProductCard key={el.id} product={el} />)}
      <ProductModal
        isOpen={isModalOpen}
        selectedProduct={selectedProduct}
        onCancelClick={() => {
          setIsModalOpen(false);
          setSelectedProduct(undefined);
        }} />
    </Wrapper>
  );
};

export default ProductList;
