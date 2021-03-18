import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

const SignupWrapper = styled.div`



    background: pink;
    height: 100vh;



`;


function Signup(props) {

   
    console.log("SIGNUP_________________PROPS", location.pathname)
    

    
      
    return (
        
       <SignupWrapper >signup</SignupWrapper>
    )
}





export default Signup;
