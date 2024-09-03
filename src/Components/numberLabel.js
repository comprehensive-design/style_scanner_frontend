import React from 'react';
import styled from 'styled-components'

const StyledNumberLabel = styled.p`
  display: inline-block;
  padding: 5px;
  font-size: 14px;
  text-align: center;
  font-weight: 600;
  color: #808080 ;
  background-color: white;
  border-radius: 10px;
  opacity: 0.8;
`;

function NumberLabel({currentPage, pageLength}){
  return (
    <StyledNumberLabel>{currentPage}/{pageLength}
    </StyledNumberLabel>
  );
}

export default NumberLabel;
