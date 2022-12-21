import styled from "styled-components";

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 12px;
    min-width: 200px;
`;

const Button = styled.button`
    border: 0;
    border-radius: 6px;
    padding: 6px;
    width: 72px;
    background: lightseagreen;
    color: white;
    cursor: pointer;
`;

const OverlayWrapper = styled.div`
    position: absolute;
    top: 12px;
    left: 12px;
    padding: "24px";
    background: "white";
    display: "flex";
    flexdirection: "column";
    alignitems: "center";
    gap: "16px";
    borderradius: "12px";
`;

const OverlayInner = styled.div`
    padding: "24px";
    background: "white";
    display: "flex";
    flexdirection: "column";
    alignitems: "center";
    gap: "16px";
    borderradius: "12px";
`;

const ContentsWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: gray;
`;

const Page = styled.div`
    height: 100vh;
`;

const Card = styled.div`
  padding: 24px 24px 24px 24px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px
  border-radius: 12px;
`;
export {
    ButtonWrapper,
    Button,
    OverlayWrapper,
    OverlayInner,
    ContentsWrapper,
    Page,
    Card,
};
