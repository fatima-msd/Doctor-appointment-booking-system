//14CF71 -> header

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
  ScrollView,
  ListView,
  Modal,
  Alert,
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Segment,
  Content,
  Text,
  Footer,
  FooterTab,
  Fab,
  View,
  Drawer,
  Item,
  Input,
  Icon,
  Picker,
} from 'native-base';

import CustomMultiPicker from './SelectList';
import MyButton from './Mybtn';
import FamilyFlatList from './FamilyFlatList';
import SideBar from './SideBar';
import styles from './Styles';
//var Realm = require('realm');
//import realm from './DatabaseRecipe';
const {width, height} = Dimensions.get('screen');
//import Icon from 'react-native-vector-icons/MaterialIcons';
//import SQLite from 'react-native-sqlite-storage';

import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'dd.db'});
var options = [];
var options2 = [];
export default class ScreenAppointmentBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DataSource: [],
      user_id: -1,
      loading: false,

      username: global.username_doci,
      user_taker_id: global.Number,
      work_hour_id: -1,
      first_name: global.first_name_doci,
      last_name: global.last_name_doci,
      DataSource2: [],
    };

    db.transaction(tx => {
      tx.executeSql(
        'select street,\n' +
          '\n' +
          '       alley,\n' +
          '       plaque,\n' +
          '       first_name,\n' +
          '       last_name,\n' +
          '       year,\n' +
          '       month,\n' +
          '       day,\n' +
          '       start_hour,\n' +
          '       end_hour,\n' +
          '       name,\n' +
          '       work_hour_id\n' +
          'from (\n' +
          '         select *\n' +
          '         from (\n' +
          '                  select street,WORK_HOUR.work_hour_id,\n' +
          '                         alley,\n' +
          '                         plaque,\n' +
          '                         first_name,\n' +
          '                         last_name,\n' +
          '                         year,\n' +
          '                         month,\n' +
          '                         day,\n' +
          '                         start_hour,\n' +
          '                         end_hour,\n' +
          '                         specialtyId\n' +
          '                  from WORK_HOUR,\n' +
          '                       DOCTOR,\n' +
          '                       DATE,\n' +
          '                       DOH,\n' +
          '                       ADDRESS_TEXT,\n' +
          '                       ADDRESS,\n' +
          '                       DOCTOR_OFFICE,\n' +
          '                       reserve_dhh\n' +
          '                  where WORK_HOUR.work_hour_id not in (select work_hour_id from reserve_dhh)\n' +
          '                    and DOCTOR.username = ? ' +
          '                    and WORK_HOUR.doh_id = DOH.doh_id\n' +
          '                    and ADDRESS.address_text_id = ADDRESS_TEXT.address_text_id\n' +
          '                    and DOH.doctor_office_id = DOCTOR_OFFICE.docror_office_id\n' +
          '                    and DOCTOR_OFFICE.address_id = addressId\n' +
          '                    and doctorId = username\n' +
          '                    and DATE.date_id = WORK_HOUR.date_id\n' +
          '                  union\n' +
          '                  select street,WORK_HOUR.work_hour_id,\n' +
          '                         alley,\n' +
          '                         plaque,\n' +
          '                         first_name,\n' +
          '                         last_name,\n' +
          '                         year,\n' +
          '                         month,\n' +
          '                         day,\n' +
          '                         start_hour,\n' +
          '                         end_hour,\n' +
          '                         specialtyId\n' +
          '                  from WORK_HOUR,\n' +
          '                       DOCTOR,\n' +
          '                       DATE,\n' +
          '                       DHH,\n' +
          '                       ADDRESS_TEXT,\n' +
          '                       ADDRESS,\n' +
          '                       HEALTH_CARE_CENTER,\n' +
          '                       reserve_dhh\n' +
          '                  where WORK_HOUR.work_hour_id not in (select work_hour_id from reserve_dhh)\n' +
          '                    and DOCTOR.username = ? ' +
          '                    and WORK_HOUR.dhh_id = DHH.dhh_id\n' +
          '                    and ADDRESS.address_text_id = ADDRESS_TEXT.address_text_id\n' +
          '                    and DHH.health_care_center_id = HEALTH_CARE_CENTER.health_care_center_id\n' +
          '                    and HEALTH_CARE_CENTER.addressId = ADDRESS.addressId\n' +
          '                    and doctorId = username\n' +
          '                    and DATE.date_id = WORK_HOUR.date_id) tmp1\n' +
          '         order by year, month, day, start_hour) tmp2,\n' +
          '     SPECIALTY\n' +
          'where tmp2.specialtyId = SPECIALTY.specialtyId\n' +
          'order by year, month, day, start_hour\n' +
          ';',
        [this.state.username, this.state.username],
        (tx, results) => {
          console.log('work_hour_complete');
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            var time =
              temp[i].year +
              '/' +
              temp[i].month +
              '/' +
              temp[i].day +
              '  ساعت  ' +
              temp[i].start_hour +
              ' - ' +
              temp[i].end_hour +
              '\n' +
              ' خیابان : ' +
              '\n' +
              temp[i].street +
              ' کوچه : ' +
              temp[i].alley +
              ' پلاک : ' +
              temp[i].plaque;
            var id = temp[i].work_hour_id;
            id = id.toString();
            options[id] = time;
            //  options.push({[id]:time});
            console.log(options[i]);
          }
          console.log(temp);
          this.setState({DataSource: temp});

          var len = temp.length;
          for (let i = 1; i <= len; i++) {}
        },
      );
    });

    db.transaction(tx => {
      tx.executeSql(
        'select USER.first_name,USER.last_name,USER.phone_number,INSURANCE.name\n' +
          'from USER,\n' +
          '     FAMILY_REL,INSURANCE\n' +
          'where user1_id= ? and user2_id=phone_number and USER.insuranceId=INSURANCE.insuranceId\n',
        [this.state.user_taker_id],
        (tx, results) => {
          console.log('show_all_family');
          console.log(this.state.Number);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            var f = temp[i].first_name + '  ' + temp[i].last_name;
            var p = temp[i].phone_number;
            options2[p] = f;
            console.log('_dsnkn________');
            console.log(options2[i]);
          }
          //set state //todo
          console.log(options2);
          this.setState({DataSource2: temp, loading: false});
        },
      );
    });
    console.log('_____________________________________');
    console.log(options);
  }

  /*createDir() {
    var destPath = RNFS.DocumentDirectoryPath + '/' + this.state.Image;
    RNFS.mkdir(destPath);
  }*/

  App() {
    db.transaction(tx => {
      global.x = global.x + 1;
      var h1 = '"' + this.state.user_id + '"';
      console.log(h1);
      var h2 = '"' + this.state.user_taker_id + '"';
      var h3 = '"' + this.state.username + '"';

      var hh =
        'insert into APPOINTMENT (doctor_id, user_id, work_hour_id,user_taker_id,payment_id) values ( ' +
        h3 +
        ' , ' +
        h1 +
        ',' +
        this.state.work_hour_id.toString() +
        ', ' +
        h2 +
        ',' +
        global.x.toString() +
        ');';
      console.log(hh);
      tx.executeSql(
        hh,
        [], //todo
        (tx, results) => {
          console.log('add_complete');
          this.props.navigation.goBack()
        },
      );
    });

    db.transaction(tx => {
      global.y = global.y + 1;
      var h11 = '"' + global.y.toString() + '"';
      var hy =
        'insert into PAYMENT(payment_code,payment_id) values (' +
        h11 +
        ',' +
        global.x.toString +
        ');';
      tx.executeSql(hy, [], (tx, results) => {
        console.log('add_complete');
      });
    });
  }

  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View>
        <Text style={{textAlign: 'center'}}>لیست اعضای خانواده خالی است</Text>
      </View>
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{height: height}}>
        <View
          style={{
            backgroundColor: '#484c7f',
            flexDirection: 'column',
            height: height * 0.1,
          }}>
          <View
            style={{flexDirection: 'row', height: height * 0.05, marginTop: 5}}>
            <StatusBar backgroundColor="#484c7f" barStyle="light-content" />

            <View style={styles.headerLeftP}>
              <MyButton
                width={35}
                marginTop={8}
                marginBottom={8}
                onPress={() => {
                  this.setState({});
                  // console.log(height);
                  //console.log(global.refreshRecipe);
                }}
                title=""
                fontSizeIcon={10}
                backgroundColor="#484c7f"
                color="#fff"
                colorIcon="#fff"
                Icon={true}
                nameIcon="more-vert"
                typeIcon="MaterialIcons"
              />
              <MyButton
                title="تایید نوبت"
                onPress={() => {
                  if (this.state.user_id == -1) {
                    Alert.alert('بیمار را انتخاب کنید');
                  } else if (this.state.work_hour_id == -1) {
                    Alert.alert('ساعت مورد نظر را انتخاب کنید');
                  } else {
                    this.App();
                    Alert.alert('نوبت گرفته شد');
                  }
                }}
                backgroundColor="#f84c7f"
                color="#fff"
                fontSize={12}
                height={30}
                borderRadius={100}
                width={50}
              />
            </View>

            <View style={styles.headerBodyP}>
              <Text style={styles.title}>Doci</Text>
            </View>
          </View>
          <View style={{flex: 1, marginRight: 3}}>
            <Text style={styles.TitleScreen}>انتخاب روز نوبت</Text>
          </View>
        </View>
        <View style={{width: width, height: height * 0.9}}>
          <ImageBackground
            imageStyle={{resizeMode: 'stretch'}}
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              flexDirection: 'column',
            }}
            source={require('./images/blue-white1.jpg')}>
            <View style={styles.AppBooking} opacity={1}>
              <View style={{margin: 10}}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#0A0A0A',
                    fontWeight: 'bold',
                    fontSize: 20,
                    textDecorationLine: 'underline',
                  }}>
                  {this.state.first_name + ' ' + this.state.last_name}
                </Text>
              </View>
            </View>
            {/* <View style={{width: '80%', backgroundColor: '#BFA1F490', margin: '10%'}}> */}
            <View style={{}}>
              <CustomMultiPicker
                options={options}
                search={false}
                multiple={false}
                placeholderTextColor={'#757575'}
                returnValue={'value'} // label or value
                callback={res => {
                  console.log(res);
                  this.setState({work_hour_id: res});
                }} // callback, array of selected items
                rowBackgroundColor={'#BFA1F4'}
                rowHeight={70}
                rowRadius={5}
                iconColor={'#00a2dd'}
                iconSize={30}
                selectedIconName={'check-circle'}
                unselectedIconName={'radio-button-unchecked'}
                scrollViewStyle={{height: 300}}
                labelStyle={{textAlign: 'auto'}}
                selected={['-1']} // list of options which are selected by default
              />
            </View>
            <View style={{height: '50%'}}>
              <Text> "انتخاب اعضای خانواده"</Text>
              <CustomMultiPicker
                options={options2}
                search={false}
                multiple={false}
                placeholderTextColor={'#757575'}
                returnValue={'value'} // label or value
                callback={res => {
                  console.log(res);
                  this.setState({user_id: res});
                }} // callback, array of selected items
                rowBackgroundColor={'#BFAfF4'}
                rowHeight={70}
                rowRadius={5}
                iconColor={'#00a2dd'}
                iconSize={30}
                selectedIconName={'check-circle'}
                unselectedIconName={'radio-button-unchecked'}
                scrollViewStyle={{height: 400}}
                labelStyle={{textAlign: 'auto'}}
                selected={['-1']} // list of options which are selected by default
              />
            </View>

            {/* </View> */}
            {/* <View style={{height: height * 0.08}} /> */}
          </ImageBackground>
        </View>
      </View>
    );
  }
}
