import React from "react";
import {
  Stack,
  Input,
  Container,
  Center,
  Flex,
  Button,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import './login.scss';

export default function Login() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show)
  return (
    <Container >
      <Flex align="center" justify="center">
          <h1>Seja Bem Vindo </h1>
        <Center h="100vh">
        <Stack spacing={3}>
          <Input variant='outline' placeholder='Outline' />
          <InputGroup size='md'>
            <Input
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder='Enter password'
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
        </InputGroup>
        </Stack>
        </Center>
      </Flex>     
    </Container>  
  );
}
