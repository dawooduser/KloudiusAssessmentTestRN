import { ParamListBase } from "@react-navigation/native";

export interface RootParamList extends ParamListBase {
  GoogleMapPlaceSearch: undefined;
  HistoryScreen: undefined;
}
export interface Place {
  place_id: string;
  description: string;
  name?: string;
  address?: string;
  location?: { lat: number; lng: number };
}