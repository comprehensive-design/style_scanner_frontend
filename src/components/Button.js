import React from 'react';
import styled from 'styled-components'

const StyledButton = styled.p`
  display: inline-block;
  min-width: 40px;
  cursor: pointer;
  padding: 7px 14px;
  font-size: 12px;
  background-color: ${props => props.BackColor};
  color: ${props => props.txtColor};
  border-radius: ${props => props.borderRad};
  border: ${props => props.border};

  &:hover {
    background-color: ${props => props.hovColor};
    color: ${props => props.hovTxtColor};
  }
`;

function Button({ onClick, children, BackColor='black', txtColor='white', hovColor='#d9d9d9' , border='0px', hovTxtColor='black', borderRad='5px'} ) {
  return (
    <StyledButton onClick={onClick} BackColor={BackColor} txtColor={txtColor} hovColor={hovColor} hovTxtColor={hovTxtColor} border={border}  borderRad={borderRad}>
      {children}
    </StyledButton>
  );
}

export default Button;
