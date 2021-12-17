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
  Dimensions,
  BackHandler,
  Modal,
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
var Color = require('color');
import SwiperFlatList from 'react-native-swiper-flatlist';
import MyButton from './Mybtn';
import SideBar from './SideBar';
import styles from './Styles';
//import realm from './DatabaseRecipe';
const {width, height} = Dimensions.get('screen');
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'dd.db'});
export default class ScreenHCCAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //   Number: this.props.navigation
      //     .dangerouslyGetParent()
      //     .getParam('Number', ''),
    };
  }

  closeDrawer() {
    this._drawer._root.close();
  }
  openDrawer() {
    this._drawer._root.open();
  }

  /* setModalVisible(visible) {
    this.setState({modalDateVisible: visible});
  }*/

  render() {
    return (
      <ImageBackground
        imageStyle={{resizeMode: 'stretch'}}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          flexDirection: 'column',
        }}
        source={require('./images/blue-white1.jpg')}>
        <View
          style={{
            margin: 10, borderRadius: 30, backgroundColor: '#fff',flexDirection:'row-reverse',height:'40%',justifyContent:'center',alignItems:'center'
          }}>
          <View
            style={{
              width:'40%',justifyContent:'flex-start',alignItems:'flex-end'
             
            }}>
            <Text
              style={{
                textAlign: 'right',
                color: '#0443F9',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              {' نام مرکز درمانی : ' +
                '\n' +
                'آدرس  : ' +
                '\n\n' +
                ' شماره تلفن : '}
            </Text>
          </View>
          <View style={{justifyContent:'flex-start',alignItems:'flex-end'}}>
            <Text
              style={{
                textAlign: 'right',
                fontSize: 15,
                textDecorationLine: 'underline',
                
              }}>
              {global.DataSourceHCC.name +
                '\n' +
                ' خیابان : ' +
                global.DataSourceHCC.street +
                '\n کوچه :' +
                global.DataSourceHCC.alley +
                ' پلاک : ' +
                global.DataSourceHCC.plaque +
                '\n\n' +
                global.DataSourceHCC.phone_number}
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
