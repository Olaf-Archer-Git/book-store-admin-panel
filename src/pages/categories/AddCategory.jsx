import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  useTheme,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { colorToken } from "../../utils/theme";
import {
  getAllCategories,
  createCategory,
} from "../../app/features/categories/categorySlice";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = colorToken(theme.palette.mode);

  let schema = yup.object().shape({
    title: yup.string().required("Category Is Required"),
  });

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCategory(values));
      setTimeout(() => {
        formik.resetForm();
        navigate("/admin/category-list");
      }, 1000);
    },
  });

  return (
    <>
      <Typography variant="h2" sx={{ margin: "25px 0 50px" }}>
        Add Category
      </Typography>
      <Box
        sx={{
          border: `2px solid ${colors.secondary[100]}`,
          padding: "50px 10px",
          borderRadius: "5px",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <form action="" onSubmit={formik.handleSubmit}>
          <Grid container spacing={5}>
            <Grid item sm={12}>
              <TextField
                id="outlined-basic"
                label="Category"
                color="warning"
                fullWidth={true}
                name="title"
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                value={formik.values.title}
              />
              <div
                style={{ color: "red", textAlign: "center", marginTop: "10px" }}
              >
                {formik.touched.title && formik.errors.title}
              </div>
            </Grid>

            <Grid item sm={12}>
              <Button
                size="large"
                color="warning"
                variant="contained"
                fullWidth={true}
                type="submit"
              >
                Add Category
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default AddCategory;
