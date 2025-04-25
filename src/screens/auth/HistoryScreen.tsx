import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Place, RootParamList } from "../../types";
import { useTypedSelector } from "../../customHooks";
import { useDispatch } from "react-redux";
import { removeHistory } from "../../redux/reducers/searchHistory_Red";
import { COLORS, commonStyles, FONTS, SIZES } from "../../constant";
import { AntDesign } from "../../constant/icons";
import { genericRatio, width } from "../../helper";
import { Header, HorizontalSpace, VerticalSpace } from "../../components";
import LocationCardDetail from "../../components/view/LocationCardDetail";
import { emptyListPlaceholder } from "../../constant/images";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HistoryScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const existingPlaces = useTypedSelector((x) => x.saveHistory.Place);

  const onBackhandler = () => {
    navigation.goBack();
  };

  const PlaceHolderImage = useCallback(
    () => (
      <View style={[commonStyles.fillFullScreen, commonStyles.center]}>
        <Image
          source={emptyListPlaceholder}
          style={style.emptyListPlaceholderStyle}
        />
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={[commonStyles.fillFullScreen]}>
      <View
        style={[
          style.headerCotnaienr,
          commonStyles.fullWidth,
          commonStyles.rowDirectionCenter,
          commonStyles.spaceBetween,
        ]}
      >
        <TouchableOpacity onPress={onBackhandler}>
          <AntDesign
            name="arrowleft"
            size={genericRatio(25)}
            color={COLORS.secondary}
          />
        </TouchableOpacity>

        <Text style={[commonStyles.textColorWhite, FONTS.h3]}>History</Text>
        <HorizontalSpace />
      </View>
      <FlatList
        data={existingPlaces}
        keyExtractor={(index, item) => index.toString()}
        ItemSeparatorComponent={() => <VerticalSpace grap={15} />}
        ListEmptyComponent={<PlaceHolderImage />}
        renderItem={({ index, item }) => (
          <LocationCardDetail key={index} data={item} mapVisisblity customContainer={{width: '95%'}} />
        )}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  headerCotnaienr: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: COLORS.primary,
  },
  emptyListPlaceholderStyle: {
    height: genericRatio(200),
    width: genericRatio(200),
  },
});
