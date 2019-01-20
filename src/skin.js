import styled from "styled-components";
import { Container as BsContainer } from "styled-bootstrap-grid";

export const Container = styled(BsContainer)`
  margin-bottom: 80px;
`;

export const SmallText = styled.span`
  color: ${({ theme }) => theme.colorSet.secondary};
  font-size: 11px;
  font-weight: 200;
  display: block;
  min-height: ${({ isCappMessaged }) => (isCappMessaged ? "52px" : "inherit")};
  ${({ isCappMessaged }) => isCappMessaged && "margin: 10px 0"};
`;

export const ResetData = styled.a`
  cursor: pointer;
  margin-left: 10px;
  background: #ddd;
  color: ${({ theme }) => theme.colorSet.darker};
  padding: 5px;
  font-weight: 300;
  border-radius: 0.25rem;
  ${({ theme }) => theme.affects.buttonClick()};

  &:hover {
    background: ${({ theme }) => theme.colorSet.grey};
  }
`;

export const Input = styled.input`
  background: #ddd;
  border: 0;
  color: ${({ theme }) => theme.colorSet.dark};
  font-size: ${({ isExitInput }) => (isExitInput ? "16px" : "12px")};
  font-weight: 300;
  font-family: inherit;
  position: relative;
  padding: 10px;
  width: 200px;
  height: 29px;
  -webkit-appearance: none;
  border-radius: 0.25rem;
  &:focus {
    outline: 0;
    background-color: ${({ theme }) => theme.colorSet.grey};
  }
`;

export const Summary = styled.div`
  font-weight: normal;
  background: ${({ theme }) => theme.colorSet.whitest};
  padding: 5px 15px;
  min-width: 310px;
  ${({ theme }) => theme.elements.boxShadow()}
  big {
    font-size: 20px;
    font-weight: 900;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 10px 0;
    flex-wrap: wrap;
  }

  h3 {
    margin: 0;
  }

  span {
    flex-basis: 100%;
    display: flex;
  }
`;

export const ContentCenter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: ${({ alignItem }) => (alignItem ? alignItem : "top")};
  margin-top: 20px;
`;
