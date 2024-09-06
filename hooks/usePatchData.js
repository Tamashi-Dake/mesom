import { useMutation } from "react-query";
import api from "../api";

const patchData = async ({ endpoint, updatedData }) => {
  const response = await api.patch(endpoint, updatedData);
  return response.data;
};

const usePatchData = () => {
  return useMutation(({ endpoint, updatedData }) =>
    patchData({ endpoint, updatedData })
  );
};

// const PatchDataComponent = ({ endpoint }) => {
//     const [updatedData, setUpdatedData] = useState({ id: 1, name: 'Updated Name' });
//     const { mutate, isLoading, isError, error } = usePatchData();

//     const handleSubmit = () => {
//       mutate({ endpoint, updatedData });
//     };

//     if (isLoading) return <div>Updating...</div>;
//     if (isError) return <div>Error: {error.message}</div>;

//     return (
//       <div>
//         <button onClick={handleSubmit}>Update Data</button>
//       </div>
//     );
//   };

export default usePatchData;
