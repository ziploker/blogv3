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
    grid-template-columns: 1fr;
    /*grid-template-rows: 25% 75%;
     grid-template-areas:
        "spacer"
        "footerLeaf"; */
    height: 250px;

    

`;

const FooterImage = styled.img`

    //grid-area: footerLeaf;
    max-height: 100%;
    width: 100%;
    

`;

function Footer(props) {

   
    console.log("Footer_________________PROPS", location.pathname)
    //console.log("HEADER_PROPS solo", location.pathname)

    

    
      
    return (
        
        <FooterWrapper>

            <FooterImage src={footerImage}/>


            <section>
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
                        Stay up to date on the latest from Furrion
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
   
            </section>


        </FooterWrapper>
    )
}





export default Footer;
