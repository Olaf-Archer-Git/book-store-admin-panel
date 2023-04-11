import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  deleteProduct,
} from "../../app/features/product/productSlice";
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
import { CiEdit } from "react-icons/ci";
import { colorToken } from "../../utils/theme";
import { Link } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product.products);
  const [openModal, setOpenModal] = useState(false);
  const [productId, setProductId] = useState("");

  const theme = useTheme();
  const colors = colorToken(theme.palette.mode);

  const showModal = (e) => {
    setOpenModal(true);
    setProductId(e);
  };

  const hideModal = () => {
    setOpenModal(false);
  };

  const deleteProductById = (e) => {
    dispatch(deleteProduct(e));
    setOpenModal(false);

    setTimeout(() => {
      dispatch(getAllProducts());
    }, 500);
  };

  useEffect(() => {
    dispatch(getAllProducts());
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

  function createData(key, ID, Title, Author, Category, Price, Edit, Delete) {
    return { key, ID, Title, Author, Category, Price, Edit, Delete };
  }

  const rows = [];
  for (let i = 0; i < productState.length; i++) {
    rows.push(
      createData(
        productState[i]._id,
        i + 1,
        productState[i].title,
        productState[i].author,
        productState[i].category,
        productState[i].price
      )
    );
  }

  return (
    <>
      <Typography variant="h2" sx={{ margin: "25px 0", width: "100%" }}>
        Products
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">Title</StyledTableCell>
              <StyledTableCell align="left">Author</StyledTableCell>
              <StyledTableCell align="left">Category</StyledTableCell>
              <StyledTableCell align="left">Price</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
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
                <StyledTableCell>{row.Author}</StyledTableCell>
                <StyledTableCell>{row.Category}</StyledTableCell>
                <StyledTableCell>{row.Price}</StyledTableCell>
                <StyledTableCell align="center">
                  <Link to={`/admin/product/${row.key}`}>
                    <CiEdit
                      style={{
                        color: colors.green[100],
                        fontSize: "21px",
                      }}
                      title="Edit"
                    />
                  </Link>
                </StyledTableCell>
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
        title="Do You Want To Delete This Product?"
        openModal={openModal}
        hideModal={hideModal}
        performAction={() => {
          deleteProductById(productId);
        }}
      />
    </>
  );
};

export default ProductList;
