import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeInDown } from 'react-native-reanimated';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Place, RootParamList } from '../../types';
import { GOOGLE_API_KEY } from '../../constant';



export default function PlaceSearchScreen() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

  useEffect(() => {
    if (query.length > 2) {
      fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${GOOGLE_API_KEY}`)
        .then(res => res.json())
        .then(data => setSuggestions(data.predictions))
        .catch(console.error);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const selectPlace = async (place: Place) => {
    const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${GOOGLE_API_KEY}`);
    const data = await res.json();
    const location = data.result.geometry.location;

    const detailedPlace: Place = {
      ...place,
      name: data.result.name,
      address: data.result.formatted_address,
      location
    };

    setSelectedPlace(detailedPlace);
    await updateHistory(detailedPlace);
  };

  const updateHistory = async (place: Place) => {
    const existing = await AsyncStorage.getItem('searchHistory');
    const parsed: Place[] = existing ? JSON.parse(existing) : [];
    const newHistory = [place, ...parsed.filter(p => p.place_id !== place.place_id)];
    await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Search for a place"
        value={query}
        onChangeText={setQuery}
        style={{ padding: 10, borderBottomWidth: 1 }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('History')}>
        <Text style={{ padding: 10, color: 'blue' }}>View History</Text>
      </TouchableOpacity>
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <Animated.View entering={FadeInDown}>
            <TouchableOpacity onPress={() => selectPlace(item)}>
              <Text style={{ padding: 10 }}>{item.description}</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
      {selectedPlace?.location && (
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: selectedPlace.location.lat,
            longitude: selectedPlace.location.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: selectedPlace.location.lat,
              longitude: selectedPlace.location.lng,
            }}
            title={selectedPlace.name}
            description={selectedPlace.address}
          />
        </MapView>
      )}
    </View>
  );
}