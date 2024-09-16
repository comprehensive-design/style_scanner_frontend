import React from "react";
import { HashLoader } from "react-spinners";
import styled from 'styled-components';
import  '../../style/style.css';

const LoadingDiv = styled.div`
    width: 100%;
    height:70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Loading = () => {
    return (
        <LoadingDiv>
            <HashLoader />
        </LoadingDiv>
    );
};

export default Loading;
