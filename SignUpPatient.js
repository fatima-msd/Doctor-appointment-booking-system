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

import {ListItem, CheckBox, Picker, Icon} from 'native-base';
import MyButton from './Mybtn';
import styles from './Styles';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'dd.db'});


//import SQLite from 'react-native-sqlite-storage';


const {width, height} = Dimensions.get('screen');

/*const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});*/


export default class SignUpPatient extends Component {
  constructor(props) {
    super(props);

    // const db = SQLite.openDatabase(
    //   {
    //     name: 'test2.db',
    //     location: 'default',
    //     createFromLocation: '~www/test2.db',
    //   },
    //   () => {},
    //   error => {
    //     console.log(error);
    //   }
    // );
    this.state = {
      //db,
      users : [],
      Insurance: '0',
      Number: '',
      FirstName: '',
      LastName: '',
      Pass: '',
      RPass: '',

      ENumber: true,
      EFirstName: true,
      ELastName: true,
      EPass: true,
      ERPass: true,

      Sign: true,
    };
  }

  
  AddPatient =() => {
    //const {db} = this.state;

    /*function default_insert() {
      db.transaction(tx => {
          tx.executeSql('insert into INSURANCE(name)values ("تامین اجتماعی"),("بیمه ایران"),("بیمه بانک ملت"),("بیمه ارتش"),("بیمه دانا"),("آزاد");', [],
              (tx, results) => {
  
  
              });
  
      });
  }*/
  
    db.transaction(tx => {
      console.log("aaa")
        tx.executeSql(
            'SELECT * FROM USER where phone_number=? ',
            [this.state.Number],
            (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
              }
              var len = results.rows.length;
                console.log('len', len);
                console.log(temp);
                if (len > 0) {
                    alert('شماره تلفن تکراری است!');
                    this.setState({ENumber : false})
                    return false;
                } else {
                    db.transaction(tx => {
                        tx.executeSql('INSERT INTO USER (first_name,last_name,phone_number,password,insuranceId)values (?,?,?,?,?)', [this.state.FirstName, this.state.LastName,this.state.Number,this.state.Pass, this.state.Insurance])
                    });
                    global.Number = this.state.Number;
                    this.props.navigation.replace('App123',{Photo:null,Number:this.state.Number,FirstName:this.state.FirstName,LastName:this.state.LastName});
                  
                }
            }
        )
        ;
    });
}
/*
  AddPatient() {
    
    console.log('bemirrrrrrrrrrrrrr');
    const { Number } = this.state;
    
    /*db.transaction(tx => {
    tx.executeSql('INSERT into USER(first_name,phone_number) values("ali","3");', [], (tx, results)=> {
      var len = results.rows.length;
      console.log(len);
      console.log('complete insert');
    });});
    
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM USER;', [], (tx, results)=> {
              var len = results.rows.length;
              console.log(len);
              console.log('bemirrrrrrrrrrrrrr3');
              if (len > 0) {
                  return false;
              } else {
                  db.transaction(tx => {
                      tx.executeSql('INSERT INTO USER (first_name,last_name,phone_number,password)values (?,?,?,?);'), [this.state.FirstName, this.state.LastName,this.state.Number,this.state.Pass]
                  });
                  return true;
              }
          }
      )
      ;
  });
    
}*/
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
                height: height * 0.6,
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
                  ثبت نام برنامه
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
                    keyboardType= 'numeric'
                    onChangeText={txt => {
                      this.setState({Number: txt,ENumber:true});
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
                      this.setState({FirstName: txt,EFirstName:true});
                    }}
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
                      this.setState({LastName: txt,ELastName:true});
                    }}
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
                  onValueChange={txt =>{ this.setState({Insurance: txt})
                  console.log(txt)}}>
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
                      this.setState({Pass: txt,EPass:true});
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
                  تکرار کلمه عبور
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
                      this.setState({RPass: txt,ERPass:true});
                    }}
                  />
                  {this.state.ERPass ? null : (
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
                  flexDirection: 'column',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <MyButton
                  title="ثبت نام"
                  onPress={() => {
                    //this.props.navigation.navigate('App');
                    if (this.state.Number.trim() == '') {
                      this.setState({ENumber : false})
                      console.log("1")
                    }
                    else if (this.state.FirstName.trim() == '') {
                      this.setState({EFirstName : false})
                      console.log("2")
                    }
                    else if (this.state.LastName.trim() == '') {
                      this.setState({ELastName : false})
                      console.log("3")
                    }
                    else if (this.state.Pass.trim() == '') {
                      this.setState({EPass : false})
                      console.log("4")
                    }
                    else if (this.state.Pass != this.state.RPass) {
                      this.setState({ERPass : false})
                      console.log("5")
                    }
                    else{
                      //this.props.navigation.replace()
                      console.log("akhey")
                      this.AddPatient()
                      
                    }
                  }}
                  backgroundColor="#1F05F7"
                  color="#fff"
                  fontSize={28}
                  height={50}
                  borderRadius={100}
                  width={100}
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
