import styled, { css } from "styled-components";

const commonButtonCss = () => css`
  border-radius: 25%;
  height: 20px;
  width: 20px;
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  color: ${({ theme }) => theme.colorSet.white};
  position: relative;
  ${({ theme }) => theme.affects.buttonClick()}
  ${({ theme }) => theme.affects.buttonHover()}
`;

export const AddButton = styled.div`
  background: ${({ theme }) => theme.colorSet.success};
  margin-left: 10px;
  ${commonButtonCss()}
`;

export const RemoveButton = styled.div`
  background: ${({ theme }) => theme.colorSet.danger};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.6 : 1)};
  pointer-events: ${({ isDisabled }) => (isDisabled ? "none" : "all")};
  margin-right: 10px;
  ${commonButtonCss()};
`;

export const ShareHolder = styled.div`
  margin: 0 20px;
  padding: 20px;
  width: 260px;
  min-height: 415px;
  position: relative;
  ${({ theme }) => theme.elements.boxShadow()}
  background: ${({ theme }) => theme.colorSet.whitest};  
`;

export const VariablesWrapper = styled.div`
  margin-top: 20px;
  position: relative;
`;

export const Variable = styled.div`
  margin: 5px 0 0 0;
  display: flex;
  justify-content: space-between;
`;

export const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  align-items: center;
  padding: 8px 0;
  &:last-of-type {
    margin-bottom: 20px;
  }
  span {
    display: flex;
    flex: 10 0;
  }
`;

export const Data = styled.strong`
  color: ${({ color, theme }) => theme.colorSet[color]};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "left")};
`;

export const Title = styled.h2`
  text-align: center;
  margin: 0;
`;

export const UserInputNumber = styled.span`
  width: 7px;
  display: inline-flex;
  justify-content: center;
  font-weight: 900;
  font-size: 12px;
  align-items: center;
`;

export const UserInteractionWrapper = styled.div`
  display: flex;
`;

export const ConvertButton = styled.div`
  background: ${({ theme, hasConverted }) =>
    hasConverted ? theme.colorSet.warning : theme.colorSet.success};
  color: ${({ theme }) => theme.colorSet.whitest};
  border-radius: 0.25rem;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 900;
  height: 35px;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  display: flex;
  transition: 0.3s;
  ${({ theme }) => theme.elements.boxShadow()}
  ${({ theme }) => theme.affects.buttonClick()}
  ${({ theme }) => theme.affects.buttonHover()}
`;

export const OverLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 95px;
  background: ${({ theme }) => theme.colorSet.whitest};
  z-index: 1;
  opacity: ${({ isVisible }) => (isVisible ? 0 : 1)};
  transition: opacity 0.3s;
`;
