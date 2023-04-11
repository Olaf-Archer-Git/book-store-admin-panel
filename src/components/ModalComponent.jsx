import React from "react";
import { Box, Typography, Modal, Button } from "@mui/material";

const ModalComponent = ({ title, openModal, hideModal, performAction }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    color: "#000",
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={hideModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            {title}
          </Typography>

          <Button
            variant="contained"
            color="info"
            sx={{ color: "#fff", margin: "50px 10px 10px 0" }}
            onClick={hideModal}
          >
            Cancel
          </Button>
          <Button
            onClick={performAction}
            variant="contained"
            color="info"
            sx={{
              background: "#fff",
              color: "#000",
              margin: "50px 10px 10px 0",
            }}
          >
            OK
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ModalComponent;
