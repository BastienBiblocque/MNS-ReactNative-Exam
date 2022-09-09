import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import GetLocation from 'react-native-get-location';
import Colors from '../Colors';
import WeeklyCard from '../components/WeeklyCard';

const Week = () => {
  const [city, setCity] = useState(null);

  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const getWeather = async (lat, long) => {
    try {
      const getData = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=407165e99deffff1d3b70d3360f1edd0&units=metric`,
      );
      setData(getData.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
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
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const getPosition = () => {
    try {
      setIsLoading(true);
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then(location => {
          if (location) {
            getWeather(location.latitude, location.longitude).then();
          }
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
          setIsLoading(false);
        });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  return (
    <ScrollView>
      <View>
        <Button
          title="Ma position"
          onPress={() => {
            getPosition();
          }}
        />
        <TextInput
          onChangeText={setCity}
          value={city}
          placeholder="Ville"
          keyboardType="text"
        />
        <Button
          title="Rechercher"
          onPress={() => {
            doSearchCity().then();
          }}
        />

        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : data ? (
          <View>
            <View style={styles.card}>
              <Text style={{fontSize: 20, padding: 5, textAlign: 'center'}}>
                {data.city.name}
              </Text>
            </View>
            {data.list.map((infocard, key) => (
              <WeeklyCard
                key={key}
                date={infocard.dt_txt}
                icon={infocard.weather[0].icon}
                temperature={infocard.main.temp}
              />
            ))}
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: Colors.white,
  },
});

export default Week;
