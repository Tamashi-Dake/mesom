import useFetchData from "./useFetchData";

const useCurrentUser = () => {
  const { data, isLoading, isError, error } = useFetchData(
    {
      key: "authUser",
      url: "/auth/me",
    },
    {}
  );

  return { data, isLoading, isError, error };
};

export default useCurrentUser;
