import { useMutation } from "react-query";
import api from "../api";

const postData = async ({ endpoint, newData }) => {
  const response = await api.post(endpoint, newData);
  return response.data;
};

const usePostData = () => {
  return useMutation(({ endpoint, newData }) =>
    postData({ endpoint, newData })
  );
};

// const PostDataComponent = ({ endpoint }) => {
//     const [newData, setNewData] = useState({});
//     const { mutate, isLoading, isError, error } = usePostData();

//     const handleSubmit = () => {
//       mutate({ endpoint, newData });
//     };

//     if (isLoading) return <div>Submitting...</div>;
//     if (isError) return <div>Error: {error.message}</div>;

//     return (
//       <div>
//         <button onClick={handleSubmit}>Submit Data</button>
//       </div>
//     );
//   };

export default usePostData;
