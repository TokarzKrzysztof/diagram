import { FC } from "react";
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
  color: white;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 14px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

interface Props {
  isEditing: boolean;
  onAccept: (value: string) => void;
  value?: string;
}

export const TextNode: FC<Props> = ({ isEditing, value, onAccept }) => {
  return (
    <foreignObject x="0" y="0" width="100%" height="100%">
      {isEditing ? (
        <StyledTextarea
          autoFocus
          onBlur={(e) => onAccept(e.target.value)}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseMove={(e) => e.stopPropagation()}
          defaultValue={value}
        />
      ) : (
        <StyledSpan>{value}</StyledSpan>
      )}
    </foreignObject>
  );
};
