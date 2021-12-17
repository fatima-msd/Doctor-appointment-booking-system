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
} from 'react-native';

import {Icon} from 'native-base';
import MyButton from './Mybtn';
import styles from './Styles';

const {width, height} = Dimensions.get('screen');
import SQLite from 'react-native-sqlite-storage';
/*import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'test2.db' }); */



/*const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});*/

export default class LoginPatient extends Component {
  constructor(props) {
    super(props);
    const db = SQLite.openDatabase(
      {
        name: 'dd.db',
        location: 'default',
        createFromLocation: '~www/dd.db',
      },
      () => {console.log("eyval")},
      error => {
        console.log(error);
      },
    );
    this.state = {
      db,
      Number: '',
      Pass: '',
      ENumber: true,
      EPass: true,
    };
  }

  signup_doctor() {
    const {db} = this.state;
    db.transaction(tx => {
       tx.executeSql('INSERT INTO DOCTOR (username,first_name,last_name,password,medical_council_code,visit_price) values ("ali_rahimi22","ali2","rahimi2","12342","1212","120002");', (tx, results) => {
          console.log("doci insert");
       });
   });

}

  LoginPatient() {
    const {db} = this.state;
    db.transaction(tx => {
      console.log("aaa")
      console.log(this.state.Number)
      tx.executeSql(
        'SELECT * FROM USER where phone_number= ? ;',
        [this.state.Number],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len == 0) {
            this.setState({ENumber: false});
            alert('شماره تلفن  اشتباه است!');
          } else {
            db.transaction(tx => {
              tx.executeSql(
                'select  * from USER where phone_number=? and password=?',
                [this.state.Number, this.state.Pass],
                (tx, results) => {
                  var len = results.rows.length;
                  console.log('lene565', len);
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                      temp.push(results.rows.item(i));
                    }
                      console.log(temp);
                  if (len == 0) {
                    this.setState({EPass: false});
                    alert('رمز عبور اشتباه است!');
                  } else {
                    
                    global.Number = temp[0].phone_number;
                    this.props.navigation.replace('App123',{Photo:temp[0].photo,Number:temp[0].phone_number,FirstName:temp[0].first_name,LastName:temp[0].last_name});
                  }
                });
            });

          }
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
                height: 350,
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
                  ورود به برنامه
                </Text>
              </View>
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
                    dataDetectorTypes="phoneNumber"
                    keyboardType="number-pad"
                    onChangeText={txt => {
                      this.setState({Number: txt, ENumber: true});
                    }}
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
                  کلمه عبور
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
                    secureTextEntry={true}
                    onChangeText={txt => {
                      this.setState({Pass: txt, EPass: true});
                    }}
                  />
                  {this.state.EPass ? null : (
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
              {/* <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "flex-end",
                borderRadius: 5,
                paddingRight : 10,
              }}
            >
              <Text
                selectable={true}
                style={{ fontWeight: "bold", fontSize: 13, color: "#131314" }}
              >
                عبارت امنیتی
              </Text>
              <TextInput
                style={{
                  fontFamily: "ScheherazadeRegOT",
                  fontSize: 10,
                  borderColor: "#E0E0E0",
                  backgroundColor: "#fff",
                  borderWidth: 1.2,
                  borderRadius: 4,
                  width: "85%",
                  height: 30,
                  marginLeft: "14%",
                  marginRight: "1%"
                }}
                multiline={false}
              />
            </View> */}

              {/* <ListItem
              style={{
                width: 138,
                height: 30
              }}
            >
              <View style={{ marginRight: 10 }}>
                <Text
                  onPress={() => {
                    this.setState({
                      checkboxRemember: !this.state.checkboxRemember
                    });
                  }}
                  style={{ fontSize: 10 }}
                >
                  من را به خاطر بسپار
                </Text>
              </View>
              <View>
                <CheckBox
                  onPress={() => {
                    this.setState({
                      checkboxRemember: !this.state.checkboxRemember
                    });
                    
                  }}
                  checked={this.state.checkboxRemember}
                />
              </View>
            </ListItem> */}
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    paddingBottom: 30,
                  }}>
                  <MyButton
                    title="ورود"
                    onPress={() => {
                      if (this.state.Number.trim() == '') {
                        this.setState({ENumber: false});
                      } else if (this.state.Pass.trim() == '') {
                        this.setState({EPass: false});
                      } else {
                        this.LoginPatient();
                      }
                    }}
                    backgroundColor="#1F05F7"
                    color="#fff"
                    fontSize={28}
                    height={50}
                    borderRadius={100}
                    width={100}
                  />
                </View>
                <View
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
                </View>
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

/*
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F00',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
*/
