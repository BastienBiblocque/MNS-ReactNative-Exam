import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import MeteoCard from '../components/MeteoCard';
import Colors from '../Colors';

const Meteo = () => {
  const [city, setCity] = useState(null);

  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const getWeather = async (lat, long) => {
    try {
      const getData = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=407165e99deffff1d3b70d3360f1edd0&units=metric`,
      );
      setData(getData.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const doSearchCity = async () => {
    try {
      setIsLoading(true);
      const getCity = await axios.get(
        `https://api-adresse.data.gouv.fr/search/?q=${city}`,
      );
      getWeather(
        getCity.data.features[0].geometry.coordinates[1],
        getCity.data.features[0].geometry.coordinates[0],
      );
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  return (
    <View>
      <TextInput
        onChangeText={setCity}
        value={city}
        placeholder="Ville"
        keyboardType="text"
      />
      <Button
        title="Rechercher"
        onPress={() => {
          doSearchCity();
        }}
      />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : data ? (
        <MeteoCard
          city={data.name}
          temperature={data.main.temp}
          icon={data.weather[0].icon}
        />
      ) : null}
    </View>
  );
};

export default Meteo;
