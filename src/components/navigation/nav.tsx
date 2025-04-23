'use client'
import Link from "next/link";
import { CiHeart, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { AppBar, Badge, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar,  Typography, Slide, InputBase} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import DiamondIcon from '@mui/icons-material/Diamond';
import CloseIcon from '@mui/icons-material/Close';


const pages = [
  { href: "/", title: "Главная" },
  { href: "/catalog", title: "Каталог" },
  { href: "/certificates", title: "Сертификаты" },
  { href: "/help", title: "Помощь" },
  { href: "/contacts", title: "Контакты" },
];

// const links = [
//   {
//     href: "/search",
//     title: (<div><CiSearch /></div>),
//   },

//   {
//     href: "/wishlist",
//     title: (<div><CiHeart /></div>),
//   },
//   {
//     href: "/basket",
//     title: (<div ><CiShoppingCart /></div>),
//   },
//   {
//     href: "/account",
//     title: (<div ><CiUser /></div>),
//   },
// ];
// const settings = ['Профиль', 'Настройки', 'Выйти'];


export function Nav() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
   const [searchOpen, setSearchOpen] = useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };


  return (
    <Box  sx={{
      position: 'sticky',
      top: 0,
      zIndex: 1100,
      width: '100%',
    }}>

    
    <AppBar position="static" sx={{
      width: '100vw',
      backgroundColor:'white',
      color: 'black',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'relative',
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/*Логотип */}
          <DiamondIcon sx={{ 
            mr: 1,
            fontSize: '1.8rem',
            color: 'primary.main',
            transition: 'all 0.3s ease',
            '&:hover': {
            transform: 'scale(1.1) rotate(15deg)' // Эффект при наведении
            }
          }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            JEWELRY
          </Typography>

          {/* Мобильное меню */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{color:'black'}}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.href} onClick={handleCloseNavMenu}>
                  <Link href={page.href} passHref>
                    <Typography textAlign="center">{page.title}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            JW
          </Typography>

          {/* Десктопное меню */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.href}
                component={Link}
                href={page.href}
                onClick={handleCloseNavMenu}
                sx={{ my: 2,
                   color: 'black', 
                   display: 'block',
                   px: 3,
                   fontSize: '1rem',
                   '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.04)',
                }
                   }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          

          {/* Линки */}
          <Box sx={{
            display: 'flex', 
            alignItems: 'center',
            gap: 1,
            ml: 'auto'
          }}>
            {/* Поле поиска */}
            <Slide direction="left" in={searchOpen} mountOnEnter unmountOnExit>
            <Box sx={{
                width: '250px',
                mr: 1,
                transition: 'all 0.3s ease'
              }}>
                <InputBase
                  placeholder="Поиск..."
                  fullWidth
                  autoFocus
                  sx={{
                    bgcolor: 'rgba(0,0,0,0.05)',
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                    '& .MuiInputBase-input': {
                      p: 0,
                    }
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
                color: 'black',
                transform: searchOpen ? 'scale(0)' : 'scale(1)',
                transition: 'transform 0.3s ease',
                width: searchOpen ? 0 : 'auto',
                overflow: 'hidden'
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
              sx={{ color: 'black',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                  color: 'primary.main',}
              }}
            >
              <Badge 
    badgeContent={4} 
    sx={{
      '& .MuiBadge-badge': {
        color: 'white',       
        backgroundColor: 'black', 
        border: '1px solid black'
      }
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
              sx={{ color: 'black',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                  color: 'primary.main',}
              }}
            >
              <Badge 
    badgeContent={2} 
    sx={{
      '& .MuiBadge-badge': {
        color: 'white',       
        backgroundColor: 'black', 
        border: '1px solid black' 
      }
    }}
  >
                <CiShoppingCart size={24} />
              </Badge>
            </IconButton>

            {/* Кнопка профиля */}
            <IconButton 
              aria-label="user profile" 
              color="inherit"
              onClick={handleOpenUserMenu}
              sx={{ color: 'black',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                  color: 'primary.main',}
              }}
            >
              <CiUser size={24} />
            </IconButton>

            {/* Меню профиля */}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu} component={Link} href="api/auth/signin">
                Профиль
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu} component={Link} href="/orders">
                Мои заказы
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu} component={Link} href="/logout">
                Выйти
              </MenuItem>
            </Menu>
              </>
            )}


          </Box>


        </Toolbar>
      </Container>
    </AppBar>
    </Box>
          )}
          
//   );
// }
