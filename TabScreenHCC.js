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
import ScreenListDoctorsHCC from './ScreenListDoctorsHCC';
import ScreenHCCAddress from './ScreenHCCAddress';
//import TabScreen from './pages/TabScreen';

//Making TabNavigator which will bw called in App StackNavigator
//we can directly export the TabNavigator also but header will not be visible
//as header comes only when we put anything into StackNavigator and then export
const TabScreenHCC = createMaterialTopTabNavigator(
  {
    ScreenHCCAddress: {
        screen: ScreenHCCAddress,
        navigationOptions: {
          tabBarLabel: 'آدرس و شماره',
        },
      },
    ScreenListDoctorsHCC: {
      screen: ScreenListDoctorsHCC,
      navigationOptions: {
        tabBarLabel: 'لیست پزشکان',
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
  {initialRouteName : 'ScreenHCCAddress'}
);


export default createAppContainer(TabScreenHCC);
