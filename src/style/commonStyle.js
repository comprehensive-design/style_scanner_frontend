import styled, { css } from 'styled-components';

// 공통 텍스트 스타일 정의
const titleStyle = css`
    font-size: 1.6em;
    font-weight: 600;
`;

const subTitleStyle = css`
    font-size: 1.4em;
    font-weight: 400;
`;

const contentStyle = css`
    font-size: 1.2em;
    font-weight: 400;
`;
const boldContentStyle = css`
    font-size: 1.1em;
    font-weight: 600;
`;
const captionStyle = css`
    font-size: 1em;
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
    background-color: ${({ theme }) => theme.colors.gray};
    margin: 10px;
  
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
export const BoldContent = styled.span`
    ${boldContentStyle}
`;
export const Caption = styled.span`
    ${captionStyle}
`;

export const ProfileEllipse = styled.img`
    ${profileEllipseStyle}
`;

export const ProfileEllipseDefault = styled.div`
    ${profileEllipseDefaultStyle}
`;
