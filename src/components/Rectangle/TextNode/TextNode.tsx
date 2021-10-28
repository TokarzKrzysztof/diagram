import { FC, useEffect, useRef } from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  resize: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  height: 75%;
  font-family: sans-serif;
  font-size: 14px;
`;

const StyledSpan = styled.span`
  white-space: pre-wrap;
  word-break: break-all;
  color: white;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  height: 75%;
  overflow: hidden;
  font-size: 14px;
`;

interface Props {
  isEditing: boolean;
  onAccept: (value: string) => void;
  value?: string;
}

export const TextNode: FC<Props> = ({ isEditing, value, onAccept }) => {
  if (isEditing) {
    return (
      <StyledTextarea
        autoFocus
        onBlur={(e) => onAccept(e.target.value)}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseMove={(e) => e.stopPropagation()}
        defaultValue={value}
      />
    );
  }

  return <StyledSpan>{value}</StyledSpan>;
};
