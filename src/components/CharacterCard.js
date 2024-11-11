import React, {useContext, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import {FavoritesContext} from '../context/FavoritesContext';
import {theme} from '../styles/theme';

const CharacterCard = ({character, onPress, onFavoritePress}) => {
  const {favorites} = useContext(FavoritesContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.some(fav => fav.id === character.id));
  }, [favorites]);

  const handleAddToFavorites = () => {
    onFavoritePress();
    showAddToFavoritesAlert();
  };

  const showAddToFavoritesAlert = () => {
    Alert.alert(
      'Agregado a Favoritos!',
      `${character.name} se ha añadido a tus favoritos.`,
      [{text: 'OK', onPress: () => {}}],
    );
  };

  return (
    <View style={theme.characterCardStyles.card}>
      <TouchableOpacity
        style={theme.characterCardStyles.cardContent}
        onPress={onPress}>
        <Image
          source={{uri: character.image}}
          style={theme.characterCardStyles.image}
        />
        <Text style={theme.characterCardStyles.name}>{character.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          theme.characterCardStyles.favoriteButton,
          isFavorite && theme.characterCardStyles.disabledButton,
        ]}
        onPress={isFavorite ? null : handleAddToFavorites}
        disabled={isFavorite}>
        <Text style={theme.characterCardStyles.favoriteButtonText}>
          {isFavorite ? 'Agregado a Favoritos' : 'Agregar a Favoritos'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CharacterCard;
