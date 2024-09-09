import styled, { css } from 'styled-components';

// 공통 텍스트 스타일 정의
export const Title = styled.h1`
    font-size: 1.8em;
    font-weight: 600;
`;

export const SubTitle = styled.h2`
    font-size: 1.4em;
    font-weight: 400;
`;

export const Content = styled.p`
    font-size: 1.2em;
    font-weight: 400;
`;

export const BoldContent = styled.span`
    font-size: 1.1em;
    font-weight: 600;
`;
//14px임
export const Caption = styled.span`
    font-size: 1em;
    font-weight: 400;
`;

//프로필사진
export const ProfileEllipse = styled.img`
    font-size: 10px;
    width: 4.8em;
    height: 4.8em;
    border-radius: 50%;
    padding: 1em;
`;
//프로필 없을 때, 기본 프로필 사진
export const ProfileEllipseDefault = styled.div`
    font-size: 10px;
    width: 4.8em;
    height: 4.8em;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.gray};
    margin: 1em;
`;
//홈 화면 이모티콘+타이틀
export const HomeTitleDiv = styled.div`
    font-size: 10px;
    width: 100%;
    height: 3em;
    display: flex;
    align-items: center;
    float: left;
    margin: 2em 3em;
`;
//컴포넌트 최상단 wrapper
export const MainWrapper = styled.div`
    width: 100%;
    height: 100%;
    align-items: center;
`;
