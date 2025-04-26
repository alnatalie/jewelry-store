"use client";
import Link from "next/link";
import { CiHeart, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Slide,
  InputBase,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import DiamondIcon from "@mui/icons-material/Diamond";
import CloseIcon from "@mui/icons-material/Close";
import { remult } from "remult";
import {
  AccountCircle,
  ExitToApp,
  Favorite,
  SendToMobile,
  ShoppingBag,
} from "@mui/icons-material";
import {
  wishlistStore,
} from "../../../stores/wishlist-store";
import { useStore } from "@nanostores/react";
import { cartStore } from "../../../stores/cart-of-product";

const pages = [
  { href: "/", title: "Главная" },
  { href: "/catalog", title: "Каталог" },
  { href: "/certificates", title: "Сертификаты" },
  { href: "/help", title: "Помощь" },
  { href: "/contacts", title: "Контакты" },
];

export function Nav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const wishlistItemsCount = Object.keys(useStore(wishlistStore)).length;

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const cartItems = useStore(cartStore);
  const cartItemsCount = cartItems.reduce((sum, item)=> sum + item.quantity, 0) //счет общего количества товаров

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const toggleProfileMenu = () => {
    setProfileOpen(!profileOpen);
  };

  const navigationDrawer = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 3,
        }}
      >
        <Typography variant="h6">Меню</Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ p: 2 }}>
        {pages.map((page) => (
          <ListItem
            key={page.href}
            component={Link}
            href={page.href}
            onClick={handleDrawerToggle}
            sx={{
              py: 2,
              px: 2,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontSize: "1.1rem", 
                    fontWeight: 500,
                    color: "text.primary", 
                    fontFamily: "inherit", 
                  }}
                >
                  {page.title}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Боковое меню для профиля
  const profileDrawer = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 3,
          bgcolor: "gray.600",
          color: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: "inherit" }}
        >
          {remult.user?.name || "Профиль"}
        </Typography>
        <IconButton
          onClick={toggleProfileMenu}
          sx={{ color: "#000000" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ py: 2 }}>
        {remult.authenticated() ? (
          <>
            <ListItem
              // button
              component={Link}
              href="/profile"
              onClick={toggleProfileMenu}
              sx={{ py: 1.5, px: 3 }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "#000000" }}>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
                    Мой профиль
                  </Typography>
                }
              />
            </ListItem>

            <ListItem
              // button
              component={Link}
              href="/orders"
              onClick={toggleProfileMenu}
              sx={{ py: 1.5, px: 3 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <ShoppingBag />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
                    Мои заказы
                  </Typography>
                }
              />
            </ListItem>

            <ListItem
              // button
              component={Link}
              href="/wishlist"
              onClick={toggleProfileMenu}
              sx={{ py: 1.5, px: 3 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Favorite />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
                    Избранное
                  </Typography>
                }
              />
            </ListItem>

            <Divider sx={{ my: 1 }} />

            <ListItem
              // button
              component={Link}
              href="/profile"
              onClick={toggleProfileMenu}
              sx={{ py: 1.5, px: 3 }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "error.main" }}>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: 500,
                      color: "error.main",
                    }}
                  >
                    Выйти
                  </Typography>
                }
              />
            </ListItem>
          </>
        ) : (
          <ListItem
            // button
            onClick={() => {
              toggleProfileMenu();
              window.location.href = "/profile";
            }}
            sx={{ py: 1.5, px: 3 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
                  Войти
                </Typography>
              }
            />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        width: "100%",
      }}
    >
      <AppBar
        position="static"
        sx={{
          width: "100vw",
          backgroundColor: "white",
          color: "black",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          position: "relative",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/*Логотип */}
            <DiamondIcon
              sx={{
                mr: 1,
                fontSize: "1.8rem",
                color: "primary.main",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1) rotate(15deg)",
                },
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              JEWELRY
            </Typography>

            {/* Бургер,  Мобильное меню */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: "black" }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Боковое меню для мобильных */}
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: 250,
                },
              }}
            >
              {navigationDrawer}
            </Drawer>

            <Typography
              variant="h5"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              JW
            </Typography>

            {/* Десктопное меню */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.href}
                  component={Link}
                  href={page.href}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    px: 3,
                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.04)",
                    },
                  }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>

            {/* Линки */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                ml: "auto",
              }}
            >
              {/* Поле поиска */}
              <Slide
                direction="left"
                in={searchOpen}
                mountOnEnter
                unmountOnExit
              >
                <Box
                  sx={{
                    width: "250px",
                    mr: 1,
                    transition: "all 0.3s ease",
                  }}
                >
                  <InputBase
                    placeholder="Поиск..."
                    fullWidth
                    autoFocus
                    sx={{
                      bgcolor: "rgba(0,0,0,0.05)",
                      borderRadius: 1,
                      px: 2,
                      py: 1,
                      "& .MuiInputBase-input": {
                        p: 0,
                      },
                    }}
                    endAdornment={
                      <IconButton
                        onClick={toggleSearch}
                        size="small"
                        sx={{ mr: -1 }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    }
                  />
                </Box>
              </Slide>

              {/* Кнопка поиска */}
              <IconButton
                aria-label="search"
                onClick={toggleSearch}
                sx={{
                  color: "black",
                  transform: searchOpen ? "scale(0)" : "scale(1)",
                  transition: "transform 0.3s ease",
                  width: searchOpen ? 0 : "auto",
                  overflow: "hidden",
                }}
              >
                <CiSearch size={24} />
              </IconButton>

              {!searchOpen && (
                <>
                  {/* Кнопка избранного */}
                  <IconButton
                    aria-label="favorites"
                    color="inherit"
                    component={Link}
                    href="/wishlist"
                    sx={{
                      color: "black",
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "scale(1.1)",
                        color: "primary.main",
                      },
                    }}
                  >
                    <Badge
                      badgeContent={wishlistItemsCount}
                      sx={{
                        "& .MuiBadge-badge": {
                          color: "white",
                          backgroundColor: "black",
                          border: "1px solid black",
                        },
                      }}
                    >
                      <CiHeart size={24} />
                    </Badge>
                  </IconButton>

                  {/* Кнопка корзины */}
                  <IconButton
                    aria-label="cart"
                    color="inherit"
                    component={Link}
                    href="/cart"
                    sx={{
                      color: "black",
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "scale(1.1)",
                        color: "primary.main",
                      },
                    }}
                  >
                    <Badge
                      badgeContent={cartItemsCount}
                      sx={{
                        "& .MuiBadge-badge": {
                          color: "white",
                          backgroundColor: "black",
                          border: "1px solid black",
                        },
                      }}
                    >
                      <CiShoppingCart size={24} />
                    </Badge>
                  </IconButton>

                  {/* Кнопка профиля */}
                  <IconButton
                    aria-label="user profile"
                    color="inherit"
                    onClick={toggleProfileMenu}
                    sx={{
                      color: "black",
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "scale(1.1)",
                        color: "primary.main",
                      },
                    }}
                  >
                    <CiUser size={24} />
                  </IconButton>

                  {/* Боковое меню профиля */}
                  <Drawer
                    anchor="right" 
                    open={profileOpen}
                    onClose={toggleProfileMenu}
                    sx={{
                      "& .MuiDrawer-paper": {
                        width: 280,
                        boxShadow: "0 0 24px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    {profileDrawer}
                  </Drawer>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Мобильное навигационное меню (бургер) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
          },
        }}
      >
        {navigationDrawer}
      </Drawer>
    </Box>
  );
}
