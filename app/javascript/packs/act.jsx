import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'


//import useDocumentScrollThrottled from './useDocumentScrollThrottled.jsx'
import styled from 'styled-components'

const ActWrapper = styled.div`
    min-height: 100vh;
    background-color: black;


`;



function Act(props) {

   
    console.log("ACT________________PROPS", location.pathname)
    //console.log("HEADER_PROPS solo", location.pathname)

    
      
    return (
        
        <ActWrapper>


        </ActWrapper>
    )
}





export default Act;
