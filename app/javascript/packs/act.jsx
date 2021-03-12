import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import actBackground from '../../assets/images/actBackground.png'
import mega from '../../assets/images/mega.png'


//import useDocumentScrollThrottled from './useDocumentScrollThrottled.jsx'
import styled from 'styled-components'

const ActWrapper = styled.div`
    min-height: 100vh;
    background-color: black;
    background-image: url(${actBackground});
    background-position: left;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    

`;

const Mega = styled.img`

    position: absolute;
    top: -15%;
    left:0;
    width: 40vw;

`;

const ActGrid = styled.div`


    display: grid;
    grid-template-columns: 43% 57%;
    grid-template-rows: minmax(min-content, max-content) minmax(min-content, max-content) minmax(100px, max-content) minmax(100px, max-content);
    
`;

const ActHeader = styled.h1`

    font-family: Poppins;
    font-style: normal;
    font-weight: 800;
    font-size: 10vw;
    //line-height: 165px;
    /* identical to box height */

    letter-spacing: -0.01em;

    color: #FFFFFF;
    grid-area: 1/2/2/-1;
    align-self: end;
    
    line-height: 100%;
    
    


`;

const ActSubheader = styled.h1`

font-family: Poppins;
font-style: normal;
font-weight: normal;
font-size: 4vw;
line-height: 100%;
letter-spacing: -0.02em;
grid-area: 2/2/3/-1;

color: #E3B55A;
    
    


`;




function Act(props) {

   
    console.log("ACT________________PROPS", location.pathname)
    //console.log("HEADER_PROPS solo", location.pathname)

    
      
    return (
        
        <ActWrapper>

            {/* <Mega src={mega}>

            </Mega> */}

            <ActGrid>
                <ActHeader>ACT NOW</ActHeader>
                <ActSubheader>Contact Your State Representatives </ActSubheader>

            </ActGrid>


        </ActWrapper>
    )
}





export default Act;
