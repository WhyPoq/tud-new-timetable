import { useEffect, useState } from "react";

export const useFetch = (url, req) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() =>{
        const fetchData = async () => {
            setIsPending(true);
            try {
              const response = await fetch(url, req);
        
              if (!response.ok) throw new Error(response.statusText);
              const json = await response.json();
        
              setIsPending(false);
              setData(json);
              setError(null);
        
            }
            catch (error) {
              setError(`${error} Could not Fetch Data `);
              setIsPending(false);
            }
        }
        fetchData();
    }, [url, req])

  return [data, isPending, error];
};