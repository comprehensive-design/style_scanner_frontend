import React from "react";
import { HashLoader } from "react-spinners";
import { BoldContent } from '../../style/commonStyle';
import styled from 'styled-components';

const LoadingDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Loading = () => {
    return (
        <LoadingDiv>
            <BoldContent>잠시만 기다려주세요!</BoldContent>
            <br></br>
            <HashLoader />
        </LoadingDiv>
    );
};

export default Loading;
