import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Routes from "./routes";

export const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes />
      </BrowserRouter>
    </ChakraProvider>
  );
};
