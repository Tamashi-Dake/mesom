import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const useInfiniteScroll = (queryKey, queryFn, getNextPageParam) => {
  const {
    data,
    error,
    isError,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam,
    staleTime: 30000,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return {
    data,
    isError,
    error,
    isLoading,
    isFetchingNextPage,
    ref,
  };
};

export default useInfiniteScroll;
