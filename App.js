import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Meteo from './screens/Meteo';
import Week from './screens/Week';
import Position from './screens/Position';
import GetLocation from 'react-native-get-location';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const Tab = createMaterialBottomTabNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Tab.Navigator>
          <Tab.Screen
            name="Position"
            component={Position}
            options={{
              tabBarLabel: 'Votre position',
              tabBarIcon: ({color}) => (
                <Icon name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Week"
            component={Week}
            options={{
              tabBarLabel: 'À venir',
              tabBarIcon: ({color}) => (
                <Icon name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Recherche"
            component={Meteo}
            options={{
              tabBarLabel: 'Recherche',
              tabBarIcon: ({color}) => (
                <Icon name="home" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
