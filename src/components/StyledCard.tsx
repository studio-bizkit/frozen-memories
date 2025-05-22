import React from "react";
import styled from "styled-components";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledCardWrapper>
      <div className="card">
        <div className="card-content">{children}</div>
      </div>
    </StyledCardWrapper>
  );
};

const StyledCardWrapper = styled.div`
  .card {
    position: relative;
    background: linear-gradient(45deg, #2c2422, #695226, #f1ecd5);
    border-radius: 10px;
    padding: 24px;
    color: #fff;
    overflow: hidden;
    cursor: default;
    transition: transform 0.3s ease;
  }

  .card:hover {
    transform: scale(1.009);
  }

  .card::before {
    content: "";
    position: absolute;
    inset: 2px;
    background: #1f1f1f;
    border-radius: 5px;
    z-index: 0;
  }

  .card::after {
    content: "";
    position: absolute;
    inset: 0px;
    background: linear-gradient(45deg, #59574f, #695226, #2c2422);
    border-radius: 5px;
    opacity: 0.6;
    filter: blur(30px);
    z-index: 0;
    transition: 0.3s;
  }

  .card:hover::after {
    opacity: 0.8;
  }

  .card-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

export default Card;
