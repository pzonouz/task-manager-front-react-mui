import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import { Typography, Button, Container, Box } from "@mui/material";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  const handleGoHome = () => {
    navigate("/");
  };
  if (isRouteErrorResponse(error) && error.status == 401) {
    console.log(error.status);
    navigate("/auth/signin");
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h1"
        component="div"
        gutterBottom
        sx={{ fontSize: { xs: "5rem", md: "8rem" }, fontWeight: "bold" }}
      >
        <Box sx={{ color: "error.main" }}>Server Error</Box>
      </Typography>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ marginBottom: 3 }}
      ></Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        Back to Home
      </Button>
    </Container>
  );
};

export default ErrorPage;
