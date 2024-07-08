import { ReactElement, useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import loginBanner from "assets/authentication-banners/login_image.png";
import IconifyIcon from "components/base/IconifyIcon";
import logo from "assets/logo/sync-logo.png";
import Image from "components/base/Image";
import { postLogin } from "apis/login";
import { useNavigate } from "react-router-dom";

const Login = (): ReactElement => {
  const navitate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    try {
      const response = await postLogin(userId, userPwd);
      console.log("로그인 성공:", response);

      // 추가 작업: 로그인 후 페이지 이동 또는 사용자 상태 업데이트
      navitate("/");
    } catch (error: any) {
      // `error`에 타입을 명시합니다.
      setErrorMessage(error.message);
    }
  };

  return (
    <Stack
      width={{ md: 0.5 }}
      m={2.5}
      gap={10}
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 15,
        padding: 15,
      }}
    >
      <Link href="/" width="fit-content">
        <Image src={logo} width={82.6} />
      </Link>
      <Stack alignItems="center" gap={2.5} width={330} mx="auto">
        <Typography variant="h3">Sync 관리자 로그인</Typography>
        <FormControl variant="standard" fullWidth>
          <InputLabel shrink htmlFor="email">
            Email
          </InputLabel>
          <TextField
            variant="filled"
            placeholder="Enter your email"
            id="email"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconifyIcon icon="ic:baseline-email" />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl variant="standard" fullWidth>
          <InputLabel shrink htmlFor="password">
            Password
          </InputLabel>
          <TextField
            variant="filled"
            placeholder="********"
            type={showPassword ? "text" : "password"}
            id="password"
            value={userPwd}
            onChange={(e) => setUserPwd(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    {showPassword ? (
                      <IconifyIcon icon="ic:baseline-key-off" />
                    ) : (
                      <IconifyIcon icon="ic:baseline-key" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <Typography
          variant="body1"
          sx={{
            alignSelf: "flex-end",
          }}
        >
          <Link href="/authentication/forgot-password" underline="hover">
            Forget password
          </Link>
        </Typography>
        {errorMessage && (
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        )}
        <Button variant="contained" fullWidth onClick={handleLogin}>
          Log in
        </Button>
        <br />
      </Stack>
    </Stack>
  );
};

export default Login;
