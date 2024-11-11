import { useState, useEffect } from 'react';
import { fetchCharacters } from '../api/charactersApi';

export const useFetchCharacters = (page, search) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      try {
        const data = await fetchCharacters(page, search);
        setCharacters((prev) => [...prev, ...data.results]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    loadCharacters();
  }, [page, search]);

  return { characters, loading, error };
};