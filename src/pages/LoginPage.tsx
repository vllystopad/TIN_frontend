import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Container, Box, TextField, Button, Typography, Paper, Link } from "@mui/material";
import { useLogin } from "../features/auth/api/authApi";

export const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const loginMutation = useLogin();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await loginMutation.mutateAsync({ email, password });
            navigate("/");
        } catch (error) {
            // Error handled by snackbar in useLogin hook
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mx: 'auto', p: '0' }}>
            <Box display="flex" flexDirection="column" justifyContent="center" minHeight="100vh" py={4}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Login
                    </Typography>


                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loginMutation.isPending}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loginMutation.isPending}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending ? "Logging in..." : "Login"}
                        </Button>

                        <Box textAlign="center">
                            <Typography variant="body2">
                                Don't have an account?{" "}
                                <Link component={RouterLink} to="/register" underline="hover">
                                    Register here
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

