import styled, { css } from 'styled-components';
import {theme} from './theme';

// 공통 텍스트 스타일 정의
const titleStyle = css`
    font-size: 24px;
    font-weight: 600;
`;

const subTitleStyle = css`
    font-size: 20px;
    font-weight: 400;
`;

const contentStyle = css`
    font-size: 16px;
    font-weight: 400;
`;
const userNameStyle = css`
    font-size: 16px;
    font-weight: 600;
`;
const captionStyle = css`
    font-size: 14px;
    font-weight: 400;
`;

const profileEllipseStyle = css`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    padding: 10px;
`;

const profileEllipseDefaultStyle = css`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: theme.gray;
  
`;


export const Title = styled.h1`
    ${titleStyle}
`;

export const SubTitle = styled.h2`
    ${subTitleStyle}
`;

export const Content = styled.p`
    ${contentStyle}
`;
export const Username = styled.span`
    ${userNameStyle}
`;
export const Caption = styled.span`
    ${captionStyle}
`;

export const ProfileEllipse = styled.img`
    ${profileEllipseStyle}
`;

export const ProfileEllipseDefaultStyle = styled.div`
    ${profileEllipseDefaultStyle}
`;
