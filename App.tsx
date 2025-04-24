import { View, Text, ActivityIndicator } from 'react-native'
import React, { FC } from 'react'
import store, { persistor } from './src/redux/store/store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { COLORS } from './src/constant';
import Toast from 'react-native-toast-message';
import RootStack from './src/navigation/RootStack';

const App: FC = () => {
  return (
    <Provider store={store}>
    <PersistGate loading={<ActivityIndicator size={"large"} color={COLORS.primary} />} persistor={persistor}>
      <RootStack />
      <Toast />
    </PersistGate>
  </Provider>
  )
}

export default App