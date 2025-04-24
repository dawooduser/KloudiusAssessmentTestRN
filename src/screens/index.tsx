import GoogleMapPlaceSearch from "./auth/GoogleMapPlaceSearch"
import HistoryScreen from "./auth/HistoryScreen"

const nonAuthScreen = {}

const authScreen = {HistoryScreen, GoogleMapPlaceSearch}

export {
    nonAuthScreen, authScreen
}