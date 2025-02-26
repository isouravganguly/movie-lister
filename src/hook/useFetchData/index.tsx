import {useEffect, useState} from 'react';
import Config from 'react-native-config';

export const useFetchData = search_keyword => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const KEY = Config.KEY;
  console.log({KEY});

  const fetchData = async () => {
    console.log('fetchData');
    setLoading(true);
    setData(null);
    setError(null);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${search_keyword}&apikey=${KEY}`,
      );
      const response_data = await response.json();
      console.log({response_data});
      if (response_data?.Response === 'True') {
        console.log('data fetched here:', response_data.Search);
        setData(response_data.Search);
      } else {
        console.log('Data not feteched!', response_data.error);
        setError(response_data.Error);
      }
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search_keyword !== '') {
      //Need check for '', and not for 0 or false
      fetchData();
    }
  }, [search_keyword]);

  return {data, error, loading};
};
