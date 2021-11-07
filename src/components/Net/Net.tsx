import { FC, ReactNode, useEffect, useRef } from "react";
import { useSVGRoot } from "../../store";

interface Props {
  children: ReactNode;
}

export const Net: FC<Props> = ({ children }) => {
  const { setSVG } = useSVGRoot();
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (ref.current) {
      setSVG(ref.current);
    }
  }, [ref.current]);

  const box = ref.current ? ref.current.getBBox() : null;
  return (
    // <div style={{ width: 1000, height: 1000, overflow: "auto" }}>
    <svg
      ref={ref}
      width={1000}
      height={ 800}
      style={{ border: "1px solid white", overflow: "auto" }}
    >
      {children}
    </svg>
    // </div>
  );
};
