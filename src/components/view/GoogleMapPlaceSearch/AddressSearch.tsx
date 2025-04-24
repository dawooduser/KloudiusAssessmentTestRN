import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, memo, useCallback, useState } from 'react'
import { COLORS, commonStyles } from '../../../constant'
import { genericRatio } from '../../../helper'
import { Entypo, Foundation } from '../../../constant/icons'
import { AddressSearchInterface, Place } from '../../../types'
import { useAxiosContext } from '../../../customHooks'

let timeout = null

const AddressSearch: FC<AddressSearchInterface> = ({onItemSelect}) => {
    const { SearcHGoogleAddress, getDetailByPlaceId } = useAxiosContext();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Place[]>([]);
    const [showSearchLoaderVisible, setShowSearchLoaderVisible] = useState(false)
    const [editableBool, setEditableBool] = useState(false)

    const textInputOnChangeText = useCallback((val) => {
        if (val !== "" && query === val) return;
        if (val === "") {
            setShowSearchLoaderVisible(false)
            setSuggestions([])
            return;
        }
        if (timeout !== null) {
            clearTimeout(timeout)
            timeout = null
        }
        if (!showSearchLoaderVisible) {
            setShowSearchLoaderVisible(true)
        }
        timeout = setTimeout(() => {
            if (val !== "") {
                return SearcHGoogleAddress(val.toLowerCase()).then((response) => {
                    setShowSearchLoaderVisible(false)
                    if (val !== "") setSuggestions(response?.data?.predictions || []);
                })
            } else {
                setShowSearchLoaderVisible(false)
                setSuggestions([])
            }
        }, 1000)

    }, [])
    const LoadingCircularView = useCallback(() => (
        <View style={[commonStyles.fullWidth, commonStyles.center, styles.loaderSuggestionContainer]}>
            <ActivityIndicator size={26} />
        </View>
    ), [])
    const selectPlace = async (place: Place) => {
        const data = await getDetailByPlaceId(place.place_id); 
        const location = data.data?.result?.geometry?.location || null;
        if (location) {
            setSuggestions([])
            const detailedPlace: Place = {
                ...place,
                name: data.data?.result?.name || '',
                address: data.data?.result?.formatted_address || '',
                location
              };
              onItemSelect(detailedPlace)
              setEditableBool(true)
        }
      };
      const removeSelectedAddress = () => {
        setEditableBool(false);
        onItemSelect(null)
      }
    return (
        <View style={[commonStyles.fullWidth, commonStyles.center, styles.container]}>
            <View style={[styles.addressContainer]}>
                <View style={[commonStyles.fullWidth, styles.textIconBtnContaier, commonStyles.rowDirectionCenter]}>
                    <View>
                        <Foundation name={'address-book'} color={COLORS.primaryHard} size={genericRatio(20)} />
                    </View>
                    <TextInput onChangeText={textInputOnChangeText} style={[commonStyles.fillFullScreen, styles.TextInputStyle]} placeholder='Please Search' />
                    {editableBool && <TouchableOpacity onPress={removeSelectedAddress}>
                        <Entypo name={'circle-with-cross'} color={COLORS.primary} size={genericRatio(20)} />
                    </TouchableOpacity>}
                </View>
                {showSearchLoaderVisible ? <LoadingCircularView /> : suggestions.length > 0 && <View style={styles.suggestionContainer}>
                    <ScrollView
                        keyboardShouldPersistTaps='always'
                        contentContainerStyle={styles.addressScrolls}>
                        {suggestions.map((val, index) => (
                            <TouchableOpacity key={index} style={styles.suggestionItem}
                                onPress={() => selectPlace(val)}>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.searchText}>{val?.description}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>}
            </View>
        </View>
    )
}

export default memo(AddressSearch)

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0
    },
    suggestionContainer: { width: '100%', maxHeight: 100, },
    loaderSuggestionContainer: { backgroundColor: COLORS.white, paddingVertical: 15 },
    addressContainer: {
        width: '90%',
        backgroundColor: COLORS.secondary
    },
    textIconBtnContaier: {
        height: genericRatio(30)
    },
    TextInputStyle: {
        flex: 1,
        padding: 0,
        paddingHorizontal: 10,

        height: '100%',

    },
    submitContainer: {
        paddingHorizontal: 5,
        backgroundColor: COLORS.primary
    },
    suggestionItem: { paddingVertical: 10, paddingHorizontal: 15 },
    searchText: { fontSize: 12, color: COLORS.black, fontWeight: '500' },
    addressScrolls: { flexGrow: 1, backgroundColor: COLORS.white },

})