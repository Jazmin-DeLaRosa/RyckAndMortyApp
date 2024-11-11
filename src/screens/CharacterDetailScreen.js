import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { theme } from '../styles/theme';

const CharacterDetailScreen = () => {
  const { character, fromScreen } = useRoute().params;
  const { favorites, addFavorite } = useContext(FavoritesContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigation = useNavigation();
  const toastOpacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav.id === character.id));
  }, [favorites]);

  const handleAddToFavorites = () => {
    if (!isFavorite) {
      addFavorite(character);
      setIsFavorite(true);
      showFavoriteAddedToast();
    }
  };

  const showFavoriteAddedToast = () => {
    setShowToast(true);
    Animated.timing(toastOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(toastOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setShowToast(false));
      }, 2000);
    });
  };

  const handleGoBack = () => {
    if (fromScreen === 'Favorites') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Favorites' }],
      });
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleGoBack} style={{ paddingHorizontal: 15 }}>
          <Text style={{ color: '#007AFF' }}>Atras</Text>
        </TouchableOpacity>
      ),
      title: 'Descripción',
    });
  }, [navigation, fromScreen]);

  return (
    <View style={theme.characterDetailStyles.container}>
      <Image source={{ uri: character.image }} style={theme.characterDetailStyles.image} />
      <View style={theme.characterDetailStyles.infoContainer}>
        <Text style={theme.characterDetailStyles.name}>{character.name}</Text>
        <View style={theme.characterDetailStyles.details}>
          <Text style={theme.characterDetailStyles.label}>Status:</Text>
          <Text style={theme.characterDetailStyles.value}>{character.status}</Text>
        </View>
        <View style={theme.characterDetailStyles.details}>
          <Text style={theme.characterDetailStyles.label}>Species:</Text>
          <Text style={theme.characterDetailStyles.value}>{character.species}</Text>
        </View>
        <View style={theme.characterDetailStyles.details}>
          <Text style={theme.characterDetailStyles.label}>Gender:</Text>
          <Text style={theme.characterDetailStyles.value}>{character.gender}</Text>
        </View>
        <View style={theme.characterDetailStyles.details}>
          <Text style={theme.characterDetailStyles.label}>Location:</Text>
          <Text style={theme.characterDetailStyles.value}>{character.location.name}</Text>
        </View>
        <TouchableOpacity
          onPress={handleAddToFavorites}
          style={[theme.characterDetailStyles.favoriteButton, isFavorite && theme.characterDetailStyles.disabledButton]}
          disabled={isFavorite}
        >
          <Text style={theme.characterDetailStyles.favoriteButtonText}>
            {isFavorite ? 'Añadido a Favoritos' : 'Agregar a Favoritos'}
          </Text>
        </TouchableOpacity>
      </View>

      {showToast && (
        <Animated.View style={[theme.characterDetailStyles.toast, { opacity: toastOpacity }]}>
          <Text style={theme.characterDetailStyles.toastText}>¡Añadido a Favoritos!</Text>
        </Animated.View>
      )}
    </View>
  );
};

export default CharacterDetailScreen;