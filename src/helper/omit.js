// obj: object, keys: array

// Hàm lược bỏ các key trong object
export const omit = (obj, keys) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key))
  );
};

// Hàm chọn các key trong object
export const select = (obj, keys) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => keys.includes(key))
  );
};
