import React from "react";
import styled from "styled-components";


const ChangeBox = styled.div`
  display: flex;  
`;
const Horizon = styled.div`
  width: 100%;
  border-bottom: 2px solid #d9d9d9;
  line-height: 0.1rem;
  margin: 10px 0 20px;
`;

function ManageBox({
  onClick,
  title,
  content,
  visible = true,
}) {
  return (
    <div>
      <p className="left boldContent">{title}</p>
      <ChangeBox>
        <p className="caption">{content}</p>
        {visible && (
          <input type="image" src="/img/fix.png" onClick={onClick}></input>
        )}
      </ChangeBox>
      <Horizon></Horizon>
    </div>
  );
}

export default ManageBox;
