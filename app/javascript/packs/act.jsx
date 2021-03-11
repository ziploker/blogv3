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

function Act(props) {

   
    console.log("ACT________________PROPS", location.pathname)
    //console.log("HEADER_PROPS solo", location.pathname)

    
      
    return (
        
        <ActWrapper>

            <Mega src={mega}>

            </Mega>


        </ActWrapper>
    )
}





export default Act;
