// 'use client'

// import { useStore } from "@nanostores/react"
// import { catrgoryErrorStore, filteredProductStore, isCategoryLoadingStore, loadProductByCategory } from "../../../stores/category-store"
// import { useEffect } from "react";
// import { Alert, Grid, Container, LinearProgress, Typography } from "@mui/material";
// import { SearchProducts } from "@/components/catalog/catalog";

// export default function RingsPage() {
//     const rings = useStore(filteredProductStore);
//     const isLoading = useStore(isCategoryLoadingStore);
//     const error = useStore(catrgoryErrorStore);

//     useEffect(()=> {
//         loadProductByCategory("2");

//         return () => {
//           filteredProductStore.set([]); // Очищаем store при размонтировании
//         };
//     }, []);

//     if (isLoading) return <LinearProgress />;
//     if (error) return <Alert severity="error">{error}</Alert>

//     return (
//         <Container maxWidth="xl" sx={{ py: 4 }}>
//           <Typography variant="h4" component="h1" gutterBottom>
//             Кольца
//           </Typography>
    
//           {rings.length === 0 ? (
//             <Typography variant="h6" textAlign="center" py={10}>
//               Кольца не найдены
//             </Typography>
//           ) : (
//             <Grid container spacing={3}>
//               {rings.map((ring) => (
//                 <Grid item xs={12} sm={6} md={4} lg={3} key={ring.id}>
//                   <SearchProducts product={ring} />
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </Container>
//       );
//     }