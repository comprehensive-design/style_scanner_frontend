import React from "react";
import { HashLoader } from "react-spinners";
import styled from 'styled-components';
import  '../../style/style.css';

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
            <p className="subTitle mb05">잠시만 기다려주세요!</p>
            <br></br>
            <HashLoader />
        </LoadingDiv>
    );
};

export default Loading;
