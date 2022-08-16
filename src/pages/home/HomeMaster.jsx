import React, {useContext}from "react";
import { AuthContext } from "../../contexts/Auth";
import { api } from "../../services/api";
import { Flex, Spacer, Box } from '@chakra-ui/react';
import Header  from "../../components/Header/Header";
import Sidebar  from '../../components/Sidebar/Sidebar';
import './HomeMaster.scss';

export default function HomeMaster() {

    async function getStages(){

    }
    return (
        <>
       
     <Flex width="100%" minHeight="100vh">       
     <Flex>
       <Header/>
     </Flex>

            <Flex  w='80%' alignItems="start" mt='155' justifyContent="center">
                <Box   w='80%' borderRadius='lg' bg='tomato' color='white' px={4}>
                    <div className="title-box-home">
                        <h1>
                            Stages
                        </h1>
                    </div>
                    <div className="info-box-home">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum explicabo non officia cupiditate et provident necessitatibus impedit placeat, rerum doloremque?</p>
                    </div>
                </Box>
            </Flex>

        </Flex>
        </>
    );
}

