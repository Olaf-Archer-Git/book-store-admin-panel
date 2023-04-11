import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
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
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { colorToken } from "../../utils/theme";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../../app/features/order/orderSlice";
import ModalComponent from "../../components/ModalComponent";
import { AiFillDelete } from "react-icons/ai";

const OrderList = () => {
  const theme = useTheme();
  const colors = colorToken(theme.palette.mode);
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.order.orders);

  useEffect(() => {
    dispatch(getAllOrders());
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

  function createData(key, ID, Name, Product, Count, Total, Action) {
    return { key, ID, Name, Product, Count, Total, Action };
  }

  const rows = [];
  for (let i = 0; i < orderState.length; i++) {
    rows.push(
      createData(
        orderState[i]._id,
        i + 1,
        `${orderState[i].orderBy.firstName} ${orderState[i].orderBy.lastName}`,
        orderState[i]?.products[0]?.product?.title,
        orderState[i]?.products[0]?.count,
        orderState[i]?.paymentIntent.cost
      )
    );
  }

  return (
    <>
      <Typography variant="h2" sx={{ margin: "25px 0", width: "100%" }}>
        Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Product</StyledTableCell>
              <StyledTableCell align="left">Count</StyledTableCell>
              <StyledTableCell align="left">Total Price</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.key}>
                <StyledTableCell component="th" scope="row">
                  {row.ID}
                </StyledTableCell>
                <StyledTableCell align="left">{row.Name}</StyledTableCell>
                <StyledTableCell align="left">{row.Product}</StyledTableCell>
                <StyledTableCell align="left">{row.Count}</StyledTableCell>
                <StyledTableCell align="left">{row.Total}</StyledTableCell>
                <StyledTableCell align="left">
                  <ModalComponent
                    icon={<AiFillDelete color="orangeRed" />}
                    text="Order"
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderList;
