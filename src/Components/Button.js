import React from 'react';
import styled from 'styled-components'

const StyledButton = styled.p`
  display: inline-block;
  background-color: ${props => props.BackColor};
  color: ${props => props.txtColor};
  min-width: 50px;
  cursor: pointer;
  border-radius: 10px;
  padding: 10px 15px;
  font-size: 12px;
  margin: 0 100px;

  &:hover {
    background-color: ${props => props.hovColor};
  }
`;

function Button({ onClick, children, BackColor='black', txtColor='white', hovColor='gray' }) {
  return (
    <StyledButton onClick={onClick} BackColor={BackColor} txtColor={txtColor} hovColor={hovColor}>
      {children}
    </StyledButton>
  );
}

export default Button;
