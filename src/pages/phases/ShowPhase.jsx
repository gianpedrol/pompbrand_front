import React from "react";
import { showPhase, editStageApi, editPhaseApi, createNewStageApi, deleteStageApi } from "../../services/api";
import { useParams } from "react-router-dom";
import { Flex, Box } from '@chakra-ui/react';
import Header from "../../components/Header/Header";
import './phases.scss';
import { useEffect, useState } from "react";

import {
  Center,
  Stack,
  List,
  ListItem,
  Button,
  useColorModeValue,
  Editable,
  EditableInput,
  EditablePreview,
  useToast,
  Input,

} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';


export default function ShowPhase() {

  const toast = useToast();
  const { id: phaseId } = useParams();
  const [phase, setPhase] = useState();
  const [stage, setStage] = useState();
  const [stageName, setStageName] = useState(null);
  const [phaseName, setPhaseName] = useState();
  const [phaseEdited, setPhaseEdited] = useState();
  const [createNewStageName, setCreateNewStageName] = useState(false);
  const [newStageName, setNewStageName] = useState();
  const [newStage, setNewStage] = useState();
  const [deleteStageId, setDeleteStage] = useState();

  async function getPhase() {
    try {
      const phase = await showPhase(phaseId);
      setPhaseName(phase?.data?.phase_name);
      setPhase(phase);
    } catch (error) {
      console.log(error);
    }

  }

  async function editPhase() {
    const id = phaseId;
    const data = {
      name: phaseName,
    }

    try {
      const phaseEdited = await editPhaseApi(id, data);
      setPhaseEdited(phaseEdited);
      setPhaseName(phaseEdited?.data?.phase_name);
      if (phaseEdited.status === 200) {
        toast({
          title: 'Fase Editada!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
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

  async function handleKeyDownPhase(event) {
    if (event.key === 'Enter') {
      const id = phaseId;
      const data = {
        name: phaseName,
      }

      try {
        const phaseEdited = await editPhaseApi(id, data);
        setPhaseEdited(phaseEdited);
        setPhaseName(phaseEdited?.data?.phase_name);
        if (phaseEdited.status === 200) {
          toast({
            title: 'Fase Editada!',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
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
  }
  async function editStage(stageId) {
    const id = stageId;
    const data = {
      name: stageName,
      phaseID: phaseId
    }

    console.log(data);

    try {
      const stage = await editStageApi(id, data);
      setStage(stage);
      if (stage.status === 200) {
        toast({
          title: 'Etapa Editada!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }
    } catch (error) {
      toast({
        title: 'Deu algo errado',
        status: 'error',
        isClosable: true,
      })
      console.log(error);
    }

  };

  async function handleKeyDownStage(event, stageId) {
    if (event.key === 'Enter') {
      const id = stageId;
      const data = {
        name: stageName,
        phaseID: phaseId
      }

      console.log(data);

      try {
        const stage = await editStageApi(id, data);
        setStage(stage);
        if (stage.status === 200) {
          toast({
            title: 'Etapa Editada!',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
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
  }

  async function createNewStage() {
    const data = {
      nameStage: newStageName,
      phaseID: phaseId
    }
    try {
      const newStage = await createNewStageApi(data);
      setNewStage(newStage);

      if (newStage.status === 200) {
        toast({
          title: 'Etapa Editada!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        getPhase();
        setCreateNewStageName(false)
      }

    } catch (error) {
      toast({
        title: 'Deu algo errado',
        status: 'error',
        isClosable: true,
      })
      setCreateNewStageName(false)
      console.log(error);
    }

  }

  async function handleKeyDownNewStage(event) {
    if (event.key === 'Enter') {

      const data = {
        nameStage: newStageName,
        phaseID: phaseId
      }
      try {
        const newStage = await createNewStageApi(data);
        setNewStage(newStage);

        if (newStage.status === 200) {
          toast({
            title: 'Etapa Editada!',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          getPhase();
          setCreateNewStageName(false)
        }

      } catch (error) {
        toast({
          title: 'Deu algo errado',
          status: 'error',
          isClosable: true,
        })
        setCreateNewStageName(false)
        console.log(error);
      }
    }
  }

  async function deleteStage(id) {
    try {
      const apiDeleteStage = await deleteStageApi(id);
      console.log(apiDeleteStage);
      setDeleteStage(apiDeleteStage);

      if (apiDeleteStage.status === 200) {
        toast({
          title: 'Etapa excluida!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        getPhase();
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
    getPhase();
  }, [phaseId]);

  return (

    <>

      <Flex width="100%" minHeight="100vh">

        <Flex>
          <Header />
        </Flex>


        <Center display='flex' justifyContent='center' py={6} ml={6}>
          <Box
            justifyContent='center'
            maxW={'100vw'}
            w={'70vw'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}>
            <Stack
              textAlign={'center'}
              p={6}
              color={useColorModeValue('gray.800', 'white')}
              align={'center'}>
              <Stack direction={'row'} align={'center'} justify={'center'}>
                {phaseName && (
                  <Editable fontSize={'5xl'} fontWeight={800} placeholder={phaseName} >

                    <EditablePreview />
                    <EditableInput onChange={(e) => setPhaseName(e.target.value)} onKeyDown={handleKeyDownPhase} onBlur={() => editPhase(phase?.data?.id)} />
                  </Editable>
                )}
              </Stack>
            </Stack>

            <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>

              {phase?.data?.stages.map((stage, index) =>
                <List key={index} spacing={3}>
                  <ListItem key={index} fontSize='16px'>

                    <Editable defaultValue={stage.stage} >

                      <CloseIcon w={2} marginRight={'30px'} cursor={'pointer'} onClick={() => deleteStage(stage.stageId)} />
                      <EditablePreview />

                      <EditableInput onChange={(e) => setStageName(e.target.value)} onKeyDown={(event) => handleKeyDownStage(event, stage.stageId)} onBlur={() => editStage(stage.stageId)} />

                    </Editable>

                  </ListItem>

                </List>
              )}

              {createNewStageName === true &&
                <List spacing={3} >
                  <Input onChange={(e) => setNewStageName(e.target.value)} onKeyDown={(event) => handleKeyDownNewStage(event)} onBlur={() => createNewStage()} placeholder='Basic usage' />
                </List>
              }

              <Button
                onClick={() => createNewStageName === false ? setCreateNewStageName(true) : setCreateNewStageName(false)}
                mt={10}
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
                Adicionar nova etapa
              </Button>
            </Box>
          </Box>
        </Center>


      </Flex>
    </>
  );
}