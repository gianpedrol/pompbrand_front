import React, { useState, useEffect } from "react";
import Header  from "../../components/Header/Header";
import { getUserInfo, updateStageStatus } from "../../services/api";
import { Link, Navigate, useParams } from "react-router-dom";
import {
    Flex,
    Box,
    Center,
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    useColorModeValue,
    Spinner,
    useToast,
    Checkbox, 
    CheckboxGroup 
  } from '@chakra-ui/react';
  import { CheckIcon } from '@chakra-ui/icons';

export default function ShowUser(){
    const toast = useToast();
    const { id: userId } = useParams();
    const [spinner, setSpinner] = useState(false);
    const [user, setUser] = useState();
    const [userPhases, setUserPhases] = useState();
    const [checked, setCheck] = useState()


    async function getUser() {
        setSpinner(true);
        try {
          const user = await getUserInfo(userId); 
          console.log(user);          
          setUser(user.data?.data);  
          setUserPhases(user.data?.Fases)       

          user.data?.Fases.map((index) => (
            index.etapas.map((etapas) => (
               setCheck({idEtapa : etapas.ParentID, check : etapas.status == 0 ? false : true, name: etapas.stage})
            ))
          ));

          /*
          userPhases.etapas.map((key, etapas ) => (
              console.log(key,etapas)
          ));*/


          } catch (error) {
          console.log(error);
        }      
        setTimeout(() => {
          setSpinner(false)
        }, 2000) ;
      }

      async function updateStatus(e, id){
        if(e === false){
          var status = 0; 
        }else{
          var status = 1; 
        }

        const data = {
          userID : userId ,
          stageID : id,
          status : status
        }
        try {
          const updateStatus = await updateStageStatus(data);           
                    
          if (updateStatus === 200) {
            toast({
              title: 'Status Alterado!',
              status: 'success',
              duration: 9000,
              isClosable: true,
            }); 
            getUser();
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
    getUser();
  }, [userId]);
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

        <Flex>
        <Center py={6}>
            {user && (
                    <Box
                    maxW={'530px'}
                    w={'full'}
                   
                    boxShadow={'2xl'}
                    rounded={'md'}
                    overflow={'hidden'}>
                    <Stack
                    textAlign={'center'}
                    p={6}
                    
                    align={'center'}>
                    <Stack direction={'row'} align={'center'} justify={'center'}>
                    <Text
                    fontSize={'sm'}
                    fontWeight={500}
                 
                    p={2}
                    px={3}
                    color={'green.500'}
                    rounded={'full'}>
                    Usuário
                    </Text>
                        <Text fontSize={'6xl'} fontWeight={800}>
                        {user.name}
                        </Text>
                    </Stack>
                    </Stack>

                    <Box px={6} py={10}>
                      {
                        userPhases.map((index) => (
                           <>
                           <div>
                           <Text>
                             {index.phase_name}
                           </Text>
                                 <Stack pl={6} mt={1} spacing={1}>
                                  <CheckboxGroup colorScheme='green'>
                                    <Stack >
                                  {  
                                  index.etapas.map((etapas) => (
  
                                    <Checkbox id={'stageId_'+etapas.ParentID} key={etapas.ParentID} defaultChecked={etapas.status === 0 ? false : true } onChange={(e) => updateStatus(e.target.checked, etapas.ParentID)}
                                    > {etapas.stage}</Checkbox>
                                  ))
                                  
                                  
                                  }     
                                    </Stack>
                                  </CheckboxGroup>
                                  </Stack> 
                                
                           </div>

                          
                            </>                          
                        ))
                      }
                   

                    <Button
                        mt={10}
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
                        Start your trial
                    </Button>
                    </Box>
                    </Box>
            )}
               
                </Center>
        </Flex>
               
        </Flex>

      
       </>

    )
}