import { ParamListBase } from "@react-navigation/native";

import { AxiosResponse } from "axios";

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


export type AxiosInterceptorContextTypes = {
  SearcHGoogleAddress: (searchText: string) => Promise<AxiosResponse>;
  getDetailByPlaceId: (place_id: string) => Promise<AxiosResponse<GooglePlaceDetailsResponse>>;
    // logoutHanlder: () => void
    // onSubmitData: (data: any) => Promise<AxiosResponse>;
  }

export interface AddressSearchInterface {
  onItemSelect: (place: Place | null) => void
}

export type GooglePlaceDetailsResponse = {
  result: {
    name?: string;
    formatted_address?: string;
    geometry?: {
      location: {
        lat: number;
        lng: number;
      };
    };
  };
};