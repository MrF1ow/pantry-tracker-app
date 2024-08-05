import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import GoogleIcon from "@mui/icons-material/Google";
import { useTheme } from "@mui/material";

import { useRouter } from "next/router";
import { useAppDispatch } from "@/redux/store";
import { setAuthState, setUser } from "@/redux/slices/authSlice";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Divider } from "@mui/material";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        PantryPal
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const createUser = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        dispatch(setUser({ email: user.email || "", uid: user.uid }));
        dispatch(setAuthState(true));
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithProvider = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        dispatch(setAuthState(true));
        dispatch(
          setUser({
            email: result.user.email as string,
            uid: result.user.uid as string,
          })
        );
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    createUser(data.get("email") as string, data.get("password") as string);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color={"text.secondary"}>
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} color={"text.secondary"}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "text.secondary", // default border color
                    },
                    "&:hover fieldset": {
                      borderColor: "secondary.main", // hover border color
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "text.secondary", // focused border color
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "text.secondary", // default border color
                    },
                    "&:hover fieldset": {
                      borderColor: "secondary.main", // hover border color
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "text.secondary", // focused border color
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "text.secondary", // default border color
                    },
                    "&:hover fieldset": {
                      borderColor: "secondary.main", // hover border color
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "text.secondary", // focused border color
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "text.secondary", // default border color
                    },
                    "&:hover fieldset": {
                      borderColor: "secondary.main", // hover border color
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "text.secondary", // focused border color
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
          <Box sx={{ my: 2 }}>
            <Divider
              orientation="horizontal"
              sx={{
                borderColor: theme.palette.text.secondary,
              }}
            />
          </Box>
          <Box
            width={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid",
              borderColor: "text.secondary",
              borderRadius: 1,
              padding: 1,
              "&:hover": {
                borderColor: "secondary.main",
              },
              cursor: "pointer",
            }}
            onClick={signInWithProvider}
          >
            <GoogleIcon />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
