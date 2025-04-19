'use client'
import { Box, Button, Grid, Paper, Typography } from "@mui/material";

const categories = [
  {
    title: "Кольца",
    subtitle: "Rings with cubic zirconia",
    href: "/rings",
    image: "https://i.pinimg.com/736x/8d/d9/34/8dd934d06bb97bcc38f858ec468d5ec8.jpg",
  },
  {
    title: "Серьги",
    subtitle: "Earrings",
    href: "/earrings",
    image: "https://i.pinimg.com/736x/2d/a6/52/2da652190bed77eb7628244ca4975423.jpg",
  },
  {
    title: "Кулоны",
    subtitle: "Necklaces & Accessories",
    href: "/necklaces",
    image: "https://i.pinimg.com/736x/53/9e/9a/539e9a1f4b65c823cec24c08006e5ac1.jpg",
  },
  {
    title: "Браслеты",
    subtitle: "Bracelets",
    href: "/bracelets",
    image: "https://i.pinimg.com/736x/0f/69/54/0f6954f4d65dd99981b508dec014dcc3.jpg",
  },
];

export default function CategoryLinks() {
    const handleClickCategory = (href: string) => {
      window.location.href = href;
    };
  
    return (
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        margin: '40px 0',
        padding: '0 20px'
      }}>
        <Box sx={{ 
          maxWidth: '1200px', 
          width: '100%',
        }}>
          <Grid container spacing={3} justifyContent="center">
            {categories.map((category, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={3} 
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  minWidth:250,
                  maxWidth: 300,
                }}
              >
                <Paper
                  elevation={3}
                  onClick={() => handleClickCategory(category.href)}
                  sx={{
                    height: 300,
                    width: '100%',
                    manWidth: '100%',
                    position: 'relative',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      transition: 'transform 0.3s ease',
                    }
                  }}
                >
                  {/* Фоновое изображение*/}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage: `url(${category.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                  
                  {/* Затемнение фона */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                    }}
                  />
                  
                  {/* Контент */}
                  <Box
                    sx={{
                      position: 'relative',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      color: 'white',
                      padding: 2,
                      zIndex: 2,
                    }}
                  >
                    <Typography variant="h5" component="h3" gutterBottom>
                      {category.title}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }}>
                      {category.subtitle}
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        mt: 2,
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          borderColor: 'white',
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickCategory(category.href);
                      }}
                    >
                      Смотреть
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  }


