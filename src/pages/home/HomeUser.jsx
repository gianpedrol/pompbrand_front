import React, { useState, useEffect } from "react";
import Header  from "../../components/Header/Header";
import { getUserInfo, updateStageStatus } from "../../services/api";
import { useParams } from "react-router-dom";
import {
    Flex,
    Box,
    Center,
    Text,
    Stack,
    useToast,
    Checkbox, 
    CheckboxGroup,
    SimpleGrid,
  } from '@chakra-ui/react';

export default function HomeUser(){
    const toast = useToast();
    const { id: userId } = useParams();
    const [user, setUser] = useState();
    const [checked, setCheck] = useState()

    const [userPhases, setUserPhases] = useState();



    async function getUser() {
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

   
          } catch (error) {
          console.log(error);
        } 
      }

      
    useEffect(() => {
        getUser();
    }, [userId]);

    return (

        <>
      
        <Flex width="100%" minHeight="100vh">   
        <Flex>
          <Header/>
        </Flex>

        <Flex>
        <Center py={6}>
            {user && (
                    <Box
                    maxW={'100vw'}
                    w={'80vw'}
                    mt={105}
                    ml={55}
                   
                    boxShadow={'2xl'}
                    rounded={'md'}
                    overflow={'hidden'}>
                    <Stack
                    textAlign={'center'}
                    p={6}
                    
                    align={'center'}>
                    <Stack direction={'row'} align={'center'} justify={'center'}>
                        <Text fontSize={'6xl'} fontWeight={800}>
                        {user.name}
                        </Text>
                    </Stack>
                    </Stack>

                    <Box px={6} py={10}> 
                    <SimpleGrid
                    columns={2} 
                    spacing={10}       
                    >
                      {
                        userPhases.map((index) => (
                           <>
                           <div>
                          {index.etapas.length > 0 ?
                           <Text>
                             {index.phase_name}
                           </Text>
                            : ''}
                                 <Stack pl={6} mt={1} spacing={1}>
                                  <CheckboxGroup colorScheme='green'>
                                    <Stack >
                                  {  
                                  index.etapas.map((etapas) => (
  
                                    <Checkbox id={'stageId_'+etapas.ParentID} key={etapas.ParentID} defaultChecked={etapas.status === 0 ? false : true } disabled> {etapas.stage}</Checkbox>
                                  ))
                                  
                                  
                                  }     
                                    </Stack>
                                  </CheckboxGroup>
                                  </Stack> 
                                
                           </div>                          
                            </>                          
                        ))
                      }



                   </SimpleGrid>                    
                    </Box>
                </Box>
            )}
               
                </Center>
        </Flex>
               
        </Flex>

      
       </>

    )
}