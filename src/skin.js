import styled from "styled-components";
import { Container as BsContainer } from "styled-bootstrap-grid";

export const Container = styled(BsContainer)`
  margin-bottom: 80px;
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

export const ContentCenter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: ${({ alignItem }) => (alignItem ? alignItem : "top")};
  margin-top: 20px;
`;
