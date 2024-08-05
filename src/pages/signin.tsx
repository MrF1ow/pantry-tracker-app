import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/redux/store";
import { setAuthState, setUser } from "@/redux/slices/authSlice";
import { Grid } from "@mui/material";

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

export default function SignIn() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useTheme();

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

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result.user);
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
    signInWithEmail(
      data.get("email") as string,
      data.get("password") as string
    );
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
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
          color={"text.secondary"}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            InputLabelProps={{
              sx: {
                color: "text.secondary",
              },
            }}
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            InputLabelProps={{
              sx: {
                color: "text.secondary",
              },
            }}
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
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
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 4, mb: 4 }} />
    </Container>
  );
}
