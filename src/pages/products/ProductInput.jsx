import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, TextField } from "@mui/material";
import { getAllCategories } from "../../app/features/categories/categorySlice";

const ProductInput = ({ colors, formik }) => {
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.category.categories);

  const options = [];
  for (let i = 0; i < categoryState.length; i++) {
    options.push({
      key: categoryState[i]._id,
      value: categoryState[i].title,
      label: categoryState[i].title,
    });
  }
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <>
      <Grid item xs={6}>
        <TextField
          id="outlined-basic"
          label="Book's Title"
          color="info"
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

      <Grid item xs={6}>
        <TextField
          id="outlined-basic"
          label="Book's Author"
          color="info"
          fullWidth={true}
          name="author"
          onChange={formik.handleChange("author")}
          onBlur={formik.handleBlur("author")}
          value={formik.values.author}
        />
        <div style={{ color: "red", margin: "10px 0" }}>
          {formik.touched.author && formik.errors.author}
        </div>
      </Grid>

      <Grid item xs={3}>
        <TextField
          id="outlined-basic"
          label="Price"
          color="info"
          type="number"
          fullWidth={true}
          name="price"
          onChange={formik.handleChange("price")}
          onBlur={formik.handleBlur("price")}
          value={formik.values.price}
        />
      </Grid>

      <Grid item xs={3}>
        <select
          className="query-select"
          value={formik.values.category}
          onChange={formik.handleChange("category")}
          onBlur={formik.handleBlur("category")}
          name="category"
          style={{
            padding: "15px",
            width: "100%",
            background: colors.secondary[100],
            color: "white",
            textTransform: "capitalize",
          }}
        >
          {options.map((option) => (
            <option value={option.value} key={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </Grid>
    </>
  );
};

export default ProductInput;
