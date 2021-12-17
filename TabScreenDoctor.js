//This is an example of React Native Tab
import React from 'react';
//import react in our code.
//In Version 2+
//import {createStackNavigator, createMaterialTopTabNavigator} from 'react-navigation';
//In Version 3+
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
} from 'react-navigation';
//import Navigator in our project


import styles from './Styles';
import ScreenDoctorProfile from './ScreenDoctorProfile';
import ScreenDoctorAddress from './ScreenDoctorAddress';
//import TabScreen from './pages/TabScreen';

//Making TabNavigator which will bw called in App StackNavigator
//we can directly export the TabNavigator also but header will not be visible
//as header comes only when we put anything into StackNavigator and then export
const TabScreenDoctor = createMaterialTopTabNavigator(
  {
    ScreenDoctorAddress: {
        screen: ScreenDoctorAddress,
        navigationOptions: {
          tabBarLabel: 'آدرس و شماره',
        },
      },
    ScreenDoctorProfile: {
      screen: ScreenDoctorProfile,
      navigationOptions: {
        tabBarLabel: 'مشخصات و توضیحات',
      },
    },
    
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: '#633689',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
  },
  {initialRouteName : 'ScreenDoctorProfile'}
);

//making a StackNavigator to export as default
/*const App = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#484c7f',
      },
      //headerTintColor: '#FFFFFF',
      headerStyle=styles.title,
      title: 'Doci',
    },
  },
});*/
//In version 2+ createAppContainer was default container
//but in version 3+ you have to export it manually
//In Version 2+
//export default App;
//In Version 3+
export default createAppContainer(TabScreenDoctor);
