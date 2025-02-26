import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useFetchData} from './src/hook/useFetchData';
import {MovieListTile} from './src/component/MovieListTile';
import {useDebounce} from './src/hook/useDebounce';
// import {ErrorModal} from './src/component/ErrorModal';

function App(): React.JSX.Element {
  const [text, setText] = useState('');
  const debouncedSearchKey = useDebounce(text, 500);
  // const [showError, setShowError] = useState(false);

  const {data, error, loading} = useFetchData(debouncedSearchKey);

  console.log('Response Logs: ', {data, error, loading});

  useEffect(() => {
    console.log({error});
    if (error) {
      setTimeout(() => {
        Alert.alert('Error', 'This request cannot be carried out.');
      }, 100);
    }
  }, [error]);

  const submitHandler = () => {
    console.log('search key submits');
    console.log({textDATA: text});
  };

  const renderItem = ({item}) => {
    console.log({item});
    return <MovieListTile item={item} />;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'grey'}}>
      {/* <ErrorModal error={showError} onClose={() => setShowError(false)} /> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 20,
          height: 50,
        }}>
        <TextInput
          style={{
            backgroundColor: 'white',
            flex: 1,
            borderRadius: 10,
            paddingHorizontal: 20,
          }}
          placeholder="Search for a movie title"
          value={text}
          onChangeText={text => setText(text)}
        />
        <Pressable
          onPress={submitHandler}
          style={{
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white'}}>Search</Text>
        </Pressable>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : error ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{error}</Text>
          </View>
        ) : data ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={{width: '100%'}}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {text === '' ? (
              <Text
                style={{
                  textAlign: 'center',
                }}>
                Search a movie title on the Search Bar above!
              </Text>
            ) : null}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default App;
