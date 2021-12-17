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
import {ListItem, CheckBox} from 'native-base';
import MyButton from './Mybtn';
import styles from './Styles';

const {width, height} = Dimensions.get('screen');
global.Number = 0;
global.first_name_doci = '';
global.last_name_doci = '';
global.username_doci = '';
global.y = 5;
global.x = 5;
global.DataSourceHCC = {};
global.DataSourceD = {};
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'dd.db'});

/*const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});*/

export default class Signup_Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //   add_(){
  //     db.transaction(tx => {
  //       tx.executeSql('updet  INSURANCE set  ("تامین اجتماعی"),("بیمه ایران"),("بیمه بانک ملت"),("بیمه ارتش"),("بیمه دانا"),("آزاد");', [],
  //           (tx, results) => {

  //           });
  //   });
  // }
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          width: width,
          height: height,
        }}>
        {/* style -> ,alignItems: 'center',justifyContent: 'space-between' */}
        <StatusBar hidden={true} />
        <ImageBackground
          imageStyle={{resizeMode: 'stretch'}}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
          }}
          source={require('./images/blue-white1.jpg')}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 70,
                fontFamily: '2 Kamran Outline',
                fontWeight: '900',
                fontStyle: 'normal',
                textAlign: 'center',
                textAlignVertical: 'center',
                color: '#0C08F2',
              }}>
              Doci
            </Text>
          </View>
          <View>
            <TouchableNativeFeedback
              onPress={() => {
                this.props.navigation.navigate('LoginPatient');
              }}>
              <View
                style={{
                  margin: 20,
                  padding: 10,
                  borderRadius: 30,
                  height: 100,
                  borderWidth: 2,
                  borderColor: '#948D8D',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 28,
                  }}>
                  ورود
                </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => {
                this.props.navigation.navigate('');
              }}>
              <View
                style={{
                  margin: 20,
                  padding: 10,
                  borderRadius: 30,
                  height: 100,
                  borderWidth: 2,
                  borderColor: '#948D8D',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 28,
                  }}>
                  ورود پزشک
                </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => {
                this.props.navigation.navigate('SignUpPatient');
              }}>
              <View
                style={{
                  margin: 20,
                  padding: 10,
                  borderRadius: 30,
                  height: 100,
                  borderWidth: 2,
                  borderColor: '#948D8D',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 28,
                  }}>
                  ثبت نام
                </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => {
                this.props.navigation.navigate('');
              }}>
              <View
                style={{
                  margin: 20,
                  padding: 10,
                  borderRadius: 30,
                  height: 100,
                  borderWidth: 2,
                  borderColor: '#948D8D',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 28,
                  }}>
                  ثبت نام پزشک
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles1 = StyleSheet.create({
  txt1: {
    color: '#12f',
    backgroundColor: '#fdf',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 60,
    fontFamily: 'ScheherazadeRegOT',
  },
  txt2: {
    color: '#12f',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 60,
    backgroundColor: '#dd1',
  },
});
