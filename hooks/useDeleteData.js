import { useMutation } from "@tanstack/react-query";
import api from "../src/helper/api";

// Hàm helper để DELETE dữ liệu với axios
const deleteData = async (props) => {
  const response = await api.delete(props.url, { params: props.params || {} });
  return response.data;
};

// Hook sử dụng useMutation cho DELETE request
const useDeleteData = (options) => {
  return useMutation({
    mutationFn: (props) => deleteData(props),
    ...options,
  });
};

export default useDeleteData;
