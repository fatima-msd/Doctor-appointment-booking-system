import React, {Component} from 'react';
import {
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Modal,
  AppRegistry,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Content, Text, View} from 'native-base';
import MyButton from './Mybtn';
const {width, height} = Dimensions.get('screen');
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'dd.db'});
import AppointmentFlatList from './AppointmentFlatList';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    // this.backButtonClick = this.backButtonClick.bind(this);
    this.state = {
      Appointment: false,

      Code: 0,
      loading: false,
      item: [],
      flag: false,
    };
  }

  find_code() {
    db.transaction(tx => {
      console.log('Peygity  : ' + this.state.Code + ' ' + global.Number);
      tx.executeSql(
        'select USER.first_name,\n' +
        '       USER.last_name,\n' +
        '       DOCTOR.first_name as doctor_name ,\n' +
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
        '              reserve_doh,\n' +
        '              PAYMENT\n' +
        '         where payment_code = ?\n' +
        '           and payment_id = paymentId\n' +
        '           and APPOINTMENT.work_hour_id = WORK_HOUR.work_hour_id\n' +
        '           and WORK_HOUR.doh_id = DOH.doh_id\n' +
        '           and DOCTOR_OFFICE.docror_office_id = DOH.doctor_office_id\n' +
        '           and APPOINTMENT.user_id in (select phone_number\n' +
        '                                       from USER\n' +
        '                                          , FAMILY_REL\n' +
        '                                       where user1_id = ?\n' +
        '                                         and user2_id = USER.phone_number\n' +
        '                                       union\n' +
        '                                       select phone_number\n' +
        '                                       from USER\n' +
        '                                       where phone_number = ?)\n' +
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
        '              DHH,\n' +
        '              PAYMENT\n' +
        '         where payment_code = ?\n' +
        '           and paymentId = payment_id\n' +
        '           and USER.phone_number = ?\n' +
        '           and APPOINTMENT.work_hour_id = WORK_HOUR.work_hour_id\n' +
        '           and WORK_HOUR.dhh_id = DHH.dhh_id\n' +
        '           and HEALTH_CARE_CENTER.health_care_center_id = DHH.health_care_center_id\n' +
        '           and APPOINTMENT.user_id in\n' +
        '               (select phone_number\n' +
        '                from USER\n' +
        '                   , FAMILY_REL\n' +
        '                where user1_id = ?\n' +
        '                  and user2_id = USER.phone_number\n' +
        '                union\n' +
        '                select phone_number\n' +
        '                from USER\n' +
        '                where USER.phone_number = ?)\n' +
        '           and WORK_HOUR.work_hour_id in (select work_hour_id from reserve_dhh)) tmp2\n' +
        'where tmp2.doctor_id = DOCTOR.username\n' +
        '  and tmp2.user_id = phone_number\n' +
        '  and tmp2.date_id = DATE.date_id\n' +
        '  and tmp2.address_id = addressId\n' +
        '  and ADDRESS.address_text_id = ADDRESS_TEXT.address_text_id;\n',
        [
          this.state.Code,
          global.Number,
          global.Number,
          this.state.Code,
          global.Number,
          global.Number,
          global.Number,
        ], //todo
        (tx, results) => {
          console.log('add_complete');
          var len = results.rows.length;
          if (len == 0) {
            Alert.alert('شما مجاز به دیدن اطلاعات این نوبت نیستید');
            this.setState({ loading: false});
          } else {
            var temp = [];
            for (let i = 0; i < len; ++i) {
              temp.push(results.rows.item(i));
            }
            console.log(temp);
            this.setState({item: temp[0], flag: true, loading: false});
          }
        },
      );
    });
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <Content style={{backgroundColor: '#674EE4ed'}}>
        <TouchableNativeFeedback
          onPress={() => {
            this.setState({Appointment: true});
          }}>
          <View
            style={{
              padding: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomWidth: 2,
            }}>
            <Text style={{color: '#fff', textAlign: 'center'}}>
              {'پیگیری نوبت'}
            </Text>
          </View>
        </TouchableNativeFeedback>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.flag}
          onRequestClose={() => {
            this.setState({flag: false, Code: 0});
          }}>
          <View
            style={{
              // margin: 60,
              marginTop: 200,
              marginRight: width * 0.1,
              marginLeft: width * 0.1,
              width: width * 0.8,
              height: '30%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
            }}>
            <AppointmentFlatList item={this.state.item} />
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.Appointment}
          onRequestClose={() => {
            this.setState({Appointment: false, Code: 0});
          }}>
          <View
            style={{
              // margin: 60,
              marginTop: 200,
              marginRight: width * 0.1,
              marginLeft: width * 0.1,
              width: width * 0.8,
              height: '30%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
              backgroundColor: '#555858f0',
            }}>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: '65%',
              }}>
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
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: '#131314',
                    marginBottom: 10,
                  }}>
                  کد پیگیری
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
                    keyboardType="numeric"
                    onChangeText={txt => {
                      this.setState({Code: txt});
                    }}
                  />
                </View>
              </View>
            </View>

            <MyButton
              width={100}
              marginTop={8}
              marginBottom={8}
              onPress={() => {
                this.setState({Appointment: false, loading: true});
                this.find_code();
                //this.Appointment();
              }}
              title="  پیگیری  "
              fontSize={15}
              backgroundColor="#1c7f"
              color="#fff"
              borderRadius={30}
              // colorIcon="#fff"
              // Icon={true}
              // nameIcon="menu"
              // typeIcon="MaterialIcons"
            />
          </View>
        </Modal>
      </Content>
    );
  }
}
