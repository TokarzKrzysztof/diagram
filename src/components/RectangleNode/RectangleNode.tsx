import { FC, useEffect, useRef, useState } from "react";
import { useRectangles } from "../../store";
import { Rectangle } from "../../types";
import { Dragable } from "../shared";
import { RectResizeDots } from "./RectResizeDots/RectResizeDots";
import { TextNode } from "./TextNode/TextNode";

interface Props {
  data: Rectangle;
  onSetActive: () => void;
}

export const RectangleNode: FC<Props> = ({ data, onSetActive }) => {
  // const { updateRect } = useRectangles();
  const ref = useRef<SVGSVGElement>(null);
  const [config, setConfig] = useState<Rectangle>(data);
  const [isEditText, setIsEditText] = useState(false);

  useEffect(() => {
    console.log("setconfig")
    setConfig(data);
  }, [data.isActive]);

  useEffect(() => {
    // console.log("zmiana")
  }, [data.isActive])

  // useEffect(() => {
  //   updateRect(data.id, config);
  // }, [data.isActive]);

  const handleMove = (e: MouseEvent) => {
    // const rect = ref.current as SVGSVGElement;
    setConfig({...config, y: config.y + e.movementY, x: config.x + e.movementX })
    // setConfig((prev) => {
    //   return { ...prev, y: prev.y + e.movementY, x: prev.x + e.movementX };
    // });
  };

  const handleTextEdit = (value: string) => {
    setConfig({ ...config, text: value });
    setIsEditText(false);
  };

  return (
    <Dragable onMove={handleMove} onMouseDown={onSetActive}>
      <svg
        ref={ref}
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
        {config.isActive && (
          <RectResizeDots config={config} onSetConfig={setConfig} />
        )}
      </svg>
    </Dragable>
  );
};
