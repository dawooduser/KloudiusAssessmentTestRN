import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

interface Place {
  place_id: string;
  description: string;
  name?: string;
  address?: string;
  location?: { lat: number; lng: number };
}

export default function HistoryScreen() {
  const [history, setHistory] = useState<Place[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadHistory = async () => {
      const data = await AsyncStorage.getItem('searchHistory');
      if (data) setHistory(JSON.parse(data));
    };
    loadHistory();
  }, []);

  const onSelect = (place: Place) => {
    navigation.navigate('Home', { place });
  };

  const deleteItem = async (placeId: string) => {
    const newHistory = history.filter(p => p.place_id !== placeId);
    setHistory(newHistory);
    await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const confirmDelete = (placeId: string) => {
    Alert.alert('Delete Item', 'Are you sure you want to remove this item from history?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteItem(placeId) },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Search History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <Animated.View entering={FadeInRight} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => onSelect(item)}>
              <Text style={{ padding: 10 }}>{item.name || item.description}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirmDelete(item.place_id)}>
              <Text style={{ padding: 10, color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
}