'use client'
import { Box, Paper, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Carousel from 'react-material-ui-carousel';

interface CarouselItem {
    name: string;
    description: string;
    image: string;
    link: string;
  }

const items: CarouselItem[] = [
  {
    name: "Новинки и хиты",
    description: "Новые коллеции украшений",
    image: "https://i.pinimg.com/1200x/f0/1f/cd/f01fcd2a5d066f30fa84f784a015540c.jpg",
    link:"/catalog",
  },
  {
    name: "Идеи подарков",
    description: "Подарочные сертификаты для тебя и твоих близких",
    image: "https://i.pinimg.com/1200x/d6/36/b1/d636b136678a972a61281ab41b701dcf.jpg",
    link:"/certificates",
  },
  {
    name: "Украшения дизайнеров",
    description: "со всей России",
    image: "https://static.insales-cdn.com/r/F2WAEAxZkDU/rs:fit:1000:0:1/plain/images/products/1/903/476963719/50.jfif@webp",
    link:"/catalog",

  },
];

export default function MainCarousel() {
  const handleItemClick = (link: string) => {
    window.location.href = link;
    
  };



  return (
    <Box sx={{ maxWidth: "85%", margin: "auto", }}>
      <Carousel
        NextIcon={<ChevronRight />}
        PrevIcon={<ChevronLeft />}
        navButtonsProps={{
          style: {
            backgroundColor: "rgba(156, 95, 95, 0.5)",
            color: "white",
            borderRadius: 0,
          },
        }}
        indicatorIconButtonProps={{
          style: {
            padding: "5px",
            color: "lightgray",
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: "black",
          },
        }}
      >
        {items.map((item, i) => (
          <Paper
            key={i}
            elevation={3}
            onClick={()=> handleItemClick(item.link)}
            sx={{
              position: "relative",
              height: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
              cursor: "pointer",
              '&:hover': {
                opacity: 0.9,
                transition: 'opacity 0.3s ease'
              }
              
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <Typography variant="h4">{item.name}</Typography>
              <Typography variant="subtitle1">{item.description}</Typography>
            </Box>
          </Paper>
        ))}
      </Carousel>
    </Box>
  );
}


