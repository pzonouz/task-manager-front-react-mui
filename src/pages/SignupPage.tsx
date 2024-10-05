import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignupMutation } from "../lib/services/auth-api";
import { User } from "../lib/types/User";
const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOPen, setSnackbarOPen] = useState(false);
  const [signup, { isLoading }] = useSignupMutation();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z
        .object({
          email: z.string().email(),
          password: z
            .string()
            .regex(
              /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
              {
                message:
                  "Should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long",
              }
            ),
          re_password: z
            .string()
            .min(1, { message: "Please enter password again" }),
        })
        .refine((data) => data.password === data.re_password, {
          message: "Passwords do not match",
          path: ["re_password"],
        })
    ),
  });
  const submitHandler = (data: any) => {
    signup(data)
      .unwrap()
      .then(() => {
        setSnackbarOPen(true);
        reset();
      })
      .catch((err) => {
        Object.keys(err.data).forEach((field) => {
          // Set error for each field using setError By ChatGPT
          setError(field as keyof User, {
            type: "manual",
            message: err.data[field][0],
          });
        });
      });
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        marginTop: "5rem",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Snackbar
        open={snackbarOPen}
        autoHideDuration={6000}
        onClose={() => {
          setSnackbarOPen(false);
        }}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert
          onClose={() => {}}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Check your Email inbox and spam folder for To activate your account
        </Alert>
      </Snackbar>
      <Paper
        component="form"
        onSubmit={handleSubmit(submitHandler)}
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
          gap: "1rem",
          paddingBottom: "3rem",
        }}
      >
        <h1>Sign Up</h1>
        <TextField
          {...register("email")}
          sx={{ width: "90%" }}
          label="Email"
          variant="outlined"
          error={!!errors?.email}
          helperText={errors?.email?.message as ReactNode}
        />

        <FormControl
          sx={{ width: "90%" }}
          variant="outlined"
          error={!!errors?.password}
        >
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            {...register("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        {errors?.password && (
          <FormHelperText
            component={"small"}
            variant="filled"
            sx={{
              color: "error.main",
              width: "90%",
              marginTop: "-1rem",
              marginLeft: "3rem",
              textALign: "left",
            }}
          >
            {errors?.password?.message as ReactNode}
          </FormHelperText>
        )}
        <FormControl
          sx={{ width: "90%" }}
          variant="outlined"
          error={!!errors?.re_password}
        >
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            {...register("re_password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        {errors?.re_password && (
          <FormHelperText
            component={"small"}
            variant="filled"
            sx={{
              color: "error.main",
              width: "90%",
              marginTop: "-1rem",
              marginLeft: "3rem",
              textALign: "left",
            }}
          >
            {errors?.re_password?.message as ReactNode}
          </FormHelperText>
        )}

        <LoadingButton
          type="submit"
          loading={isLoading}
          sx={{ width: "90%", height: "3rem" }}
          variant="contained"
        >
          Login
        </LoadingButton>
      </Paper>
    </div>
  );
};

export default SignupPage;
