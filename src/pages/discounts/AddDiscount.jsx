import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { createDiscount } from "../../app/features/discounts/discountSlice";
import { Box, Typography, Grid, Button, TextField } from "@mui/material";

const AddDiscount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let schema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    expiry: yup.date().required("Expiry Date is Required"),
    discount: yup.number().required("Discount Percentage is Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createDiscount(values));

      setTimeout(() => {
        formik.resetForm();
        navigate("/admin/discount-list");
      }, 1000);
    },
  });
  return (
    <Box>
      <Typography variant="h2" sx={{ margin: "25px 0", width: "100%" }}>
        Add Discount
      </Typography>

      <Box
        sx={{
          border: `2px solid red`,
          padding: "30px 10px",
          borderRadius: "5px",
          maxWidth: "750px",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Title"
                color="error"
                fullWidth={true}
                name="name"
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                value={formik.values.name}
              />
              <div style={{ color: "red", margin: "10px 0" }}>
                {formik.touched.name && formik.errors.name}
              </div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Expiry (mm.dd.yy)"
                type="data"
                color="error"
                fullWidth={true}
                name="expiry"
                onChange={formik.handleChange("expiry")}
                onBlur={formik.handleBlur("expiry")}
                value={formik.values.expiry}
              />
              <div style={{ color: "red", margin: "10px 0" }}>
                {formik.touched.expiry && formik.errors.expiry}
              </div>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Discount"
                type="number"
                color="error"
                fullWidth={true}
                name="discount"
                onChange={formik.handleChange("discount")}
                onBlur={formik.handleBlur("discount")}
                value={formik.values.discount}
              />
              <div style={{ color: "red", margin: "10px 0" }}>
                {formik.touched.discount && formik.errors.discount}
              </div>
            </Grid>

            <Grid item xs={3} sx={{ margin: "0 auto" }}>
              <Button
                type="submit"
                size="large"
                color="error"
                variant="contained"
                fullWidth={true}
              >
                Add Discount
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default AddDiscount;
