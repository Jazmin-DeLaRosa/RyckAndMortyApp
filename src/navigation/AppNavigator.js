import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CharacterListScreen from '../screens/CharacterListScreen';
import CharacterDetailScreen from '../screens/CharacterDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../styles/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function CharacterStack() {
  return (
    <Stack.Navigator screenOptions={theme.headerStyles}>
      <Stack.Screen
        name="CharacterList"
        component={CharacterListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={{
          title: 'Detalles',
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Favorites') {
            iconName = 'favorite';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={CharacterStack}
        options={{ title: 'Inicio', headerShown: false }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favoritos',
          ...theme.headerStyles, 
        }}
      />
    </Tab.Navigator>
  );
}