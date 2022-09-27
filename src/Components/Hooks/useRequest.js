import { useCallback, useState } from "react";

const useRequest = (dataHandler) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const request = useCallback(
    async (configData) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://stopwatch-d89dc-default-rtdb.firebaseio.com/userdata.json",
          {
            method: configData.method ?? "GET",
            body: configData.body ? JSON.stringify(configData.body) : null,
            headers: configData.headers,
          }
        );

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        dataHandler(data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    [dataHandler, error]
  );
  return [error, isLoading, request];
};
export default useRequest;
