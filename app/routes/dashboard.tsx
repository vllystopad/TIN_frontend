import { useTranslation } from "react-i18next";
import { Container, Box, Typography, Card, CardContent } from "@mui/material";

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t("dashboard.welcome")}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {t("dashboard.description")}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
            mt: 2,
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Card 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Dashboard content placeholder
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Card 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Dashboard content placeholder
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Card 3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Dashboard content placeholder
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
