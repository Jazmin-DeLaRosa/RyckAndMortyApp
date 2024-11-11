// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar, useColorScheme, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { theme } from './src/styles/theme';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? theme.colors.darker : theme.colors.lighter,
    flex: 1,
  };

  return (
    <FavoritesProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </FavoritesProvider>
  );
}

export default App;