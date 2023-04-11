import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditComponent = ({ formikValue, formikHandler }) => {
  return (
    <ReactQuill
      theme="snow"
      value={formikValue}
      name="description"
      onChange={formikHandler}
      style={{ height: "130px" }}
    />
  );
};

export default TextEditComponent;
