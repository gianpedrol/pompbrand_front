import React from "react";
import { getPhases, deletePhaseApi, createNewPhaseApi } from "../../services/api";
import { Link } from "react-router-dom";
import { Flex, Box, Container, ButtonGroup } from '@chakra-ui/react';
import Header from "../../components/Header/Header";
import './phases.scss';
import { useEffect, useState } from "react";


import {
  Text,
  Stack,
  List,
  ListItem,
  useToast,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  SimpleGrid,
  Input

} from '@chakra-ui/react';

export default function ListPhases() {
  const [phases, setPhases] = useState();
  const toast = useToast();
  const [stages, setStages] = useState();
  const [delPhase, setDelPhase] = useState();
  const [newPhase, setNewPhase] = useState();
  const [newPhaseName, setNewNamePhase] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  async function getPhasesList() {
    try {
      const phases = await getPhases();
      setPhases(phases.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function createNewPhase() {

    const data = {
      name: newPhaseName,
    }
    try {
      const createNewPhase = await createNewPhaseApi(data);
      setNewPhase(createNewPhase);

      if (createNewPhase.status === 200) {
        toast({
          title: 'Fase Criada com sucesso!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        getPhasesList()
      }

    } catch (error) {
      toast({
        title: 'Deu algo errado',
        status: 'error',
        isClosable: true,
      })
      console.log(error);
    }
  }

  async function deletePhase(id) {
    try {
      const detephase = await deletePhaseApi(id);
      setDelPhase(detephase);

      if (detephase.status === 200) {
        toast({
          title: 'Phase excluida!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        getPhasesList();

      }

    } catch (error) {
      toast({
        title: 'Deu algo errado',
        status: 'error',
        isClosable: true,
      })
      console.log(error);
    }

  }

  useEffect(() => {

    getPhasesList()

  }, []);


  return (

    <>

      <Flex width="100%" minHeight="100vh">
        <Flex>
          <Header />
        </Flex>
        <Box mt='155'>
          <Container>
            <h1>Fases Cadastradas</h1>
            <ButtonGroup gap='4' mt='5'>
              <Button onClick={onOpen} bg={'#1A25FF'} color={'white'}>Criar nova Fase</Button>
            </ButtonGroup>



            <SimpleGrid
              width={'80vw'}
              columns={3}
              spacing={10}
            >
              {phases?.map((phase, index) => (
                <Box
                  m={6}
                  key={index}
                  bg={'white'}
                  boxShadow={'2xl'}
                  rounded={'md'}
                  overflow={'hidden'}>
                  <Stack
                    textAlign={'center'}
                    p={6}
                    color=""
                    align={'center'}>
                    <Stack direction={'row'} align={'center'} justify={'center'}>
                      <Text fontSize='24px' fontWeight={800}>
                        {phase?.phase_name}
                      </Text>
                    </Stack>
                  </Stack>
                  <Box px={6} py={1}>
                    {phase?.stages?.map((stage, index) => (
                      <List key={index}
                        spacing={3}>
                        <ListItem key={index} fontSize='14px'>
                          - {stage.stage}
                        </ListItem>
                      </List>
                    ))}
                    <Box>
                      <ButtonGroup gap='4' mt={12}>
                        <Link to={`/phase/${phase?.id}`}>
                          <Button
                            w={'full'}
                            bg={'#1A25FF'}
                            color={'white'}
                            rounded={'xl'}
                            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                            _hover={{
                              bg: '#000',
                            }}
                            _focus={{
                              bg: '#000',
                            }}>
                            Editar
                          </Button>
                        </Link>
                        <Button colorScheme='blackAlpha' onClick={() => deletePhase(phase?.id)}>Excluir</Button>
                      </ButtonGroup>
                    </Box>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>


          </Container>
        </Box>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Crie uma nova fase</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nome da Fase</FormLabel>
                <Input ref={initialRef} onChange={(e) => setNewNamePhase(e.target.value)} placeholder='Titulo da Fase' />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={() => createNewPhase()} bg={'green.400'} color={'white'} mr={3}>
                Criar
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      </Flex>
    </>
  );
}