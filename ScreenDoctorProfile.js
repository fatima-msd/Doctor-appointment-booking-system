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
  ActivityIndicator
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

export default class ScreenDoctorProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
        
        DataSource : [],
        time : '',
        loading:true
    };

    db.transaction(tx => {
      console.log(global.DataSourceD.username)
      tx.executeSql('select first_name,\n' +
          '       last_name,\n' +
          '       medical_council_code,\n' +
          '       SPECIALTY.name,\n' +
          '       street,\n' +
          '       alley,\n' +
          '       plaque,\n' +
          '       phone_number\n' +
          '\n' +
          'from DOCTOR,\n' +
          '     DOH,\n' +
          '     ADDRESS,\n' +
          '     ADDRESS_TEXT,\n' +
          '     DOCTOR_OFFICE,\n' +
          '     SPECIALTY,\n' +
          '     WORK_HOUR\n' +
          '\n' +
          'where DOCTOR.username = ?\n' +
          '  and DOH.doctorId = DOCTOR.username\n' +
          '  and DOCTOR.specialtyId = SPECIALTY.specialtyId\n' +
          '  and ADDRESS.address_text_id = ADDRESS_TEXT.address_text_id\n' +
          '  and DOH.doctor_office_id = DOCTOR_OFFICE.docror_office_id\n' +
          '  and WORK_HOUR.doh_id = DOH.doh_id\n' +
          '  and addressId = address_id\n' +
          'group by ADDRESS.addressId, username;\n', [global.DataSourceD.username],
          (tx, results) => {
              console.log('show_one_doctor_offic');
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                  temp.push(results.rows.item(i));
              }
              //set state //todo  moshakhasatesh va matabesh
              console.log(temp)
              this.setState({DataSource: temp[0]})
              console.log(temp[0])

          });
  });


  db.transaction(tx => {
    tx.executeSql('select year, month, day, start_hour\n' +
        'from (select year, month, day, start_hour\n' +
        '      from (select year, month, day, start_hour\n' +
        '            from WORK_HOUR,\n' +
        '                 DHH,\n' +
        '                 DOCTOR,\n' +
        '                 DATE\n' +
        '\n' +
        '            where (work_hour_id not in (select work_hour_id from reserve_dhh)\n' +
        '                and DOCTOR.username = ? and DOCTOR.username = DHH.doctorId and\n' +
        '                   WORK_HOUR.dhh_id = DHH.dhh_id\n' +
        '                and WORK_HOUR.date_id = DATE.date_id)\n' +
        '\n' +
        '\n' +
        '            order by year, month, day, start_hour) tmp\n' +
        '      union\n' +
        '      select year, month, day, start_hour\n' +
        '      from WORK_HOUR,\n' +
        '           DOH,\n' +
        '           DOCTOR,\n' +
        '           DATE\n' +
        '\n' +
        '      where (work_hour_id not in (select work_hour_id from reserve_doh)\n' +
        '          and DOCTOR.username = ? and DOCTOR.username = DOH.doctorId and WORK_HOUR.doh_id = DOH.doh_id\n' +
        '          and WORK_HOUR.date_id = DATE.date_id)\n' +
        '     ) tmp2\n' +
        'order by year, month, day, start_hour\n' +
        'limit 1\n' +
        ';\n', [global.DataSourceD.username,global.DataSourceD.username],
        (tx, results) => {
            console.log('show_first');
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
            }
            //set state //todo  avalin nobate khalish
            
            var t = temp[0].year.toString() + '/' +temp[0].month.toString() + "/" +temp[0].day.toString() + "   " + temp[0].start_hour.toString();
            
            this.setState({time : t ,loading:false})
            
        });

});
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

    if (this.state.loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    }
    console.log(this.state.DataSource)
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
        <View style={{margin: 10, borderRadius: 30, backgroundColor: '#fff'}}>
          <View
            style={{
              height: height * 0.05,

              padding: 10,
              paddingRight: 40,
              paddingLeft: 40,
              flexDirection: 'row-reverse',
              alignItems: 'flex-end',
            }}>
            <Text style={{color: '#123ccc'}}>{'نام  :  '}</Text>
            <Text style={{}}>{this.state.DataSource.first_name}</Text>
          </View>
          <View
            style={{
              height: height * 0.05,

              padding: 10,
              paddingRight: 40,
              paddingLeft: 40,
              //justifyContent:'flex-start',
              flexDirection: 'row-reverse',
              alignItems: 'flex-end',
            }}>
            <Text style={{color: '#123ccc'}}>{'نام خانوادگی  :  '}</Text>
            <Text style={{}}>{this.state.DataSource.last_name}</Text>
          </View>
          <View
            style={{
              height: height * 0.05,
              padding: 10,
              paddingRight: 40,
              paddingLeft: 40,

              flexDirection: 'row-reverse',
              alignItems: 'flex-end',
            }}>
            <Text style={{color: '#123ccc'}}>{'متخصص  :  '}</Text>
            <Text style={{}}>{this.state.DataSource.name}</Text>
          </View>

          <View
            style={{
              height: height * 0.05,
              padding: 10,
              paddingRight: 40,
              paddingLeft: 40,

              flexDirection: 'row-reverse',
              alignItems: 'flex-end',
            }}>
            <Text style={{color: '#123ccc'}}>{'کد نظام پزشکی  :  '}</Text>
            <Text style={{}}>{this.state.DataSource.medical_council_code}</Text>
          </View>

          <View
            style={{
              height: height * 0.05,
              padding: 10,
              paddingRight: 40,
              paddingLeft: 40,

              flexDirection: 'row-reverse',
              alignItems: 'flex-end',
            }}>
            <Text style={{color: '#123ccc'}}>{'اولین نوبت خالی   :  '}</Text>
            <Text style={{}}>{this.state.time}</Text>
          </View>
          <View
            style={{
              height: height * 0.05,
              padding: 10,
              paddingRight: 40,
              paddingLeft: 40,

              flexDirection: 'row-reverse',
              alignItems: 'flex-end',
            }}>
            <Text style={{color: '#123ccc'}}>{'آدرس مطب   :  '}</Text>
            <Text style={{}}>{ " خیابان : " +  this.state.DataSource.street + " کوچه :" + this.state.DataSource.alley+ " پلاک : " +  this.state.DataSource.plaque}</Text>

            
          </View>
          <View
            style={{
              height: height * 0.05,
              padding: 10,
              paddingRight: 40,
              paddingLeft: 40,

              flexDirection: 'row-reverse',
              alignItems: 'flex-end',
            }}>
            <Text style={{color: '#123ccc'}}>{'شماره تلفن   :  '}</Text>
            <Text style={{}}>{this.state.DataSource.phone_number}</Text>
          </View>

          {/* <Text
                style={{
                  textAlign: 'center',
                  color: '#0A0A0A',
                  fontSize: 15,
                }}>
                {'اولین نوبت خالی:' + this.props.item.year + '/' +this.props.item.month + "/" +this.props.item.day + "   " + this.props.item.start_hour +"-"+ this.props.item.end_hour}
              </Text> */}
        </View>
      </ImageBackground>
    );
  }
}
