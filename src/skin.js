import styled from "styled-components";
import { Container as BsContainer } from "styled-bootstrap-grid";

export const Container = styled(BsContainer)`
  margin-bottom: 80px;
`;

export const SmallText = styled.div`
  color: ${({ theme }) => theme.colorSet.secondary};
  font-size: 11px;
  font-weight: 200px;
`;

export const ResetData = styled.a`
  cursor: pointer;
  margin-left: 10px;
`;

export const Input = styled.input`
  background: transparent;
  border: 0;
  color: ${({ theme }) => theme.colorSet.dark};
  font-size: ${({ isExitInput }) => (isExitInput ? "16px" : "12px")};
  font-weight: 300;
  font-family: inherit;
  position: relative;
  padding: 10px;
  width: ${({ isExitInput }) => (isExitInput ? "200px" : "50px")};
  height: ${({ isExitInput }) => (isExitInput ? "20px" : "50px")};
  -webkit-appearance: none;
  &:focus {
    outline: 0;
    background-color: ${({ theme }) => theme.colorSet.grey};
    border-radius: 0.25rem;
  }
`;

export const ExitValueTitle = styled.h2`
  font-weight: normal;
  font-size: normal;
  big {
    font-size: 20px;
    font-weight: 900;
  }
`;

export const ContentCenter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: ${({ alignItem }) => (alignItem ? alignItem : "top")};
`;
