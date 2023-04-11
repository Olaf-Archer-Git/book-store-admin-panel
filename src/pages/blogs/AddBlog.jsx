import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { createBlog, updateBlog } from "../../app/features/blog/blogSlice";
import {
  Box,
  Typography,
  useTheme,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { colorToken } from "../../utils/theme";
import { resetState } from "../../app/features/upload/uploadSlice";
import TextEditComponent from "../../components/TextEditComponent";
import ImageUpload from "../../components/ImageUpload";

const AddBlog = () => {
  const theme = useTheme();
  const colors = colorToken(theme.palette.mode);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentBlogId = location.pathname.split("/")[3];

  let schema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    description: yup.string().required("Description is Required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      images: "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      if (currentBlogId !== undefined) {
        const blogData = { id: currentBlogId, data: values };
        dispatch(updateBlog(blogData));
      } else {
        dispatch(createBlog(values));
      }

      setTimeout(() => {
        formik.resetForm();
        dispatch(resetState());
        navigate("/admin/blog-list");
      }, 1000);
    },
  });

  const blogBtnName = currentBlogId !== undefined ? "Edit" : "Add";

  return (
    <Box>
      <Typography variant="h2" sx={{ margin: "25px 0", width: "100%" }}>
        {blogBtnName} Blog
      </Typography>

      <Box
        sx={{
          border: `2px solid ${colors.green[100]}`,
          padding: "30px 10px",
          borderRadius: "5px",
          maxWidth: "750px",
        }}
      >
        <form action="" onSubmit={formik.handleSubmit}>
          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Book's Title"
                color="warning"
                fullWidth={true}
                name="title"
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                value={formik.values.title}
              />
              <div style={{ color: "red", margin: "10px 0" }}>
                {formik.touched.title && formik.errors.title}
              </div>
            </Grid>

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
                color="warning"
                variant="contained"
                fullWidth={true}
              >
                {blogBtnName} Blog
              </Button>
            </Grid>
          </Grid>
          <ImageUpload color={colors.green[100]} formik={formik} />
        </form>
      </Box>
    </Box>
  );
};

export default AddBlog;
