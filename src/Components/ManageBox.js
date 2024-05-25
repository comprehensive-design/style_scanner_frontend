import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    top: ${props => props.top};
    left: ${props => props.left};
    position: absolute;
    width: 45%;
    height: 30%;
`;

const ChangeBox = styled.div`
    display: flex;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 5px;
    position: relative;
    `;
const Horizon = styled.div`
        width: 100%;
        border-Bottom: 2px solid #aaa;
        line-height: 0.1em;
        margin: 10px 0 20px;
`;

function ManageBox({ onClick, title, content, visible = true, top = '0px', left = '0px' }) {

    return (
        <StyledDiv top={top} left={left}>
            <p>{title}</p>
            <ChangeBox>
                <p>{content}</p>
                {visible && <input type="image" src="/img/fix.png" onClick={onClick}></input>}
            </ChangeBox>
            <Horizon></Horizon>
        </StyledDiv>
    );
}

export default ManageBox;
