import { useMutation } from "react-query";
import api from "../api";

const deleteData = async (endpoint) => {
  await api.delete(endpoint);
};

const useDeleteData = () => {
  return useMutation(deleteData);
};

// const DeleteDataComponent = ({ endpoint }) => {
//     const { mutate, isLoading, isError, error } = useDeleteData();

//     const handleDelete = () => {
//       mutate(endpoint);
//     };

//     if (isLoading) return <div>Deleting...</div>;
//     if (isError) return <div>Error: {error.message}</div>;

//     return (
//       <div>
//         <button onClick={handleDelete}>Delete Data</button>
//       </div>
//     );
//   };

export default useDeleteData;
