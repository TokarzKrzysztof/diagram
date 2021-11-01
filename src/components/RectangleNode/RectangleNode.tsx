import { FC, useState } from "react";
import { Rectangle } from "../../types";
import { Dragable } from "../shared";
import { RectResizeDots } from "./RectResizeDots/RectResizeDots";
import { TextNode } from "./TextNode/TextNode";

interface Props {}

export const RectangleNode: FC<Props> = () => {
  const [config, setConfig] = useState<Rectangle>({
    y: 0,
    x: 0,
    width: 100,
    height: 50,
    text: "Test dlugi dlugi dlugi dlugi dlugi",
  });
  const [isActive, setIsActive] = useState(false);
  const [isEditText, setIsEditText] = useState(false);

  const handleMove = (e: MouseEvent) => {
    setConfig((prev) => {
      return { ...prev, y: prev.y + e.movementY, x: prev.x + e.movementX };
    });
  };

  const handleTextEdit = (value: string) => {
    setConfig({ ...config, text: value });
    setIsEditText(false);
  };

  return (
    <Dragable onMove={handleMove} onMouseDown={() => setIsActive(true)}>
      <svg
        x={config.x}
        y={config.y}
        width={config.width}
        height={config.height}
        overflow={"visible"}
        onDoubleClick={() => setIsEditText(!isEditText)}
      >
        <rect width={"100%"} height={"100%"} stroke={"white"} strokeWidth={2} />
        <TextNode
          value={config.text}
          isEditing={isEditText}
          onAccept={handleTextEdit}
        />
        {isActive && <RectResizeDots config={config} onSetConfig={setConfig} />}
      </svg>
    </Dragable>
  );
};
