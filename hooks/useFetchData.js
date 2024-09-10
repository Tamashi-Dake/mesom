import { useQuery } from "@tanstack/react-query";
import api from "../src/helper/api";

// Hàm helper để GET dữ liệu với axios
const getData = async (props) => {
  const response = await api.get(props.url, {
    params: props.params || {},
    withCredentials: true, // BẮT BUỘC PHẢI CÓ ĐỂ SỬ DỤNG COOKIE
  });
  return response.data;
};

// Hook sử dụng useQuery cho GET request
const useFetchData = (props, options) => {
  return useQuery({
    queryKey: [props.key, props.url, props.params],
    queryFn: () => getData(props),
    staleTime: options?.staleTime || 0,
    cacheTime: options?.cacheTime || 0,
  });
};

export default useFetchData;
