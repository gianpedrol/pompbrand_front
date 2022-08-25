import React from "react";
import { getPhases } from "../../services/api";
import { Flex, Box, Spinner, Container } from '@chakra-ui/react';
import Header  from "../../components/Header/Header";
import './phases.scss';
import { useEffect, useState } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

export default function ListPhases() {
    const [phases, setPhases] = useState();
    const [spinner, setSpinner] = useState(false);

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
                <Box width='80vw' maxHeight='350px'>
                  <h1>Fases Cadastradas</h1>
                  <TableContainer>
                    <Table width='100%' variant='striped'  colorScheme='#B4FE5B'>
                      <Thead>
                        <Tr>
                          <Th>Fase</Th>
                          <Th> Editar </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {console.log(phases)}
                      {phases?.map((phase, index) => (  
                        <Tr key={index}>
                          <Td>{phase?.phase_name}</Td>
                            <Td>
                            </Td>    
                         </Tr>
                      ))}                   

                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Box>
              </Container>
              </Box>    

        </Flex>
        </>
    );
}