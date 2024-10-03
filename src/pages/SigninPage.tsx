import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSigninMutation } from "../lib/services/auth-api";
const SigninPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signin, { isLoading }] = useSigninMutation();
  const submitHandler = (data: any) => {
    signin(data)
      .unwrap()
      .then(() => {})
      .catch(() => {});
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      })
    ),
  });

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
        <h1>Sign In</h1>
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

export default SigninPage;
