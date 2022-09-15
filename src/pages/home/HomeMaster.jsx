import React from "react";
import { getUsers } from "../../services/api";
import { Link } from "react-router-dom";
import { Flex, Box, Spinner, Container } from '@chakra-ui/react';
import Header  from "../../components/Header/Header";
import './HomeMaster.scss';
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

export default function HomeMaster() {
    const [users, setUsers] = useState();
    const [spinner, setSpinner] = useState(false);

    async function getUsersList() {
      setSpinner(true);
      try {
        const users = await getUsers();               
        setUsers(users.data?.data);

      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setSpinner(false)
      }, 5000)  ;
    }
    
  useEffect(() => {

      getUsersList();

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
                  <h1>Meus Clientes</h1>
                  <TableContainer>
                    <Table width='100%' variant='striped' colorScheme='#B4FE5B'>
                      <Thead>
                        <Tr>
                          <Th>Name</Th>
                          <Th>Email</Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        
                      {users?.map((user, index) => (    
                        <Tr key={index}>
                          <Td>{user?.name}</Td>
                          <Td>{user?.email}</Td>
                            <Td>
                              <p>{user?.stage?.phase_name}</p>
                              { user?.stage?.StageStatus === 0 ? <p>Não Concluído</p> : user?.stage?.StageStatus === 1 ? <p>Concluído</p> : ''}
                            </Td>    
                            <Td>
                              <Link to={`/user/${user?.id}`}>
                                Ver
                              </Link>
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