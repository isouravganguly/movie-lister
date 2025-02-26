import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

export const MovieListTile = ({item}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: item.Poster}} style={styles.poster} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.info}>Type: {item.Type}</Text>
        <Text style={styles.info}>Year: {item.Year}</Text>
        <Text style={styles.info}>ID: {item.imdbID}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    minHeight: 60,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#eee',
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 2,
  },
  poster: {
    width: 60,
    height: 90,
    marginRight: 10,
    resizeMode: 'cover',
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: '#555',
  },
});
