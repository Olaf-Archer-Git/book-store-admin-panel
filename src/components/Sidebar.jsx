import React, { useState } from "react";
import { useMediaQuery, useTheme, Typography } from "@mui/material";
import {
  ProSidebarProvider,
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { colorToken } from "../utils/theme";
import { GoBook, GoListUnordered } from "react-icons/go";
import { ImBook, ImBlogger2 } from "react-icons/im";
import {
  MdOutlineDashboard,
  MdBookmarkBorder,
  MdQueryStats,
} from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { TbBrandProducthunt, TbDiscount2 } from "react-icons/tb";

const SideBar = () => {
  const theme = useTheme();
  const colors = colorToken(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const matches = useMediaQuery("(max-width:991px)");

  return (
    <ProSidebarProvider>
      <Sidebar
        defaultCollapsed={isCollapsed || matches}
        backgroundColor={colors.primary}
        rootStyles={{
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            margin: "0",
            padding: "30px",
            background: colors.neutral[100],
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {React.createElement(isCollapsed === true ? ImBook : GoBook, {
            className: "sidebar-icon",
            title: "Press To Hide",
            onClick: () => setIsCollapsed(!isCollapsed),
          })}
          {matches ||
            (isCollapsed === false ? (
              <Typography variant="h1">Book Store</Typography>
            ) : null)}
        </div>
        <Menu
          menuItemStyles={{
            button: ({ level }) => {
              if (level === 0)
                return {
                  color: colors.neutral[200],
                  backgroundColor: colors.primary,
                  ":hover": {
                    backgroundColor: colors.secondary[100],
                  },
                  svg: {
                    fontSize: "21px",
                  },
                };
              if (level === 1)
                return {
                  color: colors.secondary[200],
                  backgroundColor: colors.primary,
                  ":hover": {
                    color: colors.primary,
                    backgroundColor: colors.secondary[200],
                  },
                };
            },
          }}
        >
          <MenuItem
            component={<Link to="/admin/" />}
            icon={<MdOutlineDashboard />}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/customers" />}
            icon={<AiOutlineUser />}
          >
            Customers
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/order-list" />}
            icon={<MdBookmarkBorder />}
          >
            Orders
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/query-list" />}
            icon={<MdQueryStats />}
          >
            Queries
          </MenuItem>
          <SubMenu label="Products" icon={<TbBrandProducthunt />}>
            <MenuItem component={<Link to="/admin/product" />}>
              Add Product
            </MenuItem>
            <MenuItem component={<Link to="/admin/products-list" />}>
              Product List
            </MenuItem>
          </SubMenu>
          <SubMenu label="Categories" icon={<GoListUnordered />}>
            <MenuItem component={<Link to="/admin/category" />}>
              Add Category
            </MenuItem>
            <MenuItem component={<Link to="/admin/category-list" />}>
              Category List
            </MenuItem>
          </SubMenu>

          <SubMenu label="Blogs" icon={<ImBlogger2 />}>
            <MenuItem component={<Link to="/admin/blog" />}>Add Blog</MenuItem>
            <MenuItem component={<Link to="/admin/blog-list" />}>
              Blogs List
            </MenuItem>
          </SubMenu>

          <SubMenu label="Discount" icon={<TbDiscount2 />}>
            <MenuItem component={<Link to="/admin/discount" />}>
              Add Discount
            </MenuItem>
            <MenuItem component={<Link to="/admin/discount-list" />}>
              Discount List
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </ProSidebarProvider>
  );
};

export default SideBar;
