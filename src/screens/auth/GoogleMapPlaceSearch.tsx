import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Place, RootParamList } from "../../types";
import { commonStyles, GOOGLE_API_KEY } from "../../constant";
import { useTypedSelector } from "../../customHooks";
import { useDispatch } from "react-redux";
import { setHistory } from "../../redux/reducers/searchHistory_Red";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddressSearch } from "../../components";
import LocationCardDetail from "../../components/view/LocationCardDetail";

export default function PlaceSearchScreen() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showAddressContainerbool, setShowAddressContainerbool] = useState(false);
  const mapViewRef = useRef<MapView>(null);
  const [mapregion] = useState({
    latitude: 3.139,
    longitude: 101.6869,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const existingPlaces = useTypedSelector((x) => x.saveHistory.Place);
  const dispatch = useDispatch();

  const onItemSelectHandler = (place: Place) => {
    if (place) {
      dispatch(setHistory(place));
      if (mapViewRef.current) {
        mapViewRef.current.animateToRegion(
          {
            latitude: place.location.lat,
            longitude: place.location.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          1000
        );
      }
    }
    setSelectedPlace(place);
  };

  const onMapReadyHanlder = useCallback(() => {
    setShowAddressContainerbool(true)
  }, [])

  return (
    <SafeAreaView style={[commonStyles.fillFullScreen]}>
      <MapView
        ref={mapViewRef}
        style={commonStyles.fillFullScreen}
        region={mapregion}
        loadingEnabled
        onMapReady={onMapReadyHanlder}
      >
        {selectedPlace?.location && (
          <Marker
            coordinate={{
              latitude: selectedPlace.location.lat,
              longitude: selectedPlace.location.lng,
            }}
            title={selectedPlace.name}
            description={selectedPlace.address}
          />
        )}
      </MapView>
      {showAddressContainerbool && <AddressSearch onItemSelect={onItemSelectHandler} />}
      {selectedPlace?.location && (
        <View
          style={[commonStyles.absolute, commonStyles.fullWidth, { bottom: 0 }]}>
            <LocationCardDetail data={selectedPlace} mapVisisblity={false} />
          </View>
      )}
    </SafeAreaView>
  );
}