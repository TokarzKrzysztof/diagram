import { FC, ReactNode } from "react";
import styled from "styled-components";
import background from "../../assets/img/background.jpg";

const StyledNet = styled.div`
  position: relative;
  width: 400px;
  height: 300px;
  border: 1px solid white;
  /* background-image: url(${background}); */
`;

interface Props {
  children: ReactNode;
}

export const Net: FC<Props> = ({ children }) => {
  return <StyledNet>{children}</StyledNet>;
};
