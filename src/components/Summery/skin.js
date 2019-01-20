import styled from "styled-components";

export const SmallText = styled.div`
  color: ${({ theme }) => theme.colorSet.secondary};
  font-size: 11px;
  font-weight: 200;
  min-height: ${({ isCappMessaged }) => (isCappMessaged ? "52px" : "inherit")};
  ${({ isCappMessaged }) => isCappMessaged && "margin: 10px 0"};
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

  span {
    flex-basis: 100%;
    display: flex;
  }
`;

export const ToolTip = styled.div`
  position: absolute;
  width: 150px;
  top: 34px;
  left: -67px;
  color: ${({ theme }) => theme.colorSet.dark};
  background: ${({ theme }) => theme.colorSet.grey};
  padding: 6px;
  z-index: 2;
  border: 2px solid #ccc;
  display: none;
  text-align: center;
  &:after,
  &:before {
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-color: rgba(238, 238, 238, 0);
    border-bottom-color: #ccc;
    border-width: 10px;
    margin-left: -10px;
  }
  &:before {
    border-color: rgba(221, 221, 221, 0);
    border-bottom-color: #ccc;
    border-width: 12px;
    margin-left: -12px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 10px 0;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  flex: 22 0;
  h3,
  h4 {
    margin: 0;
  }
`;

export const HoverableArea = styled.div`
  cursor: pointer;
  display: flex;
  flex: 1 5%;
  position: relative;
  &:hover {
    ${ToolTip} {
      display: block;
    }
  }
`;
