import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, memo, useState } from "react";
import { LocationCardDetailInterface } from "../../types";
import { COLORS, commonStyles, FONTS, SIZES } from "../../constant";
import VerticalSpace from "./VerticalSpace";
import { AntDesign, Feather } from "../../constant/icons";
import Collapsible from "react-native-collapsible";
import MapView, { Marker } from "react-native-maps";
import { useDispatch } from "react-redux";
import { removeHistory } from "../../redux/reducers/searchHistory_Red";
import { genericRatio } from "../../helper";
import HorizontalSpace from "./HorizontalSpace";

const LocationCardDetail: FC<LocationCardDetailInterface> = ({
  data,
  mapVisisblity,
  customContainer = {}
}) => {
  const [LocationCardDetailStates, setLocationCardDetailStates] = useState({
    mapDropDownVisible: true,
  });
  const dispatch = useDispatch()
  const confirmDelete = (placeId: string) => {
    Alert.alert('Delete Item', 'Are you sure you want to remove this item from history?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => dispatch(removeHistory(placeId)) },
    ]);
  };
  return (
    <View style={[styles.container, customContainer]}>
      <View
        style={[
          commonStyles.fullWidth,
          commonStyles.rowDirectionCenter,
          commonStyles.spaceBetween,
        ]}
      >
        <View style={[commonStyles.rowDirectionCenter]}>
          <Text style={[FONTS.body3]}>{"Name: "}</Text>
          <Text style={[FONTS.body4]}>{data?.name || "-"}</Text>
        </View>
       {mapVisisblity && <TouchableOpacity onPress={() => confirmDelete(data.place_id)}>
          <Text style={{ padding: 10, color: "red" }}>Delete</Text>
        </TouchableOpacity>}
      </View>
      <VerticalSpace />
      <View style={[commonStyles.fullWidth, commonStyles.rowDirectionCenter]}>
        <Text style={[FONTS.body3]}>{"Address: "}</Text>
        <Text style={[FONTS.body4]}>{data?.address || "-"}</Text>
      </View>
      <VerticalSpace />
      <View
        style={[
          commonStyles.fullWidth,
          commonStyles.rowDirectionCenter,
          { flexWrap: "wrap" },
        ]}
      >
        <View style={[commonStyles.fillFullScreen, commonStyles.center]}>
          <Text style={[FONTS.body3]}>{"Latitude"}</Text>
          <Text style={[FONTS.body4]}>{data?.location?.lat || "-"}</Text>
        </View>
        <View style={[commonStyles.fillFullScreen, commonStyles.center]}>
          <Text style={[FONTS.body3]}>{"Place ID"}</Text>
          <Text style={[FONTS.body4]}>{data?.place_id || "-"}</Text>
        </View>
        <View style={[commonStyles.fillFullScreen, commonStyles.center]}>
          <Text style={[FONTS.body3]}>{"Longitude"}</Text>
          <Text style={[FONTS.body4]}>{data?.location?.lng || "-"}</Text>
        </View>
      </View>
      {mapVisisblity && (
        <>
          <VerticalSpace grap={15} />
          <TouchableOpacity
            onPress={() =>
              setLocationCardDetailStates((prev) => ({
                ...prev,
                mapDropDownVisible:
                  !LocationCardDetailStates.mapDropDownVisible,
              }))
            }
            style={[
              commonStyles.fullWidth,
              commonStyles.rowDirectionCenter,
              commonStyles.spaceBetween,
            ]}
          >
            <View style={[commonStyles.fillFullScreen, commonStyles.rowDirectionCenter]}>
              <Feather name="map" color={COLORS.primary} size={genericRatio(20)} />
              <HorizontalSpace />
              <Text style={[FONTS.body3]}>{"Map"}</Text>
            </View>
            <AntDesign
              name={
                !LocationCardDetailStates.mapDropDownVisible
                  ? "upcircle"
                  : "downcircle"
              }
              size={genericRatio(20)}
            />
          </TouchableOpacity>
          <VerticalSpace />
          <Collapsible collapsed={LocationCardDetailStates.mapDropDownVisible}>
            <View
              style={[styles.collapsedMapContainer, commonStyles.fullWidth]}
            >
              <MapView
                style={commonStyles.fillFullScreen}
                zoomEnabled={false}
                zoomControlEnabled={false}
                scrollEnabled={false}
                rotateEnabled={false}
                region={{
                  latitude: data?.location?.lat || 3.139,
                  longitude: data?.location?.lng || 101.6869,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: data?.location?.lat || 3.139,
                    longitude: data?.location?.lng || 101.6869,
                  }}
                  title={data?.name || "-"}
                  description={data?.address || "-"}
                />
              </MapView>
            </View>
          </Collapsible>
        </>
      )}
    </View>
  );
};

export default memo(LocationCardDetail);

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
  },
  collapsedMapContainer: {
    height: SIZES.height * 0.3,
    padding: 10,
  },
});
