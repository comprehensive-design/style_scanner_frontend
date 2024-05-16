import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ScrollButton = styled.button`
  position: fixed;
  top: 0;
  background-color: rgba(255, 255, 255, 0.5);
  color: white;
  cursor: pointer;
  padding: 10px;
  border: none;
  width: 10%;
  height: 100%;
  text-align: center;
  border-radius: 50px;
  transition: opacity 0.3s ease;
  z-index: 888;
`;

const LeftScrollButton = styled(ScrollButton)`
  left: 0;
  opacity: ${(props) => (props.show ? 1 : 0)};
  pointer-events: ${(props) => (props.show ? 'auto' : 'none')};
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
  }
`;

const RightScrollButton = styled(ScrollButton)`
  right: 0;
  opacity: ${(props) => (props.show ? 1 : 0)};
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
  }
`;

const MousePositionIndicator = () => {
  const [mousePosition, setMousePosition] = useState(null);
  const [scrollCount, setScrollCount] = useState(0);
  const [leftButtonClickCount, setLeftButtonClickCount] = useState(0);
  const [rightButtonClickCount, setRightButtonClickCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollCount((prevCount) => prevCount + 1);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const screenWidth = window.innerWidth;
      const mouseX = event.clientX;

      if (mouseX < screenWidth / 3) {
        setMousePosition('왼쪽');
      } else if (mouseX > screenWidth * 2 / 3) {
        setMousePosition('오른쪽');
      } else {
        setMousePosition('중앙');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleScrollLeft = () => {
    window.scrollBy({ left: -380, behavior: 'smooth' });
    setLeftButtonClickCount((prevCount) => prevCount + 1);
  };

  const handleScrollRight = () => {
    window.scrollBy({ left: 380, behavior: 'smooth' });
    setRightButtonClickCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <LeftScrollButton show={scrollCount>0 && leftButtonClickCount !== rightButtonClickCount && mousePosition === '왼쪽'} onClick={handleScrollLeft}>
        {'<'}
      </LeftScrollButton>
      <RightScrollButton show={mousePosition === '오른쪽'} onClick={handleScrollRight}>
        {'>'}
      </RightScrollButton>
    </>
  );
};

export default MousePositionIndicator;
