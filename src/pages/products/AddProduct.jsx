import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  createProduct,
  updateProduct,
} from "../../app/features/product/productSlice";
import { Box, Typography, useTheme, Grid, Button } from "@mui/material";
import { colorToken } from "../../utils/theme";
import { resetState } from "../../app/features/upload/uploadSlice";
import ProductInput from "./ProductInput";
import ImageUpload from "../../components/ImageUpload";
import TextEditComponent from "../../components/TextEditComponent";

const AddProduct = () => {
  const theme = useTheme();
  const colors = colorToken(theme.palette.mode);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentProductId = location.pathname.split("/")[3];

  let schema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    author: yup.string().required("Author is Required"),
    price: yup.number(),
    category: yup.string(),
    description: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      author: "",
      price: "",
      category: "",
      images: "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      if (currentProductId !== undefined) {
        const productData = { id: currentProductId, data: values };
        dispatch(updateProduct(productData));
      } else {
        dispatch(createProduct(values));
      }

      setTimeout(() => {
        formik.resetForm();
        dispatch(resetState());
        navigate("/admin/products-list");
      }, 1000);
    },
  });

  const productBtnName = currentProductId !== undefined ? "Edit" : "Add";

  return (
    <Box>
      <Typography variant="h2" sx={{ margin: "25px 0", width: "100%" }}>
        {productBtnName} Product
      </Typography>
      <Box
        sx={{
          border: `2px solid ${colors.neutral[200]}`,
          padding: "30px 10px",
          borderRadius: "5px",
          maxWidth: "750px",
        }}
      >
        <form action="" onSubmit={formik.handleSubmit}>
          <Grid container columnSpacing={2} rowSpacing={2}>
            <ProductInput colors={colors} formik={formik} />

            <Grid item xs={12} sx={{ height: "200px" }}>
              <TextEditComponent
                formikValue={formik.values.description}
                formikHandler={formik.handleChange("description")}
              />
            </Grid>

            <Grid item xs={3}>
              <Button
                type="submit"
                size="large"
                color="success"
                variant="contained"
                fullWidth={true}
              >
                {productBtnName} Product
              </Button>
            </Grid>
          </Grid>
          <ImageUpload color={colors.neutral[200]} formik={formik} />
        </form>
      </Box>
    </Box>
  );
};

export default AddProduct;
