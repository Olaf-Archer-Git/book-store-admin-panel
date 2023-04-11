import React, { useEffect } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { GrClose } from "react-icons/gr";
import { BsFillCameraFill } from "react-icons/bs";
import { uploadImage, deleteImage } from "../app/features/upload/uploadSlice";

const ImageUpload = ({ formik, color }) => {
  const dispatch = useDispatch();
  const imgState = useSelector((state) => state.upload.images);

  const img = [];
  imgState.forEach((element) => {
    img.push({
      public_id: element.public_id,
      url: element.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  });

  return (
    <>
      <div style={{ width: "170px" }}>
        <Dropzone
          onDrop={(acceptedFiles) => dispatch(uploadImage(acceptedFiles))}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div
                style={{
                  padding: "20px 0",
                  margin: "20px 0",
                  border: `4px solid ${color}`,
                  textAlign: "center",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <BsFillCameraFill style={{ fontSize: "50px", color: color }} />
                <p style={{ margin: "0" }}>Upload Image</p>
              </div>
            </div>
          )}
        </Dropzone>
      </div>

      {imgState.map((item) => {
        return (
          <div key={item.public_id} style={{ position: "relative" }}>
            <GrClose
              style={{
                position: "absolute",
                background: "#ffff",
                fontSize: "21px",
                top: "2%",
                left: "1%",
                cursor: "pointer",
                borderRadius: "50%",
                padding: "3px",
              }}
              onClick={() => {
                dispatch(deleteImage(item.public_id));
              }}
            />
            <img
              style={{ maxWidth: "725px", height: "auto" }}
              src={item.url}
              alt="#!"
            />
          </div>
        );
      })}
    </>
  );
};

export default ImageUpload;
