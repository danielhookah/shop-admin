import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "./Modal";
import UserInput, { ErrorMessage } from "./UserInput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Product } from "types/product";
import { createSchema } from "validation/productSchemas";
import Button from "./Button";
import FileUpload, { Image } from "./FileUpload";
import { Gallery } from "./Gallery";
import Box from "./Box";
import styled from "styled-components";
import { Flex } from "./Flex";
import { createProduct, updateProduct } from "store/actions/productActions";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Radio } from "./Radio";
import { Attribute } from "types/attribute";
import { P } from "./Typography";

export interface IProductModal {
  selectedProduct?: Product;
  isOpen: boolean;
  onCancelClick: () => void;
}

const Form = styled.form`
  width: 100%;
`;

const RadioWrapper = styled(Flex)`
  flex-wrap: wrap;

  div[data-type="message-wrapper"]:last-child {
    flex: 1 1 100%;
    margin-top: 4px;
  }

  label {
    margin-right: 12px;
  }
`;
const CheckboxWrapper = styled(Flex)`
  flex-wrap: wrap;

  div[data-type="message-wrapper"]:last-child {
    flex: 1 1 100%;
    margin-top: 4px;
  }

  label {
    margin-right: 12px;
  }
`;

const defaultValues = {
  name: "",
  description: "",
  availableCount: "",
  price: "",
  categoryId: "",
  attributes: [],
  images: [],
};

export const ProductModal: React.FC<IProductModal> = ({
                                                        isOpen,
                                                        selectedProduct,
                                                        onCancelClick,
                                                      }) => {
  const dispatch = useAppDispatch();
  const attributes = useAppSelector((state) => state.attribute.attributes);
  const categories = useAppSelector((state) => state.category.categories);
  const [filteredAttributes, setFilteredAttributes] = useState<{ [key: string]: Attribute[] }>({});
  const [images, setImages] = useState<(Image & { key: string })[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Product>({
    mode: "onSubmit",
    defaultValues: defaultValues,
    resolver: yupResolver(createSchema),
  });

  const watcher = watch();

  const onImageUpload = (data: Image) => {
    const { blob, base64 } = data;
    setImages(prevState => {
      return [...prevState, { blob, base64, key: new Date().getTime().toString() }];
    });
  };

  const onImageRemove = (key: string, isUrl?: boolean) => {
    if (isUrl) {
      setImageUrls(prevState => {
        return prevState.filter(el => el !== key)
      })
      trigger("images");
      return
    }
    setImages(prevState => {
      return prevState.filter(el => el.key !== key);
    });
    trigger("images");
  };

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    data?.images?.forEach(el => {
      formData.append("image[]", el);
    });
    data.attributes.forEach(el => {
      formData.append("attribute[]", el);
    });
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("availableCount", data.availableCount);
    formData.append("price", data.price);
    formData.append("categoryId", data.categoryId);
    selectedProduct && formData.append("id", `${selectedProduct.id}`)
    imageUrls.length > 0 && imageUrls.forEach(el => {
      formData.append("imageUrls[]", el);
    })

    dispatch(selectedProduct ? updateProduct(formData) : createProduct(formData))
      .unwrap()
      .then(() => {
        toast.success("Product successfully added")
        reset(defaultValues);
        setImages([])
        onCancelClick()
      })
      .catch(err => toast.error(err));
  });

  const categoryInputs = useMemo(() => {
    if (!categories) return []
    return categories.map(el =>
      <Controller
        key={el.id}
        control={control}
        name="categoryId"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Radio
            ref={ref}
            label={el.name}
            checked={value === el.id}
            onChange={() => {
              setValue("attributes", []);
              onChange(el.id);
            }}
            value={value}
            name="category"
          />
        )}
      />,
    )
  }, [categories, selectedProduct])

  const attributeInputs = useMemo(() => {
    return Object.entries(filteredAttributes).map(([key, attrs]) => (
      <Flex key={key} flexDirection="column">
        <P variant="medium" mb={1} color="app">{key}</P>
        <Flex mr={3}>
          {attrs.map(el => (
            <Controller
              key={el.id}
              control={control}
              name="attributes"
              render={({ field: { onChange, value, ref } }) => (
                <Radio
                  ref={ref}
                  label={el.value}
                  onChange={() => {
                    onChange([
                      ...getValues("attributes").filter(val => !attrs.find(attr => attr.id === val)),
                      el.id,
                    ]);
                    trigger("attributes");
                  }}
                  checked={value?.includes(el.id)}
                  value={el.id}
                  name={key}
                />
              )}
            />
          ))}
        </Flex>
      </Flex>
    ))
  }, [filteredAttributes, selectedProduct, watcher['categoryId']])

  useEffect(() => {
    if (selectedProduct) { // @ts-ignore
      reset({...selectedProduct, attributes: selectedProduct?.attributes?.map(el => el?.id || el)})
      setImageUrls(selectedProduct?.imageUrls || [])
    } else {
      setImageUrls([])
      setImages([])
    }
  }, [selectedProduct])

  useEffect(() => {
    setValue("images", images.map(el => el.blob));
    if (images.length > 0) trigger("images");
  }, [images]);

  useEffect(() => {
    const filteredAttributes = attributes.reduce<{ [key: string]: Attribute[] }>((acc, curr) => {
      if (curr.categoryId !== watcher["categoryId"]) return acc;
      if (!acc[curr.name]) acc[curr.name] = [];
      acc[curr.name].push(curr);
      return acc;
    }, {});
    setFilteredAttributes(filteredAttributes);
    if (watcher["categoryId"]?.length < 1) return;
    trigger("attributes");
  }, [watcher["categoryId"]]);

  return (
    <Modal isOpen={isOpen} onCancelClick={() => {
      reset(defaultValues);
      onCancelClick();
    }}>
      <Form onSubmit={onSubmit}>
        <Flex display="flex" justifyContent="space-between">
          <Flex display="flex" flexDirection="column" width="48%">
            <UserInput
              mb={3}
              label="Name"
              type="text"
              error={errors.name?.message}
              {...register("name")}
            />
            <UserInput
              mb={3}
              label="Description"
              type="text"
              error={errors.description?.message}
              {...register("description")}
            />
          </Flex>
          <Flex display="flex" flexDirection="column" width="48%">
            <UserInput
              mb={3}
              label="Price"
              type="text"
              error={errors.price?.message}
              {...register("price")}
            />
            <UserInput
              mb={3}
              label="Available count"
              type="text"
              error={errors.availableCount?.message}
              {...register("availableCount")}
            />
          </Flex>
        </Flex>
        <P mt={2} mb={1} variant="medium">Category</P>
        <RadioWrapper>
          {categoryInputs}
          {errors.categoryId?.message && (
            <div data-type="message-wrapper">
              <ErrorMessage>{errors.categoryId?.message}</ErrorMessage>
            </div>
          )}
        </RadioWrapper>
        <P mt={2} mb={1} variant="medium">Attributes</P>
        <CheckboxWrapper mb={3}>
          {attributeInputs}
          {errors.attributes?.message && (
            <div data-type="message-wrapper">
              <ErrorMessage>{errors.attributes?.message}</ErrorMessage>
            </div>
          )}
        </CheckboxWrapper>
        <Box>
          <FileUpload onSubmit={onImageUpload} />
          {errors.images?.message && <ErrorMessage>{errors.images?.message}</ErrorMessage>}
          <Gallery images={images} imageUrls={imageUrls} onRemoveImage={onImageRemove} />
          <Button type="submit" ml="auto" mt={2}>{selectedProduct ? "Edit" : "Create"}</Button>
        </Box>
      </Form>
    </Modal>
  );
};
