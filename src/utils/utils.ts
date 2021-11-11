export const singleOrError = <T>(collection: T[], predicate: (el: T) => boolean) => {
  const el = collection.find(predicate);
  if (!el) throw new Error(`Element not found`);
  return el;
};
