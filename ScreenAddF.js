import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  StatusBar,
  Button,
  ImageBackground,
  Dimensions,
  Alert,
  TouchableNativeFeedback,
} from 'react-native';

import {ListItem, CheckBox, Picker, Icon} from 'native-base';
import MyButton from './Mybtn';
import styles from './Styles';
//import SQLite from 'react-native-sqlite-storage';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'dd.db'});
import ImagePicker from 'react-native-image-picker';

const {width, height} = Dimensions.get('screen');

/*const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});*/

export default class ScreenAddF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   Insurance: this.props.navigation.getParam("Insurance",''),
      //   Number: this.props.navigation.getParam("Number",''),
      //   FirstName: this.props.navigation.getParam("FirstName",''),
      //   LastName: this.props.navigation.getParam("LastName",''),
      //   Photo: this.props.navigation.getParam("Photo",''),
      //   BirthDay: this.props.navigation.getParam("BirthDay",''),
      //   GenderID:this.props.navigation.getParam("GenderID",''),
      NumberLogIn: this.props.navigation.getParam('Number', ''),
      Insurance: 1,
      NewNumber: '',
      FirstName: '',
      LastName: '',

      ENumber: true,
      EFirstName: true,
      ELastName: true,
    };
  }

  AddFamily() {
    if (this.state.NewNumber == this.state.NumberLogIn) {
      Alert.alert('شماره خودتان رو وارد کرده اید');
      this.setState({ENumber: false});
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'select * from USER  where phone_number=? ',
        [this.state.NewNumber],
        (tx, results) => {
          console.log('user2 in database?');
          var len = results.rows.length;
          if (len == 0) {
            db.transaction(tx => {
              tx.executeSql(
                'INSERT INTO USER (first_name,last_name,phone_number,insuranceId)values (?,?,?);',
                [
                  this.state.FirstName,
                  this.state.LastName,
                  this.state.NewNumber,
                  this.state.Insurance
                ],
                (tx, results) => {
                  console.log('insert_new_complete');
                  Alert.alert('در طبیب یاب عضو شد');
                },
              );
            });
          }
          db.transaction(tx => {
            tx.executeSql(
              'insert into FAMILY_REL(user1_id, user2_id) values (?,?);',
              [this.state.NumberLogIn, this.state.NewNumber],
              (tx, results) => {
                console.log('insert_family_complete');
                Alert.alert('به خانواده اضافه شد');
                this.props.navigation.replace('ScreenListFamily', {
                  Number: this.state.NumberLogIn,
                });
              },
            );
          });

          
        },
      );
    });
  }

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
          <View
            style={{
              //backgroundColor: "#fff",
              flex: 14,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '60%',
                height: height * 0.7,
                backgroundColor: '#89E3F7',
                borderColor: '#0277BD',
                borderWidth: 1,
                marginTop: 20,
                marginRight: 10,
                borderRadius: 5,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  //backgroundColor: '#0277BD',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  borderRadius: 5,
                  paddingRight: 10,
                  borderWidth: 1,
                  borderColor: '#0277BD',
                }}>
                <Text
                  selectable={true}
                  style={{fontWeight: 'bold', fontSize: 18, color: '#F70543'}}>
                  ویرایش پروفایل کاربری
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  padding: 10,
                  margin: 0,
                }}
              />
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  borderRadius: 5,
                  marginTop: 5,
                  paddingRight: 10,
                }}>
                <Text
                  selectable={true}
                  style={{fontWeight: 'bold', fontSize: 13, color: '#131314'}}>
                  شماره همراه
                </Text>
                <View
                  style={{
                    flexDirection: 'row-reverse',
                  }}>
                  <TextInput
                    style={{
                      color: '#000',
                      fontFamily: 'ScheherazadeRegOT',
                      fontSize: 10,
                      borderColor: '#E0E0E0',
                      backgroundColor: '#fff',
                      borderWidth: 1.2,
                      borderRadius: 4,
                      width: '85%',
                      height: 40,
                      marginRight: '1%',
                    }}
                    dataDetectorTypes="phoneNumber"
                    keyboardType="number-pad"
                    onChangeText={txt => {
                      this.setState({NewNumber: txt, ENumber: true});
                    }}
                    value={this.state.NewNumber}
                  />
                  {this.state.ENumber ? null : (
                    <Icon
                      name="error-outline"
                      type="MaterialIcons"
                      style={{
                        color: 'red',
                      }}
                    />
                  )}
                </View>
              </View>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  borderRadius: 5,
                  paddingRight: 10,
                }}>
                <Text
                  selectable={true}
                  style={{fontWeight: 'bold', fontSize: 13, color: '#131314'}}>
                  نام
                </Text>
                <View style={{flexDirection: 'row-reverse'}}>
                  <TextInput
                    style={{
                      color: '#000',
                      fontFamily: 'ScheherazadeRegOT',
                      fontSize: 10,
                      borderColor: '#E0E0E0',
                      backgroundColor: '#fff',
                      borderWidth: 1.2,
                      borderRadius: 4,
                      width: '85%',
                      height: 40,
                      marginRight: '1%',
                    }}
                    multiline={false}
                    keyboardType="numbers-and-punctuation"
                    onChangeText={txt => {
                      this.setState({FirstName: txt, EFirstName: true});
                    }}
                    value={this.state.FirstName}
                  />
                  {this.state.EFirstName ? null : (
                    <Icon
                      name="error-outline"
                      type="MaterialIcons"
                      style={{
                        color: 'red',
                      }}
                    />
                  )}
                </View>
              </View>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  borderRadius: 5,
                  paddingRight: 10,
                }}>
                <Text
                  selectable={true}
                  style={{fontWeight: 'bold', fontSize: 13, color: '#131314'}}>
                  نام خانوادگی
                </Text>
                <View style={{flexDirection: 'row-reverse'}}>
                  <TextInput
                    style={{
                      color: '#000',
                      fontFamily: 'ScheherazadeRegOT',
                      fontSize: 10,
                      borderColor: '#E0E0E0',
                      backgroundColor: '#fff',
                      borderWidth: 1.2,
                      borderRadius: 4,
                      width: '85%',
                      height: 40,
                      marginRight: '1%',
                    }}
                    multiline={false}
                    keyboardType="numbers-and-punctuation"
                    onChangeText={txt => {
                      this.setState({LastName: txt, ELastName: true});
                    }}
                    value={this.state.LastName}
                  />
                  {this.state.ELastName ? null : (
                    <Icon
                      name="error-outline"
                      type="MaterialIcons"
                      style={{
                        color: 'red',
                      }}
                    />
                  )}
                </View>
              </View>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  borderRadius: 5,
                  paddingRight: 10,
                }}>
                <Text
                  selectable={true}
                  style={{fontWeight: 'bold', fontSize: 13, color: '#131314'}}>
                  نوع بیمه
                </Text>
                <Picker
                  note
                  mode="dropdown"
                  style={{width: '100%', color: '#000'}}
                  selectedValue={this.state.Insurance}
                  onValueChange={txt => this.setState({Insurance: txt})}>
                  <Picker.Item label="تامین اجتماعی" value={1} />
                  <Picker.Item label="بیمه ایران" value={2} />
                  <Picker.Item label="بیمه بانک ملت" value={3} />
                  <Picker.Item label="بیمه ارتش" value={4} />
                  <Picker.Item label="بیمه دانا" value={5} />
                  <Picker.Item label="آزاد" value={6} />
                </Picker>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  alignItems: 'center',
                  marginBottom: 2,
                }}>
                <MyButton
                  title="اضافه کردن به خانواده"
                  onPress={() => {
                    //this.props.navigation.navigate('App');
                    if (this.state.NewNumber.trim() == '') {
                      this.setState({ENumber: false});
                    } else if (this.state.FirstName.trim() == '') {
                      this.setState({EFirstName: false});
                    } else if (this.state.LastName.trim() == '') {
                      this.setState({ELastName: false});
                    } else {
                      this.AddFamily();
                    }
                  }}
                  backgroundColor="#1F05F7"
                  color="#fff"
                  fontSize={18}
                  height={30}
                  borderRadius={100}
                  width={150}
                />
                {/* <View
                  style={{
                    flex: 1,
                    padding: 10,
                    margin: 20,
                  }}>
                  <MyButton
                    title="کلمه رمز خود را فراموش کرده ام!!"
                    onPress={() => {}}
                    backgroundColor=""
                    color="#000"
                    fontSize={12}
                    height={10}
                    width={150}
                  />
                </View> */}
              </View>
            </View>
          </View>

          {/* <View
                    style={{
                        backgroundColor: "#0f0",
                        height: 40,
                        flexDirection: "row-reverse",
                        justifyContent: "space-around"
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#aba",
                            height: 40,
                            flexDirection: "row-reverse",
                            justifyContent: "space-around",
                            flex: 1
                        }}
                    >
                        <Button title=" ثبت نام" onPress={() => {}} />
                    </View>
                    <View
                        style={{
                            backgroundColor: "#",
                            height: 40,
                            flexDirection: "row-reverse",
                            justifyContent: "space-around",
                            flex: 1
                        }}
                    >
                        <Button title=" فراموشی رمز عبور" onPress={() => {}} />
                    </View>
                </View> */}
        </ImageBackground>
      </View>
    );
  }
}
