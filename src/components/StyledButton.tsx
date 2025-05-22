import React from "react";
import styled from "styled-components";

const Button = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <StyledWrapper>
      <button className={`button ${className}`}>
        <span>{children}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    position: relative;
    text-decoration: none;
    color: #fff;
    background: linear-gradient(45deg, #2c2422, #695226, #f1ecd5);
    padding: 14px 25px;
    border-radius: 10px;
    font-size: 1.25em;
    cursor: pointer;
  }

  .button span {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-direction: row;
    z-index: 1;
  }

  .button::before {
    content: "";
    position: absolute;
    inset: 1px;
    background: #272727;
    border-radius: 9px;
    transition: 0.5s;
  }

  .button:hover::before {
    opacity: 0.7;
  }

  .button::after {
    content: "";
    position: absolute;
    inset: 0px;
    background: linear-gradient(45deg, #2c2422, #695226, #f1ecd5);
    border-radius: 9px;
    transition: 0.5s;
    opacity: 0.7;
    filter: blur(20px);
  }

  .button:hover:after {
    opacity: 1;
  }
`;

export default Button;
