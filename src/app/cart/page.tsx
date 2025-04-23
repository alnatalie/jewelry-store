import { 
    Container,
    Typography,
    Paper,
    Grid,
    Box,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead
  } from '@mui/material';


export async function CartPage() {
    

    return (
        <Container maxWidth="md" sx={{py:4}}>
            <Typography variant='h4' component="h1" gutterBottom sx={{ fontWeight:'bold', mb: 4}}>
                Корзина
            </Typography>
            <Grid container spacing={4}>
                {/* Список товаров */}
                <Grid item xs={12} md={8}>
                    <TableContainer component={Paper} elevation={3}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Товар</TableCell>
                                    <TableCell align="right">Цена</TableCell>
                                    <TableCell align="right">Сумма</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    )
    
}