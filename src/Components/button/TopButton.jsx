import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LuArrowUpFromLine } from "react-icons/lu";

export default function TopButton() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    showButton && (
      <TopButtonWrapper>
        <div
          className="carousel boxShadow"
          onClick={scrollToTop}
          style={{ width: "4rem", height: "4rem" }}
        >
          <LuArrowUpFromLine size="1.5rem" />
        </div>
      </TopButtonWrapper>
    )
  );
}
export const TopButtonWrapper = styled.div`
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 1;
`;
