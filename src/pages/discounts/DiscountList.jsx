import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  tableCellClasses,
  styled,
} from "@mui/material";
import ModalComponent from "../../components/ModalComponent";
import { AiFillDelete } from "react-icons/ai";
import { colorToken } from "../../utils/theme";
import {
  getAllDiscounts,
  deleteDiscount,
} from "../../app/features/discounts/discountSlice";

const DiscountList = () => {
  const dispatch = useDispatch();
  const discountState = useSelector((state) => state.discount.discounts);
  const [openModal, setOpenModal] = useState(false);
  const [discountId, setDiscountId] = useState("");

  const theme = useTheme();
  const colors = colorToken(theme.palette.mode);

  const showModal = (e) => {
    setOpenModal(true);
    setDiscountId(e);
  };

  const hideModal = () => {
    setOpenModal(false);
  };

  const deleteDiscountById = (e) => {
    dispatch(deleteDiscount(e));
    setOpenModal(false);

    setTimeout(() => {
      dispatch(getAllDiscounts());
    }, 500);
  };

  useEffect(() => {
    dispatch(getAllDiscounts());
  }, [dispatch]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: colors.neutral[100],
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(key, ID, Title, Expiry, Discount, Delete) {
    const editDate = Expiry.slice(0, 10).split("-").reverse().join(".");
    // console.log(editDate);
    return { key, ID, Title, editDate, Discount, Delete };
  }

  const rows = [];
  for (let i = 0; i < discountState.length; i++) {
    rows.push(
      createData(
        discountState[i]._id,
        i + 1,
        discountState[i].name,
        discountState[i].expiry,
        discountState[i].discount
      )
    );
  }

  return (
    <>
      <Typography variant="h2" sx={{ margin: "25px 0", width: "100%" }}>
        Discounts
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">Title</StyledTableCell>
              <StyledTableCell align="left">Expiry</StyledTableCell>
              <StyledTableCell align="left">Discount</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.key}
                sx={{ textTransform: "capitalize" }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.ID}
                </StyledTableCell>
                <StyledTableCell>{row.Title}</StyledTableCell>
                <StyledTableCell>{row.editDate}</StyledTableCell>
                <StyledTableCell>{row.Discount}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    onClick={() => showModal(row.key)}
                    style={{ color: "#f35232" }}
                  >
                    <AiFillDelete style={{ fontSize: "21px" }} title="Delete" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalComponent
        title="Do You Want To Delete This Discount?"
        openModal={openModal}
        hideModal={hideModal}
        performAction={() => {
          deleteDiscountById(discountId);
        }}
      />
    </>
  );
};

export default DiscountList;
