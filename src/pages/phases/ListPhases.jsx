import React from "react";
import { getPhases, deletePhaseApi, createNewPhaseApi} from "../../services/api";
import { Link } from "react-router-dom";
import { Flex, Box, Spinner, Container, ButtonGroup } from '@chakra-ui/react';
import Header  from "../../components/Header/Header";
import './phases.scss';
import { useEffect, useState } from "react";


import {
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  useToast,
  Button,
  useColorModeValue,
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
  Input

} from '@chakra-ui/react';

export default function ListPhases() {
    const [phases, setPhases] = useState();
    const toast = useToast();
    const [stages, setStages] = useState();
    const [spinner, setSpinner] = useState(false);
    const [delPhase, setDelPhase] = useState();
    const [newPhase, setNewPhase] = useState();
    const [newPhaseName, setNewNamePhase] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    async function getPhasesList() {
      setSpinner(true);
      try {
        const phases = await getPhases();               
        setPhases(phases.data);
      } catch (error) {
        console.log(error);
      }
      setSpinner(false)
     /* setTimeout(() => {
        setSpinner(false)
      }, 2000)  ;*/
    }

    async function createNewPhase(){
      setSpinner(true);
      const data = {
        name : newPhaseName,
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
      setTimeout(() => {
        setSpinner(false)
      }, 2000) ;
    }

    async function deletePhase(id){
      setSpinner(true);
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
      setTimeout(() => {
        setSpinner(false)
      }, 2000) ;

      setSpinner(false)
    }
    
  useEffect(() => {

     getPhasesList()

  }, []);


    return (

        <>
      
     <Flex width="100%" minHeight="100vh">   
    {
      spinner && ( 
        <div className="spinner">
          <div>
          <Spinner
          position='absolute'
          top='35%'
          left='35%'
          thickness='4px'
          speed='0.65s'
          bg='white'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        /> 
          </div>
        </div>   


    )
   
    }
     <Flex>
       <Header/>
     </Flex>
              <Box mt='155'>
              <Container>
                  <h1>Fases Cadastradas</h1>     
                  <ButtonGroup gap='4' mt='5'>
                    <Button onClick={onOpen} colorScheme='whatsapp'>Criar nova Fase</Button>
                  </ButtonGroup>     

                  


                <Container  mWidth="100vw">
                  <div>
                  <Center py={6} ml={'450px'} width={'100%'}>
                  {phases?.map((phase, index) => (  
                 <Box
                 m={6}
                 key={index}
                 minW={'300px'}
                 maxW={'100%'}
                 minH={'250px'}

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
                   <Box  px={6} py={1}>
                     {phase?.stages?.map((stage, index) => (
                     <List key={index}
                     spacing={3}>
                       <ListItem key={index}  fontSize='14px'>                        
                          - {stage.stage}
                       </ListItem>
                     </List>
                     ))}
                        <Box>
                        <ButtonGroup gap='4' mt={12}>
                            <Link to={`/phase/${phase?.id}`}>
                                  <Button
                                  w={'full'}
                                  bg={'green.400'}
                                  color={'white'}
                                  rounded={'xl'}
                                  boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                                  _hover={{
                                    bg: 'green.500',
                                  }}
                                  _focus={{
                                    bg: 'green.500',
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
               </Center>
                  </div>
                 
                  </Container>
                
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
                        <Button onClick={()=>createNewPhase()} bg={'green.400'} color={'white'} mr={3}>
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