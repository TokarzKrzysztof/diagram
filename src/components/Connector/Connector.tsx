import { FC, useState } from "react";
import styled from "styled-components";
import { ConModel } from "../../models/ConModel";
import { Dragable } from "../shared/Dragable/Dragable";

const StyledDiv = styled.div`
  height: 10px;

  ::before {
    background-color: white;
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    top: 50%;
    transform: translateY(-50%);
  }
  ::after {
    content: "";
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 10px solid white;
  }
`;

interface Props {}

export const Connector: FC<Props> = () => {
  const [config, setConfig] = useState<ConModel>({
    top: 100,
    left: 200,
    width: 100,
  });
  const [isActive, setIsActive] = useState(false);

  const handleUpdatePosition = (top: number, left: number) => {
    setConfig((prev) => {
      return { ...prev, top, left };
    });
  };

  return (
    <Dragable
      top={config.top}
      left={config.left}
      onUpdatePosition={handleUpdatePosition}
      onMouseDown={() => setIsActive(true)}
    >
      <StyledDiv style={config}></StyledDiv>
    </Dragable>
  );
};
