import { useEffect, useState } from 'react';

export const useFetch = (fn) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fn();
        console.log(response);
        setData(response);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const refetch = async () => fetchData();

  return { data, loading, refetch, error };
};
