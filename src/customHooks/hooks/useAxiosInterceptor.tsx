
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import { COLORS, commonStyles } from '../../constant/theme';
import { hardScreenNavigation, showToastMsg } from '../../helper';
import { AxiosInterceptorContextTypes, GooglePlaceDetailsResponse } from '../../types';
import { hide, show } from '../../redux/reducers/spinner_Red';
import { useDispatch } from 'react-redux';
import { GOOGLE_API_KEY } from '../../constant';

const useAxiosInterceptor = createContext<AxiosInterceptorContextTypes>({
  SearcHGoogleAddress: async () => {
    throw new Error('SearcHGoogleAddress function is not implemented.');
  },
  getDetailByPlaceId: async () => {
    throw new Error('getDetailByPlaceId function is not implemented.');
  },

});

export const useAxiosContext = () => useContext(useAxiosInterceptor);

interface AxiosContextProps {
  children: string | JSX.Element | JSX.Element[];
}

const instance = axios.create({
  baseURL: "",
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  timeout: 30000,
});

const AxiosContext = ({ children }: AxiosContextProps) => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const dispatch = useDispatch()

  useEffect(() => {
    const resInterceptor = (response: any) => {
      console.log('-----------------response-----------');
      console.log('Route', response.url);
      console.log('data', response.data);
      console.log('params', response.params);
      console.log('statusCode', response.statusCode);
      console.log('------------------------------------');

      return response;
    };
    const errInterceptor = (error: any) => {
      // if (error.response.status === 401) {
      //     // navigate('/login');
      // }
      return Promise.reject(error);
    };
    const reqInterceptor = (response: any) => {
      console.log('-----------------request-----------');
      console.log('baseURL', response.baseURL);
      console.log('Route', response.url);
      console.log('method', response.method);
      console.log('data', JSON.stringify(response.data));
      console.log('params', response.params);
      console.log('statusCode', response.statusCode);
      console.log('------------------------------------');

      return response;
    };
    const resInterceptorInstance = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor,
    );
    const reqInterceptorInstance = instance.interceptors.request.use(
      reqInterceptor,
      (error: any) => {
        console.log('interceptor req error', error);
        return Promise.reject(error);
      },
    );
    setIsSet(true);
    return () => {
      instance.interceptors.response.eject(resInterceptorInstance);
      instance.interceptors.request.eject(reqInterceptorInstance);
      return;
    };
  }, []);

  const PreLoadingScren = () => (
    <View style={[commonStyles.fillFullScreen, commonStyles.center]}>
      <ActivityIndicator color={COLORS.black} size={'large'} />
    </View>
  );

  const SearcHGoogleAddress = (searchText: string): Promise<AxiosResponse> => new Promise(async (resolve, reject) => {
    dispatch(show('Searching...'));
    try{
      searchText = searchText.split(" ").join("+");
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json',
        {
          params: { input: searchText,  key: GOOGLE_API_KEY, },
        }
      );
  
      // const predictions = response?.data?.predictions || [];
      resolve(response);
    } catch (err: any) {
      showToastMsg('error', err.message || 'Something went wrong', 'top');
      reject(err);
    } finally {
      dispatch(hide());
    }
  });

  const getDetailByPlaceId = (place_id: string): Promise<AxiosResponse<GooglePlaceDetailsResponse>> => new Promise(async (resolve, reject) => {
    dispatch(show('Getting Data...'));
    try{
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json',
        {
          params: { place_id,  key: GOOGLE_API_KEY, },
        }
      );
  
      // const predictions = response?.data?.predictions || [];
      resolve(response);
    } catch (err: any) {
      showToastMsg('error', err.message || 'Something went wrong', 'top');
      reject(err);
    } finally {
      dispatch(hide());
    }
  });



  return (
    <useAxiosInterceptor.Provider value={{SearcHGoogleAddress, getDetailByPlaceId}}>
      {isSet ? children : <PreLoadingScren />}
    </useAxiosInterceptor.Provider>
  );
};

export default AxiosContext;