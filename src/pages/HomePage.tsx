import { Container, Box, Typography, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMe } from "../features/auth/api/authApi";

export const HomePage = () => {
    const { t } = useTranslation();
    const { data: userData } = useMe();

    return (
        <Container maxWidth="md">
            <Box py={4}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        {t("home.welcome", { name: userData?.customer.firstName })}
                    </Typography>

                    <Typography variant="body1" paragraph>
                        {t("home.email", { email: userData?.customer.email })}
                    </Typography>

                    <Typography variant="body1" paragraph>
                        {t("home.accountType", { type: userData?.customer.type })}
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

