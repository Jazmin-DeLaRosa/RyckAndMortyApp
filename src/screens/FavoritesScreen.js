import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';

const FavoritesScreen = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const navigation = useNavigation();

  const renderFavoriteCharacter = ({ item }) => (
    <View style={theme.favoritesScreenStyles.card}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Home', {
            screen: 'CharacterDetail',
            params: { character: item, fromScreen: 'Favorites' },
          })
        }>
        <Text style={theme.favoritesScreenStyles.name}>{item.name}</Text>
      </TouchableOpacity>
      <Text style={theme.favoritesScreenStyles.details}>Status: {item.status}</Text>
      <Text style={theme.favoritesScreenStyles.details}>Species: {item.species}</Text>
      <TouchableOpacity
        style={theme.favoritesScreenStyles.removeButton}
        onPress={() => removeFavorite(item.id)}>
        <Text style={theme.favoritesScreenStyles.removeButtonText}>Eliminar de favoritos</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={theme.favoritesScreenStyles.container}>
      {favorites.length === 0 ? (
        <Text style={theme.favoritesScreenStyles.noFavoritesText}>No hay favoritos añadidos todavía.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFavoriteCharacter}
          contentContainerStyle={{ paddingBottom: theme.spacing.large }}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;