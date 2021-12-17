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
  ActivityIndicator
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
  CheckBox 
} from 'native-base';
//import * as RNFS from 'react-native-fs';
// import {componentDidAppear} from 'react-navigation'
import MyButton from './Mybtn';
import AppointmentFlatList from './AppointmentFlatList';
import SideBar from './SideBar';
import styles from './Styles';
//var Realm = require('realm');
//import realm from './DatabaseRecipe';
const {width, height} = Dimensions.get('screen');
//import Icon from 'react-native-vector-icons/MaterialIcons';
//import SQLite from 'react-native-sqlite-storage';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'dd.db' }); 

export default class ScreenListAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DataSource:[],
      DataSource2:[],
      loading: true ,
      Number: this.props.navigation
      .dangerouslyGetParent()
      .getParam('Number', ''),
      check : false
    };

    db.transaction(tx => {
      tx.executeSql(
          '\n' +
          'select USER.first_name,\n' +
          '       USER.last_name,\n' +
          '       DOCTOR.first_name as doctor_name,\n' +
          '       DOCTOR.last_name as doctor_lastname,\n' +
          '       year,\n' +
          '       month,\n' +
          '       day,\n' +
          '       start_hour,\n' +
          '       end_hour,\n' +
          '       street,\n' +
          '       alley,\n' +
          '       plaque\n' +
          'from USER,\n' +
          '     DATE,\n' +
          '     ADDRESS,\n' +
          '     ADDRESS_TEXT,\n' +
          '     DOCTOR,\n' +
          '\n' +
          '     (\n' +
          '         select user_id, doctor_id, WORK_HOUR.date_id, appointment_id, start_hour, end_hour, DOCTOR_OFFICE.address_id\n' +
          '         from APPOINTMENT,\n' +
          '              WORK_HOUR,\n' +
          '              DOCTOR_OFFICE,\n' +
          '              DOH,\n' +
          '              reserve_doh\n' +
          '         where APPOINTMENT.work_hour_id = WORK_HOUR.work_hour_id\n' +
          '           and WORK_HOUR.doh_id = DOH.doh_id\n' +
          '           and DOCTOR_OFFICE.docror_office_id = DOH.doctor_office_id\n' +
          '           and APPOINTMENT.user_id in (select phone_number\n' +
          '                                       from USER,\n' +
          '                                            FAMILY_REL\n' +
          '                                       where user1_id =?' +
          '                                         and user2_id = USER.phone_number\n' +
          '                                       union\n' +
          '                                       select phone_number\n' +
          '                                       from USER\n' +
          '                                       where phone_number =?' + ')' +
          '\n' +
          '           and WORK_HOUR.work_hour_id in (select work_hour_id from reserve_doh)\n' +
          '         union\n' +

          '         select user_id,\n' +
          '                doctor_id,\n' +
          '                WORK_HOUR.date_id,\n' +
          '                appointment_id,\n' +
          '                start_hour,\n' +
          '                end_hour,\n' +
          '                HEALTH_CARE_CENTER.addressId\n' +
          '         from APPOINTMENT,\n' +
          '              USER,\n' +
          '              WORK_HOUR,\n' +
          '              reserve_dhh,\n' +
          '              HEALTH_CARE_CENTER,\n' +
          '              DHH\n' +
          '         where USER.phone_number = ?' +
          '           and APPOINTMENT.work_hour_id = WORK_HOUR.work_hour_id\n' +
          '           and WORK_HOUR.dhh_id = DHH.dhh_id\n' +
          '           and HEALTH_CARE_CENTER.health_care_center_id = DHH.health_care_center_id\n' +
          '           and APPOINTMENT.user_id in\n' +
          '               (select phone_number\n' +
          '                from USER,\n' +
          '                     FAMILY_REL\n' +
          '                where user1_id = ?' +
          '                  and user2_id = USER.phone_number\n' +
          '                union\n' +
          '                select phone_number\n' +
          '                from USER\n' +
          '                where USER.phone_number = ?' + ')' +
          '           and WORK_HOUR.work_hour_id in (select work_hour_id from reserve_dhh)) tmp2\n' +
          'where tmp2.doctor_id = DOCTOR.username\n' +
          '  and tmp2.user_id = phone_number\n' +
          '  and tmp2.date_id = DATE.date_id\n' +
          '  and tmp2.address_id = addressId\n' +
          '  and ADDRESS.address_text_id = ADDRESS_TEXT.address_text_id;', [this.state.Number,this.state.Number,this.state.Number,this.state.Number,this.state.Number],//todo
          (tx, results) => {
              console.log("app_user_family_complete")
              var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            //var y = results.rows.item(i).push()
            
            temp.push(results.rows.item(i));
          }
          console.log(temp)
          //set state //todo
          //db = temp
          this.setState({DataSource: temp, loading: false});
          }
      )
      ;
  });

  db.transaction(tx => {
    tx.executeSql(
        'select USER.first_name,\n' +
        '       USER.last_name,\n' +
        '       DOCTOR.first_name as doctor_name,\n' +
        '       DOCTOR.last_name as doctor_lastname,\n' +
        '       year,\n' +
        '       month,\n' +
        '       day,\n' +
        '       start_hour,\n' +
        '       end_hour,\n' +
        '       street,\n' +
        '       alley,\n' +
        '       plaque\n' +
        'from USER,\n' +
        '     DATE,\n' +
        '     ADDRESS,\n' +
        '     ADDRESS_TEXT,\n' +
        '     DOCTOR,\n' +
        '\n' +
        '     (\n' +
        '         select user_id, doctor_id, WORK_HOUR.date_id, appointment_id, start_hour, end_hour, DOCTOR_OFFICE.address_id\n' +
        '         from APPOINTMENT,\n' +
        '              WORK_HOUR,\n' +
        '              DOCTOR_OFFICE,\n' +
        '              DOH\n' +
        '         where APPOINTMENT.user_id = ?' +
        '           and APPOINTMENT.user_taker_id != ?' +
        '           and APPOINTMENT.work_hour_id = WORK_HOUR.work_hour_id\n' +
        '           and WORK_HOUR.doh_id = DOH.doh_id\n' +
        '           and DOCTOR_OFFICE.docror_office_id = DOH.doctor_office_id\n' +
        '         union\n' +
        '         select user_id,\n' +
        '                doctor_id,\n' +
        '                WORK_HOUR.date_id,\n' +
        '                appointment_id,\n' +
        '                start_hour,\n' +
        '                end_hour,\n' +
        '                HEALTH_CARE_CENTER.addressId\n' +
        '         from APPOINTMENT,\n' +
        '              USER,\n' +
        '              WORK_HOUR,\n' +
        '              HEALTH_CARE_CENTER,\n' +
        '              DHH\n' +
        '         where APPOINTMENT.user_id = ?' +
        '           and APPOINTMENT.user_taker_id != ?' +
        '           and APPOINTMENT.work_hour_id = WORK_HOUR.work_hour_id\n' +
        '           and WORK_HOUR.dhh_id = DHH.dhh_id\n' +
        '           and HEALTH_CARE_CENTER.health_care_center_id = DHH.health_care_center_id\n' +
        '     ) tmp2\n' +
        'where tmp2.doctor_id = DOCTOR.username\n' +
        '  and tmp2.user_id = phone_number\n' +
        '  and tmp2.date_id = DATE.date_id\n' +
        '  and tmp2.address_id = addressId\n' +
        '  and ADDRESS.address_text_id = ADDRESS_TEXT.address_text_id ;\n', [this.state.Number,this.state.Number,this.state.Number,this.state.Number],//todo
        (tx, results) => {
          console.log("app_user_family_complete")
          var temp = [];
      for (let i = 0; i < results.rows.length; ++i) {
        //var y = results.rows.item(i).push()
        
        temp.push(results.rows.item(i));
      }
      console.log(temp)
      //set state //todo
      //db = temp
      this.setState({DataSource2: temp, loading: false});
      }
    )
    ;
});

    
      
    
  }



  
  

  
  




    

  

  
  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View>
        <Text style={{textAlign: 'center'}}>لیست نوبت ها خالی است</Text>
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
        <View style={{height: height }}>
          <View
            style={{
              backgroundColor: '#484c7f',
              flexDirection: 'column',
              height: height * 0.1,
              
              
            }}>
            <View style={{flexDirection: 'row', flex: 1,marginTop:10}}>
              <StatusBar backgroundColor="#484c7f" barStyle="light-content" />
              {/* <Left style={styles.headerLeftP}> */}
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

              <CheckBox checked={this.state.check} color="blue" onPress = {() => 
              {
                if (this.state.check == true){this.setState({check:false}) }
                else{

                 this.setState({check:true})}}} />
                
              </View>
              {/* </Left> */}

              {/* <Body style={styles.headerBodyP}> */}
              <View style={styles.headerBodyP}>
                <Text style={styles.title}>
                  Doci
                </Text>
              </View>
              {/* </Body> */}
              {/* <View style={styles.headerRightP}>
                
                <MyButton
                  width={35}
                  marginTop={8}
                  marginBottom={8}
                  onPress={() =>}
                  title=""
                  fontSizeIcon={10}
                  backgroundColor="#484c7f"
                  color="#fff"
                  colorIcon="#fff"
                  Icon={true}
                  nameIcon="menu"
                  typeIcon="MaterialIcons"
                />
              </View> */}
              
            </View>
            <View style={{flex: 1, marginRight:3}}>
              <Text style = {styles.TitleScreen}>نوبت ها</Text>
            </View>
          </View>
          {/* <ScrollView keyboardShouldPersistTaps="handled" style={{flex: 1}}> */}
          <View style={{width: width, height: height * 0.9}}>
            <ImageBackground
              imageStyle={{resizeMode: 'stretch'}}
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                justifyContent:'center',
                alignItems:'center'
              }}
              source={require('./images/blue-white1.jpg')}>
              {/* <Icon name="more-vert" size={30} color="#900" /> */}
              <FlatList
                data={this.state.check ?this.state.DataSource : this.state.DataSource2}
                ListEmptyComponent={this.ListEmpty}
                // extraData={this.state.refresh}
                renderItem={({item}) => (
                  <AppointmentFlatList
                    item={item}
                    onPress1={() => {
                      /*this.props.navigation.navigate('ScreenShowRecipe', {
                        RecipeID: item.id,
                        Recipe: item,
                      });*/
                    }}
                  />
                )}
                //Setting the number of column
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                // ItemSeparatorComponent={this.renderSeparator}
                // ListHeaderComponent={this.renderHeader}
              />
              
            </ImageBackground>
          </View>
          {/* </ScrollView> */}
          {/* </Content> */}
          {/* </Container> */}
        </View>
      
    );
  }
}
