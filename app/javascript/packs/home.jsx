import React, {useEffect, useState} from 'react'
import styled, { ThemeProvider } from 'styled-components'
//import { Parallax, Background } from 'react-parallax';
import Login from './pages/login'


const HomeWrapper = styled.div`

    //background: pink;
    
    height: calc(100vh - 85px);
    max-height: 500px;
    overflow: hidden;
    //min-width: 500px;
    
`;

const NewsWrapper = styled.div``;

const News = styled.div`

    min-height: 100%;
    
    display: grid;
    justify-content: center;
    //grid-template-columns: 1fr minmax(0px, 350px) minmax(0px, 600px) 1fr;
    
    grid-template-columns: minmax(20px, 1fr) minmax(170px, 350px)  minmax(340px, 600px)  minmax(20px, 1fr);

    
    grid-template-rows: 170px 120px 50px 1fr;
    grid-template-areas:
        
        ".   one featured   ."
        
        ".   two featured   ."
        ".   two featured   ."
        ".     .       .    .";
    grid-gap: 8px;

    margin-top: 50px;

    /* display: grid;
    justify-content: center;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
        "featured one two  ." */




`;

const Div1 = styled.div`
    background: blue;
    grid-area: featured;
    border-radius: 10px;
    
    
    

    &:before{
        content: '';
        display: block;
        width: 0;
        height: 0;
        padding-top: calc(100% / (16/9));

        

    }

`;

const Div2 = styled.div`
    background: orange;
    grid-area: one;
    border-radius: 10px;
    //margin-right: 25px;

    

`;

const Div3 = styled.div`

background: green;
    grid-area: two;
    border-radius: 10px;
    //margin-right: 25px;
    
`;

const BackgroundGray = styled.div`

    background: #C4C4C4;
    grid-area: 3/1/-1/-1;
    z-index: -1;
    
    



`;



function Home(props){

    // const [screenIsAtTop, setScreenIsAtTop] = React.useState(true);
    
    

    
    return (
        <>
            <HomeWrapper>
                
                    <News>

                        <Div1/>
                        <Div2/>
                        <Div3/>
                        <BackgroundGray></BackgroundGray>

                        
                    </News>
                
                
            </HomeWrapper>

            <Login handleSuccessfulAuth={props.handleSuccessfulAuth} setLoginClicked={props.setLoginClicked} loginClicked={props.loginClicked} />
            
        </>
    );  
}


export default Home;