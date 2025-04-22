'use client'
import Link from "next/link";
import { CiHeart, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import classes from './nav.module.css'
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import DiamondIcon from '@mui/icons-material/Diamond';

const pages = [
  { href: "/", title: "Главная" },
  { href: "/catalog", title: "Каталог" },
  { href: "/certificates", title: "Сертификаты" },
  { href: "/help", title: "Помощь" },
  { href: "/contacts", title: "Контакты" },
];

const links = [
  {
    href: "/search",
    title: (<div><CiSearch /></div>),
  },

  {
    href: "/wishlist",
    title: (<div><CiHeart /></div>),
  },
  {
    href: "/basket",
    title: (<div ><CiShoppingCart /></div>),
  },
  {
    href: "/account",
    title: (<div ><CiUser /></div>),
  },
];
const settings = ['Профиль', 'Настройки', 'Выйти'];

export function Nav() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

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

  return (
    <AppBar position="static" sx={{
      width: '102vw',
      backgroundColor:'white',
      color: 'black',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
          
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
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

          {/* Пользовательское меню */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="" />
              </IconButton>
            </Tooltip>
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

//     <nav>
//       <ul>
//         {pages.map(({ href, title }) => (
//           <li key={href} >
//             <Link href={href}>{title}</Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }
          )}
          
// export function LinksNav() {
//   return (
//     <nav className={classes.links}>
//       <ul>
//         {links.map(({ href, title }) => (
//           <li key={href}>
//             <Link href={href}>{title}</Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }
