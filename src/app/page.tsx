import MainCarousel from "@/components/carousel";
import CategoryLinks from "@/components/category-links";
import { Box, Grid, Paper, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <MainCarousel />
      <CategoryLinks />
      <ServiceBlocks/>
    </>
  );
}


const ServiceBlocks = ()=> {
  const services = [
    {
      title: "Гарантия и уход за украшениями",
      duration: "в течение 3 лет",
      description: "Мы восстановим Ваши украшения, если они потеряли первоначальный вид и блеск! В нашей мастерской ювелиры быстро и заботливо отполируют серебро и золото."
    },
    {
      title: "Доставка по всему миру",
      description: "Бережно доставим Ваши украшения по России и миру вместе с открыткой, инструкцией и сладким презентом."
    },
    {
      title: "Изготовление под заказ",
      description: "В наших мастерских мы можем создать абсолютно любое украшение из серебра или золота по Вашим фото или пожеланиям."
    },
    {
      title: "Скидка на каждую покупку",
      description: "При накоплении общей суммы покупок на 5000 руб., Вы получаете постоянную скидку 5% на большую часть ассортимента."
    }
  ];

  return (
    <Box sx={{
      maxWidth: 1200,
      margin: '40px auto',
      padding: '0 20px'
    }}>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Мы любим украшения и заботимся о сервисе
      </Typography>

      <Grid container spacing={4} sx={{
        display: 'flex',
        flexWrap:'nowrap',
        flexDirection:'row',
      }}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={3} sx={{
              height: '100%',
              maxWidth:'300px',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              flexWrap:'wrap',
              '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-5px)',
                transition: 'all 0.3s ease'
              }
            }}>
              <Typography variant="h6" component="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                {service.title}
                {service.duration && (
                  <Typography component="span" sx={{ 
                    display: 'block', 
                    fontSize: '0.9rem',
                    color: 'text.secondary',
                    mt: 1
                  }}>
                    {service.duration}
                  </Typography>
                )}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {service.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};


