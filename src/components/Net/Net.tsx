import { FC, ReactNode, useEffect, useRef } from "react";
import { useSVGRoot } from "../../store";

interface Props {
  children: ReactNode;
}

export const Net: FC<Props> = ({ children }) => {
  const { setSVG } = useSVGRoot();
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (ref.current) setSVG(ref.current);
  }, [ref.current]);

  return (
    <svg
      ref={ref}
      overflow={"auto"}
      width={600}
      height={800}
      style={{ border: "1px solid white" }}
    >
      {children}
    </svg>
  );
};
