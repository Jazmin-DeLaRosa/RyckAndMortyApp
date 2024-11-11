export const fetchCharacters = async (page = 1, search = '', limit = 10) => {
    const url = `https://rickandmortyapi.com/api/character?page=${page}&name=${search}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      data.results = data.results ? data.results.slice(0, limit) : [];
  
      return data;
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw error;
    }
  };