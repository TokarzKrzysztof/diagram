export const getNumberAtrributes = (
  ref: React.RefObject<SVGElement>,
  attributes: string[]
) => {
  const result: number[] = [];
  attributes.forEach((attr) => {
    const value = ref.current?.getAttribute(attr);
    if (!value) {
      throw new Error("Value from attr " + attr + " not found");
    }

    result.push(+value);
  });
  return result;
};
