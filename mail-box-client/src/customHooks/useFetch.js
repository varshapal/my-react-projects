import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    };

    fetchData();

    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
    }, [url]);

    return [data];
};

export default useFetch;