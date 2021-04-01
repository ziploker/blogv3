import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import styled from 'styled-components'

import footerImage from '../../assets/images/footerImage'


const FooterWrapper = styled.div`
    /* background: pink;
    background-image: url(${footerImage});
    
    background-position: contain;
    background-repeat: no-repeat;
    
    min-height: 200px; */

    display: grid;
    //grid-template-columns: 1fr;

    grid-template-columns: minmax(20px,1fr) 400px minmax(350px,600px) minmax(20px,1fr);
    /*grid-template-rows: 25% 75%;
     grid-template-areas:
        "spacer"
        "footerLeaf"; */
    height: 250px;

    

`;

const FooterImage = styled.img`

    //grid-area: footerLeaf;
    grid-area: 1/1/-1/-1;
    max-height: 100%;
    width: 100%;
    

`;

const SubscribeSection = styled.div`

    grid-area: 1/2/-1/3;
    justify-self: center;
    align-self: end;
    margin-bottom: 20px;

    h2{

        margin: 0px 0px 10px 0px;

        span{
            color: white;
            font-size: 12px;
            
            letter-spacing: normal;
            line-height: 19px;
            line-height: 22px;
            font-style: normal;
            font-weight: 400;
            font-family: poppins;

            svg{
                margin: 0px 8px 0px 0px;
            }
        }

    }

    input{

        background: 0 0;
        border-color: #7F7F7F;
        border-style: solid;
        border-width: 0 0 1px;
        margin-bottom: 30px;
        padding: 0 0 9px;
        font-size: 14px;
        color: #7F7F7F;

        ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: #7F7F7F;
            opacity: 1; /* Firefox */
        }

        :-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: #7F7F7F;
        }

        ::-ms-input-placeholder { /* Microsoft Edge */
            color:#7F7F7F;
        }
    }

    button{

        font-style: normal;
        font-weight: 400;
        min-width: 200px;
        background-color: #c33;
        color: #fff;
        letter-spacing: 0;
        line-height: 26px;
        text-decoration: none;
        -webkit-transition: all .2s;
        transition: all .2s;
        overflow: visible;
        text-align: center;
        text-transform: capitalize;
        white-space: nowrap;
        padding: 12px 45px;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border-radius: 0;
        border: 0;

    }
`;

function Footer(props) {

   
   
    console.log("Footer_________________PROPS", location.pathname)
    //console.log("HEADER_PROPS solo", location.pathname)

    useEffect(() => {

        
        
        window.addEventListener('keydown', handleFirstTab);
        
        
        
    },[]);

    function handleFirstTab(e) {

        console.log("IN TAB thing..................")
        if (e.keyCode === 9) { // the "I am a keyboard user" key
            document.body.classList.add('user-is-tabbing');
            window.removeEventListener('keydown', handleFirstTab);
        }
    }
      
    return (
        
        <FooterWrapper>

            <FooterImage src={footerImage}/>


            <SubscribeSection>
                <h2>
                    <span>
                        <svg width="19px" height="13px" viewBox="0 0 19 13">
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g fill="#fff">
                                    <g>
                                        <polygon points="0 9.1842 4.103 5.0812 0 0.9792"></polygon>
                                        <polygon points="0.4365 -0.0003 9.0415 8.6057 17.6475 -0.0003"></polygon>
                                        <polygon points="14.0445 5.0163 18.0835 9.0553 18.0835 0.9773"></polygon>
                                        <polygon points="9.0414 10.0194 4.8104 5.7884 0.0004 10.5994 0.0004 12.7504 18.0834 12.7504 18.0834 10.4694 13.3384 5.7234"></polygon>
                                    </g>
                                </g>
                            </g>
                        </svg>

                    </span>

                    <span>
                        Stay up to date on the latest from FloridaBlaze.
                    </span>
                </h2>

                <form><strong style={{ display: "none"}}>Thank you for signing up! You are now subscribed.</strong>
                    <div>

                        <input type="email" required="" spellCheck="false" autoComplete="off" autoCapitalize="none" placeholder="Enter your e-mail address"/>

                        <button type="submit" name="submint">
                        Sign Up
                        </button>
                    </div>
                </form>
   
            </SubscribeSection>


        </FooterWrapper>
    )
}





export default Footer;
