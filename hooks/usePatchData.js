import { useMutation } from "@tanstack/react-query";
import api from "../src/helper/api";

// Hàm helper để PATCH dữ liệu với axios
const patchData = async (props) => {
  const response = await api.patch(props.url, props.data, {
    params: props.params || {},
    withCredentials: true,
  });
  return response.data;
};

// Hook sử dụng useMutation cho PATCH request
const usePatchData = (options) => {
  return useMutation({
    mutationFn: (props) => patchData(props),
    ...options,
  });
};

export default usePatchData;
