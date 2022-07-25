import React from "react";
import {
  Input,
  InputGroup,
  Button,
  InputRightElement,
  Container,
} from "@chakra-ui/react";

export default function Login() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Container>
      <InputGroup size="md">
        <Input pr="4.5rem" type="text" placeholder="Enter your Email" />
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="m" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </Container>
  );
}
