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
export default class ScreenDoctorAddress extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      

      DataSource : [],
      loading:true
      
      
    };

    db.transaction(tx => {
      console.log(global.DataSourceD.username)
      console.log("ds")
      tx.executeSql('select        street,\n' +
          '       alley,\n' +
          '       plaque,\n' +
          '       HEALTH_CARE_CENTER.phone_number\n' +
          '\n' +
          'from DOCTOR,\n' +
          '     DHH,\n' +
          '     ADDRESS,\n' +
          '     ADDRESS_TEXT,\n' +
          '     HEALTH_CARE_CENTER,\n' +
          '     WORK_HOUR\n' +
          'where DOCTOR.username = ?\n' +
          '  and DHH.doctorId = DOCTOR.username\n' +
          '  and WORK_HOUR.dhh_id = DHH.dhh_id\n' +
          '  and ADDRESS.address_text_id = ADDRESS_TEXT.address_text_id\n' +
          '  and DHH.health_care_center_id = HEALTH_CARE_CENTER.health_care_center_id\n' +
          '  and ADDRESS.addressId = HEALTH_CARE_CENTER.addressId\n' +
          'group by ADDRESS.addressId,username;\n', [global.DataSourceD.username],
          (tx, results) => {
              console.log('show_one_doctor_hospital');
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                  temp.push(results.rows.item(i));
              }
              
              this.setState({DataSource:temp,loading:false})

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
        <View style={{margin: 10, borderRadius: 30, backgroundColor: '#fff',flexDirection:'row-reverse',height:'40%',justifyContent:'center',alignItems:'center'}}>

        <View style={{width:'30%',justifyContent:'flex-start',alignItems:'flex-end'}}>
              <Text
                style={{
                  textAlign:  'right',
                  color: '#0A0A0A',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                {" نام دکتر : "+ "\n" + ' تخصص : ' + "\n" + "آدرس بیمارستان : " + "\n\n" + " شماره تلفن : "}
              </Text>
            </View>
            <View style={{justifyContent:'flex-start',alignItems:'flex-end'}}>
              <Text
                style={{
                  textAlign:  'right',
                  fontSize: 15,
                  textDecorationLine:'underline'
                }}>
                {global.DataSourceD.first_name + " " + global.DataSourceD.last_name +"\n"+ global.DataSourceD.name  +"\n"   + " خیابان : " +  global.DataSourceD.street + "\n کوچه :" + global.DataSourceD.alley+ " پلاک : " +  global.DataSourceD.plaque +"\n" +global.DataSourceD.phone_number}
              </Text>
            </View>
          {/* <View
            style={{
              height: height * 0.05,

              padding: 10,
              paddingRight: 40,
              paddingLeft: 40,
              flexDirection: 'row-reverse',
              alignItems: 'flex-end',
            }}>
            <Text style={{color: '#123ccc'}}>{'آدرس مطب  :  '}</Text>
            <Text style={{}}>{global.DataSourceD.first_name}</Text>
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
            <Text style={{color: '#123ccc'}}>{'شماره مطب  :  '}</Text>
            <Text style={{}}>{global.DataSourceD.last_name}</Text>
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
            <Text style={{color: '#123ccc'}}>{'اسم بیمارستان  :  '}</Text>
            <Text style={{}}>{global.DataSourceD.name}</Text>
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
            <Text style={{color: '#123ccc'}}>{'آدرس بیمارستان  :  '}</Text>
            <Text style={{}}>{global.DataSourceD.medical_council_code}</Text>
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
            <Text style={{color: '#123ccc'}}>{'شماره بیمارستان  :  '}</Text>
            <Text style={{}}>{global.DataSourceD.medical_council_code}</Text>
          </View> */}
        </View>
      </ImageBackground>
     
    );
  }
}
