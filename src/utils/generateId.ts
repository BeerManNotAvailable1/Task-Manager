export const generateId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  const segment = () => Math.random().toString(16).slice(2, 6);
  return `${segment()}-${segment()}-${segment()}`;
};

