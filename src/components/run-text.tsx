'use client'
import { Box, Typography } from "@mui/material";


export default function RunningText() {
    const text = '"Акция! Скидка 20% на все украшения этой недели! • Бесплатная доставка при заказе от 5000 руб. • Новые коллекции каждую неделю!"';

    return (
        <Box sx={{
            width: '100vw',
            overflow: 'hidden',
            backgroundColor: 'black',
            color: 'white',
            py: 1,
            position: 'relative',
            marginLeft: '-26px',
            marginTop: '-26px',
            
        }}>
            <Box sx={{
                display: 'flex',
                width: 'max-content',
                animation: 'marquee 20s linear infinite',
                '@keyframes marquee': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            }}>
                <Typography variant="body1" sx={{ whiteSpace: 'nowrap', pr: 4 }}>
                    {text}
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
                {text} • {text}
                </Typography>
            </Box>
        </Box>
    );
}