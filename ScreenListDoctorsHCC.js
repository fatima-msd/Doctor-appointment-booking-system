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
  ActivityIndicator,
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
import DoctorFlatList from './DoctorFlatList';
import MyButton from './Mybtn';
import SideBar from './SideBar';
import styles from './Styles';
const {width, height} = Dimensions.get('screen');
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'dd.db'});
export default class ScreenListDoctorsHCC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      DataSource: [],
      loading: true,
    };

    //   db.transaction(tx => {
    //     tx.executeSql(
    //         'select distinct DOCTOR.*\n' +
    //         'from DHH,\n' +
    //         '     DOCTOR,\n' +
    //         '     HEALTH_CARE_CENTER,\n' +
    //         '     WORK_HOUR\n' +
    //         'where DHH.doctorId = DOCTOR.username\n' +
    //         '  and HEALTH_CARE_CENTER.health_care_center_id = ?\n' +
    //         '  and HEALTH_CARE_CENTER.health_care_center_id = DHH.health_care_center_id\n' +
    //         '  and WORK_HOUR.dhh_id = DHH.dhh_id;',[global.DataSourceHCC.health_care_center_id],//todo
    //         (tx, results) => {
    //             console.log("doctorof_complete");
    //             var temp = [];
    //             var len = results.rows.length;
    //             for (let i = 0; i < len; ++i) {
    //               temp.push(results.rows.item(i));
    //             }
    //             //set state //todo
    //             console.log(temp);
    //             console.log(global.DataSourceHCC)
    //             this.setState({DataSource: temp, loading: false});
    //         }
    //     )
    //     ;
    // });

    db.transaction(tx => {
      tx.executeSql(
        'select distinct username,first_name, last_name, SPECIALTY.name\n' +
          'from DHH,\n' +
          '     DOCTOR,\n' +
          '     HEALTH_CARE_CENTER,\n' +
          '     WORK_HOUR,\n' +
          '     SPECIALTY\n' +
          '\n' +
          'where DHH.doctorId = DOCTOR.username\n' +
          '  and HEALTH_CARE_CENTER.health_care_center_id = ?' +
          '  and HEALTH_CARE_CENTER.health_care_center_id = DHH.health_care_center_id\n' +
          '  and WORK_HOUR.dhh_id = DHH.dhh_id\n' +
          '  and DOCTOR.specialtyId = SPECIALTY.specialtyId\n' +
          ';',
        [global.DataSourceHCC.health_care_center_id], //todo
        (tx, results) => {
          console.log('doctorof_complete');
          var temp = [];
          var len = results.rows.length;
          for (let i = 0; i < len; ++i) {
            temp.push(results.rows.item(i));
          }
          //set state //todo
          console.log(temp);
          console.log(global.DataSourceHCC);
          this.setState({DataSource: temp, loading: false});
        },
      );
    });
  }

  closeDrawer() {
    this._drawer._root.close();
  }
  openDrawer() {
    this._drawer._root.open();
  }

  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View>
        <Text style={{textAlign: 'center'}}> پزشکی یافت نشد</Text>
      </View>
    );
  };

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
        <FlatList
          data={this.state.DataSource}
          ListEmptyComponent={this.ListEmpty}
          // extraData={this.state.refresh}
          renderItem={({item}) => (
            <DoctorFlatList
              item={item}
              op = {()=> {console.log(item.username); global.username_doci = item.username ; global.first_name_doci = item.first_name;global.last_name_doci= item.last_name;this.props.navigation.navigate('ScreenAppointmentBooking')}}
                   
              onPress1={() => {
                global.DataSourceD = item;
                      this.props.navigation.navigate('ScreenShowDoct');
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
        />
        <View style={{height: height * 0.08}} />
      </ImageBackground>
    );
  }
}
