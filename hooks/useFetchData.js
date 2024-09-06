import { useQuery } from "react-query";
import api from "../src/helper/api";

// Fetch data from the API
const fetchData = async (endpoint) => {
  const response = await api.get(endpoint);
  return response.data;
};

const useFetchData = (endpoint) => {
  return useQuery(["fetchData", endpoint], () => fetchData(endpoint));
};

// const FetchDataComponent = ({ endpoint }) => {
//   const { data, isLoading, isError, error } = useFetchData(endpoint);

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <h1>Data</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

export default useFetchData;
