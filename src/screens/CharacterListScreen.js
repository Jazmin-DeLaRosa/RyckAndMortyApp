import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import CharacterCard from '../components/CharacterCard';
import { fetchCharacters } from '../api/charactersApi';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FavoritesContext } from '../context/FavoritesContext';
import { theme } from '../styles/theme';

const CharacterListScreen = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [showPaginationBar, setShowPaginationBar] = useState(false);

  const { addFavorite } = useContext(FavoritesContext);
  const opacityAnim = useState(new Animated.Value(0))[0];
  const flatListRef = useRef(null);

  const loadCharacters = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchCharacters(page, search, 10);
      if (data.results && data.results.length > 0) {
        setCharacters(data.results);
        setHasMore(data.info.next !== null);
      } else {
        setCharacters([]);
        setHasMore(false);
      }
    } catch (e) {
      setError('Error loading characters');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters();
  }, [page, search]);

  const goToNextPage = () => {
    hidePaginationBar();
    setPage(prevPage => prevPage + 1);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const goToPreviousPage = () => {
    hidePaginationBar();
    setPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const displayPaginationBar = () => {
    setShowPaginationBar(true);
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: Platform.OS === 'ios' ? 500 : 300, // Duración variable según el sistema operativo
      useNativeDriver: true,
    }).start();
  };

  const hidePaginationBar = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: Platform.OS === 'ios' ? 500 : 300, // Duración variable según el sistema operativo
      useNativeDriver: true,
    }).start(() => setShowPaginationBar(false));
  };

  const handleEndReached = () => {
    if (hasMore && !loading) {
      displayPaginationBar();
    }
  };

  return (
    <View style={theme.characterListStyles.container}>
      <TextInput
        placeholder="Buscar Personaje..."
        placeholderTextColor={theme.colors.textSecondary}
        value={search}
        onChangeText={text => {
          setSearch(text);
          setPage(1);
          setHasMore(true);
        }}
        style={theme.characterListStyles.searchInput}
      />
      {error && <Text style={theme.characterListStyles.errorText}>{error}</Text>}

      <FlatList
        ref={flatListRef}
        data={characters}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={() => navigation.navigate('CharacterDetail', { character: item })}
            onFavoritePress={() => addFavorite(item)}
          />
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          !loading && characters.length === 0 ? (
            <Text style={theme.characterListStyles.noResultsText}>No characters found.</Text>
          ) : null
        }
        ListFooterComponent={<View style={{ height: 60 }} />}
      />

      {showPaginationBar && (
        <Animated.View style={[theme.characterListStyles.paginationBar, { opacity: opacityAnim }]}>
          <TouchableOpacity onPress={goToPreviousPage} disabled={page === 1}>
            <MaterialIcons name="chevron-left" size={28} color={page === 1 ? theme.colors.textSecondary : theme.colors.accent} />
          </TouchableOpacity>
          <Text style={theme.characterListStyles.pageNumber}>Page {page}</Text>
          <TouchableOpacity onPress={goToNextPage} disabled={!hasMore}>
            <MaterialIcons name="chevron-right" size={28} color={!hasMore ? theme.colors.textSecondary : theme.colors.accent} />
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default CharacterListScreen;