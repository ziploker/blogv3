import React, {useEffect, useState} from 'react'
import styled, { ThemeProvider } from 'styled-components'
//import { Parallax, Background } from 'react-parallax';

const HomeWrapper = styled.div`

    //background: pink;
    height: calc(100vh - 85px);


`;

const News = styled.div`

    min-height: 100%;

    display: grid;
    justify-content: center;
    grid-template-columns: 1fr 420px 300px 1fr;
    grid-template-rows: 150px 100px 50px 1fr;
    grid-template-areas:
        ".   featured one   ."
        ".   featured two   ."
        ".   featured two   ."
        ".     .       .    .";
    grid-gap: 8px;

    margin-top: 35px;



`;

const Div1 = styled.div`
    background: blue;
    grid-area: featured;
    border-radius: 10px;

`;

const Div2 = styled.div`
    background: orange;
    grid-area: one;
    border-radius: 10px;

`;

const Div3 = styled.div`

background: green;
    grid-area: two;
    border-radius: 10px;
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
            
        </>
    );  
}


export default Home;