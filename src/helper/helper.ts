import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {
  CommonActions,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import Toast, {ToastPosition} from 'react-native-toast-message';
import { Dimensions } from 'react-native';

export const genericWidth = (ratio: number) => scale(ratio);
export const genericHeight = (ratio: number) => verticalScale(ratio);
export const genericRatio = (ratio: number) => moderateScale(ratio);

export const {width, height} = Dimensions.get('window')

// export const dispatch = useDispatch()

export const screenNavigation = (
  navigation: NavigationProp<ParamListBase>,
  path: string = '',
  data: any = {},
) => {
  // console.log("navigation", navigation)
  navigation.navigate(path, data);
};
export const hardScreenNavigation = (
  navigaiton: NavigationProp<ParamListBase>,
  name: string = '',
  params: any = {},
) =>
  navigaiton.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name, params}],
    }),
  );

export function showToastMsg(
  type: 'success' | 'error' | 'info' = 'success',
  msg: string = '',
  position: ToastPosition = 'bottom',
) {
  // success, error, info
  return Toast.show({
    type, //'success' | 'error' | 'info'
    text1: msg,
    position,
  });
}
