import React, { useContext, useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { AuthContext } from "../../contexts/Auth";
import Logo from "../../images/logo-sidebar.png";

const Login = () => {
  const { login, loading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg="#000">
      <Stack spacing={8} maxW={"lg"}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>
            <img src={Logo} alt="" srcset="" />
          </Heading>
        </Stack>
        <Box
          as="form"
          onSubmit={handleSubmit}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Link to={"/forgot-password"} color={"blue.400"}>
                  Forgot password?
                </Link>
              </Stack>

              <Button
                type="submit"
                bg="#1A25FF"
                color="white"
                _hover={{
                  bg: "#6E7C7C",
                  color: "white",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
