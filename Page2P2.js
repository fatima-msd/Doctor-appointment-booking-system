import React, {Component} from 'react';
import {
  StyleSheet,
  Platform,
  AppRegistry,
  StatusBar,
  FlatList,
  YellowBox,
  Image,
  ImageBackground,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Segment,
  Content,
  Text,
  Footer,
  FooterTab,
  Fab,
  View,
  Drawer,
} from 'native-base';
import MyButton from './Mybtn';
import SideBar from './SideBar';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
} from 'react-navigation';
//import Navigator in our project
global.language = 'Persian'; // 'English'
import ScreenMainProfile from './ScreenMainProfile';
import ScreenListDoctors from './ScreenListDoctors';
import ScreenListHCC from './ScreenListHCC';
import ScreenListDoctorsHCC from './ScreenListDoctorsHCC';
import ScreenEditPP from './ScreenEditPP';
import ScreenListFamily from './ScreenListFamily'
import ScreenEditF from './ScreenEditF'
import ScreenAddF from './ScreenAddF'
import ScreenAppointmentBooking from './ScreenAppointmentBooking'
import ScreenListAppointment from './ScreenListAppointment'
import ScreenShowHCC from './ScreenShowHCC'
import ScreenShowDoctor from './ScreenShowDoctor'
import DoctorFlatList from './DoctorFlatList'
/*import ScreenList from './ScreenList';
import ScreenMainNote from './ScreenMainNote';
// import ScreenSearch from './ScreenSearch';
import ScreenCalendar from './ScreenCalendar' */
import styles from './Styles';
import TabBar from './TabBar';
const {width, height} = Dimensions.get('screen');
const TabScreen = createMaterialTopTabNavigator(
  {
    

    ScreenMainProfile: {
      screen: ScreenMainProfile,
      navigationOptions: {
        tabBarLabel: 'پروفایل' ,
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="assignment-ind"
            type="MaterialIcons"
            style={{
              color: tintColor,
              fontSize: 25,
            }}
          />
        ),
      },
    },

    ScreenListDoctors: {
      screen: ScreenListDoctors,
      navigationOptions: {
        tabBarLabel: 'پزشکان' ,

        tabBarIcon: ({tintColor}) => (
          <Icon
            name="doctor"
            type="MaterialCommunityIcons"
            style={{
              color: tintColor,
              fontSize: 25,
            }}
          />
        ),
      },
    },
    
    ScreenListHCC: {
      screen: ScreenListHCC,
      navigationOptions: {
        tabBarLabel: "مراکز درمانی",

        tabBarIcon: ({tintColor}) => (
          <Icon
            name="hospital-building"
            type='MaterialCommunityIcons'
            style={{
              color: tintColor,
              fontSize: 25,
            }}
          />
        ),
      },
    },
    /*ScreenCalendar: {
      screen: ScreenCalendar,
      navigationOptions: {
        tabBarLabel: global.language == 'Persian' ? 'تقویم' : 'Calendar',
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="event"
            type="MaterialIcons"
            style={{
              color: tintColor,
              fontSize: 25,
            }}
          />
        ),
      },
    },
    ScreenList: {
      screen: ScreenList,
      navigationOptions: {
        tabBarLabel: global.language == 'Persian' ? 'لیست \nخرید' : 'Shopping \nList',
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="shopping-cart"
            type="MaterialIcons"
            style={{
              color: tintColor,
              fontSize: 25,
            }}
          />
        ),
      },
    },
    ScreenMainNote: {
      screen: ScreenMainNote,
      navigationOptions: {
        tabBarLabel: global.language == 'Persian' ? 'یادداشت' : 'Note',
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="event-note"
            type="MaterialIcons"
            style={{
              color: tintColor,
              fontSize: 25,
            }}
          />
        ),
      },
    },*/
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: false,
    tabBarComponent: TabBar,
    tabBarOptions: {
      lazy : true,
      showIcon: true,
      style: {backgroundColor: '#ECFAF3'}, //DCFAEB"
      tabStyle: {
        width: width / 5,
        height:height*0.1
      },
      labelStyle: {
        fontSize: 10,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      activeTintColor: '#000',
      inactiveTintColor: '#4C4F4D',
       
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 4,
      },
    },
  },
);

//making a StackNavigator to export as default
const Family = createStackNavigator({
  ScreenListFamily: {screen:ScreenListFamily },
  ScreenEditF: {screen:ScreenEditF},
  ScreenAddF: {screen:ScreenAddF}
},
  {
    headerMode: 'none',
  
});

const Doct = createStackNavigator({
  
  ScreenShowDoctor: {screen:ScreenShowDoctor}
},
  {
    headerMode: 'none',
  
});

// const Appointment = createStackNavigator({
//   ScreenListFamily: {screen:ScreenListFamily },
//   ScreenEditF: {screen:ScreenEditF},
// },
//   {
//     headerMode: 'none',
  
// });
const App123 = createStackNavigator({
  TabScreen: {screen: TabScreen},
  ScreenEditPP: {screen:ScreenEditPP},
  Family : {screen:Family},
  Doctor :{screen:Doct} ,
  ScreenAppointmentBooking: {screen:ScreenAppointmentBooking} ,
  ScreenShowHCC: {screen:ScreenShowHCC},
  DoctorFlatList:{screen:DoctorFlatList},
  ScreenListDoctorsHCC:{screen:ScreenListDoctorsHCC},
  ScreenListAppointment:{screen:ScreenListAppointment}
},
  {
    headerMode: 'none',
  
});

export default createAppContainer(App123);
