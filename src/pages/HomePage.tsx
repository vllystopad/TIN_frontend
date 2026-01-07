import { Container, Box, Typography, Paper } from "@mui/material";
import { useMe } from "../features/auth/api/authApi";

export const HomePage = () => {
    const { data: userData } = useMe();

    return (
        <Container maxWidth="md">
            <Box py={4}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Welcome, {userData?.customer.firstName}!
                    </Typography>

                    <Typography variant="body1" paragraph>
                        Email: {userData?.customer.email}
                    </Typography>

                    <Typography variant="body1" paragraph>
                        Account Type: {userData?.customer.type}
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

