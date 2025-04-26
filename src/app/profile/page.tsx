'use client'
import Auth from "@/demo/auth/Auth";
import { ExitToApp, Lock, LockOpen, Person } from "@mui/icons-material";
import { Alert, Avatar, Box, Button, Card, CardContent, Divider, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { remult } from "remult";


export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState <JSX.Element | string>();
    const [userAuth, setUserAuth] = useState(false);


    useEffect(()=> {
        remult
        .initUser()
        .then(()=>{
            setUserAuth(remult.authenticated());
            setLoading(false);
        })
        .catch((e)=>{
            setLoading(false);
            if(e.message.includes("the server configuration")) {
                setError(
                    <Box>
                        <Typography variant="body1" gutterBottom>
                        Make sure to set the <code>AUTH_SECRET</code> in the{" "} <code>.env</code> file.
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Read more at{""}
                            <Link 
                            href="https://errors.authjs.dev#missingsecret" 
                            target="_blank"
                            rel="noopener">
                                auth.js docs
                            </Link>
                        </Typography>
                        <Typography variant="caption">
                        Please check the server terminal console for more information.
                        </Typography>
                    </Box>
                );
            }
        });
    }, []);

    if (loading) {
        return (
             <Box maxWidth="md" mx="auto" mt={4}>
                <Alert severity="error" sx={{ mb: 2 }}>
                     <Typography variant="h6"> Authentication Error
                    </Typography>
                 </Alert>
                <Paper elevation={3} sx={{   p:3}}>
                     {error}
                 </Paper>
            </Box>
        );
    }

    return (
        <Box maxWidth="sm" mx="auto" mt={4}>
            <Card elevation={3}>
                <CardContent  sx={{ p: 4 }}>
                    <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                        <Avatar sx={{
                            width: 80,
                            height: 80,
                            bgcolor: 'primary.main',
                            mb: 2
                        }}>
                            {userAuth ? <Person fontSize="large" /> : <Lock fontSize="large" />}
                        </Avatar>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {userAuth ? 'Your Profile' : 'Authentication'}
                        </Typography>
                    </Box>
                    <Divider sx={{ my:2}} />
                    {userAuth ? (
                        <>
                        <Typography variant="h6" textAlign="center" gutterBottom>
                        Привет, <strong>{remult.user?.name}</strong>
                        </Typography>
                        <Typography variant="body1" textAlign="center" color="text.secondary" mb={3}>
                        Вы успешно зашли
                        </Typography>
                        
                        <Box display="flex" justifyContent="center" mt={4}>
                            <Button 
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<ExitToApp/>}
                            href="/api/auth/signout"
                            sx={{ px:4, py:1.5}}>
                                Выйти
                            </Button>
                        </Box>
                        </>
                    ) : (
                        <>
                        <Typography variant="h6" textAlign="center" gutterBottom>
                        Вы не прошли проверку подлинности
                        </Typography>
                        <Typography variant="body1" textAlign="center" color="text.secondary" mb={3}>
                        Пожалуйста, войдите в систему, чтобы получить доступ к своей учетной записи
                        </Typography>

                        <Box display="flex" justifyContent="center" mt={4}>
                            <Button 
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<LockOpen />}
                            href="/api/auth/signin"
                            sx={{ px: 4, py: 1.5 }}>
                                Войти
                            </Button>
                        </Box>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}










    {/* <Auth/> */}

    


 