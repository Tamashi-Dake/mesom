import { useMutation } from "@tanstack/react-query";
import api from "../src/helper/api";

// Hàm helper để POST dữ liệu với axios
const postData = async (props) => {
  const response = await api.post(props.url, props.data, {
    params: props.params || {},
    withCredentials: true,
  });

  return response.data;
};

// Hook sử dụng useMutation cho POST request
const usePostData = () => {
  return useMutation({ mutationFn: (props) => postData(props) });
};

export default usePostData;
