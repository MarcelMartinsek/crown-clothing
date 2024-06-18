import styled from "styled-components";
import Button from "../button/button.component";
import { BaseButton, GoogleSignInButton, InvertedButton } from "../button/button.styles";


export const CartDropdownContainer = styled.div`
position: absolute;
width: 240px;
height: fit-content;
display: flex;
flex-direction: column;
padding: 20px;
border: 1px solid black;
background-color: white;
top: 90px;
right: 40px;
z-index: 5;

::-webkit-scrollbar {
  background: white;
  width: 7px;
}
 
::-webkit-scrollbar-thumb {
  background: lightgray;
  border-radius: 5px;
}

${BaseButton}, ${GoogleSignInButton}, ${InvertedButton}{
  margin-top: auto;
}
`

export const CartDropdownEmpty = styled.span`
font-size: 18px;
margin: 50px auto;
`

export const CartDropdownItems = styled.div`
height: fit-content;
max-height: 240px;
display: flex;
flex-direction: column;
overflow-y: auto;
margin-bottom: 5px;
`

// export const CheckoutButton = styled(Button)`
// margin-top: auto;
// `

