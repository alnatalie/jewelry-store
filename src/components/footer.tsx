"use client"
import { Box, List, ListItem, Typography, Link as MuiLink } from "@mui/material"
import Link from "next/link";

export function Footer(){
    const pages = [
        {href: '/help', title:'Помощь'},
        {href: '/contacts', title:'Контакты'},
        
    
    ]
    return (
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            borderColor: 'divider',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              maxWidth: 'lg',
              mx: 'auto',
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h6" component="h2" gutterBottom>
                PRICOSNIS
              </Typography>
              <Typography variant="body2" color="text.secondary">
                © 2025 «PRICOSNIS». Все права защищены.
              </Typography>
            </Box>
    
            <List sx={{ display: 'flex', gap: 2 }}>
              {pages.map(({ href, title }) => (
                <ListItem key={href} sx={{ width: 'auto', p: 0 }}>
                  <MuiLink
                    component={Link}
                    href={href}
                    color="inherit"
                    underline="hover"
                  >
                    {title}
                  </MuiLink>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      );
}

