import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Place, RootParamList } from '../../types';
import { useTypedSelector } from '../../customHooks';
import { useDispatch } from 'react-redux';
import { removeHistory } from '../../redux/reducers/searchHistory_Red';



export default function HistoryScreen() {
  const [history, setHistory] = useState<Place[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const existingPlaces = useTypedSelector(x => x.saveHistory.Place)
  const dispatch = useDispatch()

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    if (existingPlaces.length > 0) setHistory([...existingPlaces]);
  };

  const onSelect = (place: Place) => {
    navigation.navigate('GoogleMapPlaceSearch', { place });
  };

  const confirmDelete = (placeId: string) => {
    Alert.alert('Delete Item', 'Are you sure you want to remove this item from history?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => dispatch(removeHistory(placeId)) },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Search History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => onSelect(item)}>
              <Text style={{ padding: 10 }}>{item.name || item.description}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirmDelete(item.place_id)}>
              <Text style={{ padding: 10, color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}