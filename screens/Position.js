import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import GetLocation from 'react-native-get-location';
import MeteoCard from '../components/MeteoCard';

const Position = () => {
  const [data, setData] = useState(null);

  const [localisation, setLocalisation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (!localisation) {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then(location => {
          setLocalisation(location);
          if (location) {
            getWeather(location.latitude, location.longitude).then();
          }
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
    } else {
      getWeather(localisation.latitude, localisation.longitude).then();
    }
  }, [localisation]);

  const getWeather = async (lat, long) => {
    try {
      const getData = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=407165e99deffff1d3b70d3360f1edd0&units=metric`,
      );
      setData(getData.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  return (
    <View>
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

export default Position;
