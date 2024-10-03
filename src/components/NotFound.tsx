import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: "4rem", md: "6rem" }, fontWeight: "bold" }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontSize: { xs: "1.25rem", md: "2rem" } }}
        >
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
        >
          It might have been removed, or the URL is incorrect.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{
            mt: 2,
            padding: { xs: "8px 16px", md: "12px 24px" },
            fontSize: { xs: "0.875rem", md: "1rem" },
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}

export default NotFound;
