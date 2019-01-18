import styled, { css } from "styled-components";

const commonButtonCss = () => css`
  border-radius: 25%;
  height: 20px;
  width: 20px;
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
  margin: 0 10px;
  position: relative;
  transition: all 0.3s;

  &:active {
    outline: 0;
    top: 1px;
  }
  &:hover {
    opacity: 0.8;
  }
`;

export const AddButton = styled.div`
  background: ${({ theme }) => theme.colorSet.success};
  ${commonButtonCss()}
`;

export const RemoveButton = styled.div`
  background: ${({ theme }) => theme.colorSet.danger};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.6 : 1)};
  pointer-events: ${({ isDisabled }) => (isDisabled ? "none" : "all")};
  ${commonButtonCss()};
`;

export const ShareHolder = styled.div`
  margin: 20px;
  padding: 20px;
  ${({ theme }) => theme.elements.boxShadow()}
  transition: transform 0.3s;
  width: 210px;
`;

export const VariablesWrapper = styled.div`
  margin-top: 20px;
`;

export const Variable = styled.div`
  margin: 5px 0 0 0;
  display: flex;
  justify-content: space-between;
`;

export const Result = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  align-items: flex-end;
  padding-top: 15px;
  &:last-of-type {
    margin-bottom: 20px;
  }
`;

export const Data = styled.strong`
  color: ${({ color, theme }) => theme.colorSet[color]};
`;

export const Title = styled.h2`
  text-align: center;
`;

export const UserInputNumber = styled.span`
  width: 7px;
  display: inline-flex;
  justify-content: center;
`;

export const UserInteractionWrapper = styled.div`
  display: flex;
`;
