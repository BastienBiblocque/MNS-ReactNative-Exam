import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import Colors from '../Colors';

const MeteoCard = ({city, temperature, icon}) => {
  return (
    <View style={[styles.card, styles.shadow]}>
      <Text style={styles.city}>{city}</Text>
      <View style={{flexDirection: 'row', marginLeft: 8}}>
        <Text style={{fontSize: 45, marginTop: 10}}>{temperature}°C</Text>
        <Image
          source={{uri: `http://openweathermap.org/img/w/${icon}.png`}}
          style={{width: 100, height: 100}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  city: {
    fontSize: 30,
    marginLeft: 8,
    color: Colors.primary,
  },
  card: {
    display: 'flex',
    margin: 10,
    height: 200,
    borderRadius: 5,
    backgroundColor: Colors.white,
  },
  shadow: {
    elevation: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default MeteoCard;
