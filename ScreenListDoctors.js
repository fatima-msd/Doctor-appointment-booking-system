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
  ActivityIndicator,
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
  Item,
  Input,
  Picker,
} from 'native-base';
//import * as RNFS from 'react-native-fs';
// import {componentDidAppear} from 'react-navigation'
import MyButton from './Mybtn';
import DoctorFlatList from './DoctorFlatList';
import SideBar from './SideBar';
import styles from './Styles';
//var Realm = require('realm');
//import realm from './DatabaseRecipe';
const {width, height} = Dimensions.get('screen');

//import SQLite from 'react-native-sqlite-storage';

import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'dd.db'});



export default class ScreenListDoctors extends Component {
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
    // this.backButtonClick = this.backButtonClick.bind(this);
    this.state = {
      DataSource: [],
      Specialty: 0,
      Insurance: 0,
      loading: true,
      NameSearch: '',
      filter: false,
    };

    db.transaction(tx => {
      tx.executeSql(
        'select first_name,\n' +
          '       last_name,username,' +
          '       name\n' +
          'from DOCTOR,\n' +
          '     SPECIALTY\n' +
          'where DOCTOR.specialtyId = SPECIALTY.specialtyId\n' +
          'order by DOCTOR.username;',
        [],
        (tx, results) => {
          console.log('show_all_doctor');
          var temp = [];
          var len = results.rows.length;
          for (let i = 0; i < len; ++i) {
            temp.push(results.rows.item(i));
          }
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

  search_name(txt) {
    var h = '"' + '%' + txt + '"';
    var h1 = '"' + '%' + txt + '"';
    var h2 = '"' + '%' + txt + '%' + '"';
    var h3 = '"' + '%' + txt + '%' + '"';
    var hh =
      'select DOCTOR.username,first_name,last_name,name\n' +
      'from DOCTOR,\n' +
      '     SPECIALTY\n' +
      'where (DOCTOR.first_name like ' +
      h +
      ' or DOCTOR.last_name like ' +
      h1 +
      ' or DOCTOR.first_name like ' +
      h2 +
      ' or\n' +
      '       DOCTOR.last_name like ' +
      h3 +
      ' )\n' +
      '  and DOCTOR.specialtyId = SPECIALTY.specialtyId\n' +
      'group by username\n' +
      ';';
    db.transaction(tx => {
      tx.executeSql(
        hh,
        [], //todo
        (tx, results) => {
          console.log('search_name_complete');
          var temp = [];
          for (let i = 0; i < results.rows.length; i++) {
            temp.push(results.rows.item(i));
          }
          console.log(temp);
          this.setState({DataSource: temp, loading: false});
        },
      );
    });
  }
  search_name_ins() {
    var h = '"' + '%' + this.state.NameSearch + '"';
    var h1 = '"' + '%' + this.state.NameSearch + '"';
    var h2 = '"' + '%' + this.state.NameSearch + '%' + '"';
    var h3 = '"' + '%' + this.state.NameSearch + '%' + '"';
    var hh =
      'select distinct DOCTOR.username, first_name, last_name, SPECIALTY.name\n' +
      'from DOCTOR,\n' +
      '     SPECIALTY,\n' +
      '     INSURANCE,\n' +
      '     INSURANE_DOCTOR_REL\n' +
      'where DOCTOR.specialtyId = SPECIALTY.specialtyId\n' +
      '  and INSURANCE.insuranceId = INSURANE_DOCTOR_REL.insuranceId\n' +
      '  and INSURANE_DOCTOR_REL.doctorId = username\n' +
      'group by username ,INSURANCE.insuranceId\n' +
      'having INSURANCE.insuranceId = ' +
      this.state.Insurance.toString() +
      '  and (DOCTOR.first_name like ' +
      h +
      ' or DOCTOR.last_name like ' +
      h1 +
      ' or DOCTOR.first_name like ' +
      h2 +
      ' or\n' +
      '        DOCTOR.last_name like  ' +
      h3 +
      ' );\n';
    db.transaction(tx => {
      tx.executeSql(
        hh,
        [], //todo
        (tx, results) => {
          console.log('search_name_complete');
          var temp = [];
          for (let i = 0; i < results.rows.length; i++) {
            temp.push(results.rows.item(i));
          }

          console.log(temp);
          this.setState({DataSource: temp, loading: false});
        },
      );
    });
  }
  search_name_spec_ins() {
    var h = '"' + '%' + this.state.NameSearch + '"';
    var h1 = '"' + '%' + this.state.NameSearch + '"';
    var h2 = '"' + '%' + this.state.NameSearch + '%' + '"';
    var h3 = '"' + '%' + this.state.NameSearch + '%' + '"';

    var hh =
      'select distinct DOCTOR.username,first_name,last_name ' +
      'from DOCTOR,\n' +
      '     SPECIALTY,\n' +
      '     INSURANE_DOCTOR_REL,\n' +
      '     INSURANCE\n' +
      'where DOCTOR.specialtyId = SPECIALTY.specialtyId\n' +
      '  and INSURANCE.insuranceId = INSURANE_DOCTOR_REL.insuranceId\n' +
      '  and doctorId = DOCTOR.username\n' +
      'group by SPECIALTY.name, username, INSURANCE.insuranceId\n' +
      'having DOCTOR.specialtyId = ' +
      this.state.Specialty.toString() +
      '   and INSURANE_DOCTOR_REL.insuranceId = ' +
      this.state.Insurance.toString() +
      '   and (DOCTOR.first_name like ' +
      h +
      ' or DOCTOR.last_name like ' +
      h1 +
      ' or DOCTOR.first_name like ' +
      h2 +
      ' or\n' +
      '        DOCTOR.last_name like  ' +
      h3 +
      ' );\n';
    db.transaction(tx => {
      tx.executeSql(
        hh,
        [], //todo
        (tx, results) => {
          console.log('search_name_spec_ins_complete');

          var temp = [];
          for (let i = 0; i < results.rows.length; i++) {
            temp.push(results.rows.item(i));
          }

          console.log(temp);
          this.setState({DataSource: temp, loading: false});
        },
      );
    });
  }
  search_name_spec() {
    var h = '"' + '%' + this.state.NameSearch + '"';
    var h1 = '"' + '%' + this.state.NameSearch + '"';
    var h2 = '"' + '%' + this.state.NameSearch + '%' + '"';
    var h3 = '"' + '%' + this.state.NameSearch + '%' + '"';
    var hh =
      'select DOCTOR.first_name,username,last_name, name ' +
      '                from DOCTOR,' +
      '                     SPECIALTY' +
      '                where DOCTOR.specialtyId = SPECIALTY.specialtyId' +
      '                group by name, username' +
      '                having DOCTOR.specialtyId =  ' +
      this.state.Specialty.toString() +
      ' and (DOCTOR.first_name like ' +
      h +
      ' or DOCTOR.last_name like ' +
      h1 +
      ' or DOCTOR.first_name like ' +
      h2 +
      ' or' +
      '   DOCTOR.last_name like ' +
      h3 +
      ' );';

    console.log(hh);
    console.log(h);
    console.log(h1);
    console.log(h2);
    console.log(h3);
    db.transaction(tx => {
      tx.executeSql(
        hh,
        [], //todo
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; i++) {
            temp.push(results.rows.item(i));
          }
          console.log('search_name_spec_complete');
          console.log(temp);
          this.setState({DataSource: temp, loading: false});
        },
      );
    });

    // var h = "\"" + "%" + this.state.NameSearch + "\"";
    //     var h1 = "\"" + "%" +this.state.NameSearch +"\"";
    //     var h2 = "\"" + "%" + this.state.NameSearch + "%" + "\"";
    //     var h3 = "\"" + "%" +this.state.NameSearch +"%" + "\"";

    //     console.log(h)
    //     db.transaction(tx => {
    //         tx.executeSql(
    //             'select DOCTOR.first_name,username,last_name, name\n' +
    //             'from DOCTOR,\n' +
    //             '     SPECIALTY\n' +
    //             'where DOCTOR.specialtyId = SPECIALTY.specialtyId\n' +
    //             'group by name, username\n' +
    //             'having DOCTOR.specialtyId = ?\n' +
    //             '   and (DOCTOR.first_name like ? or DOCTOR.last_name like ? or DOCTOR.first_name like ? or\n' +
    //             '        DOCTOR.last_name like ?);', [this.state.Specialty.toString(), h, h1, h2, h3],//todo
    //             (tx, results) => {
    //                 console.log("search_name_spec_complete");
    //                 var temp = [];
    //                 var len = results.rows.length;
    //                 for (let i = 0; i < len; ++i) {
    //                     temp.push(results.rows.item(i));
    //                 }
    //                 console.log(this.state.Specialty)
    //                 console.log(temp)
    //                 this.setState({DataSource: temp, loading: false});
    //             }
    //         )
    //         ;
    //     });
  }

  searchRecipe = txt => {};
  // searchFilterFunction = txt => {
  //   this.setState({
  //     NameSearch: txt,
  //   });

  //   // const newData = this.arrayholder.filter(item => {
  //   //   const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
  //   //   const textData = text.toUpperCase();

  //   //   return itemData.indexOf(textData) > -1;
  //   // });
  //   var Recipe = realm.objects('RecipeDB').filtered('title CONTAINS $0', txt);
  //   console.log(txt);
  //   console.log(Recipe);
  //   this.setState({
  //     RecipeSource: Recipe,
  //   });
  // };
  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View>
        <Text style={{textAlign: 'center'}}> پزشکی یافت نشد</Text>
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
      <Drawer
        side="right"
        ref={ref => {
          this._drawer = ref;
        }}
        content={<SideBar navigator={this._navigator} />}
        onClose={() => this.closeDrawer()}>
        <View style={{height: height * 0.92}}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.filter}
            onRequestClose={() => {
              this.setState({filter: false, Insurance: 0, Specialty: 0});
            }}>
            <View
              style={{
                // margin: 60,
                marginTop: 200,
                marginRight: width * 0.1,
                marginLeft: width * 0.1,
                width: width * 0.8,
                height: '40%',
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
                  height: '65%',
                }}>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    width: width * 0.5,
                    margin: 20,
                  }}>
                  <Text
                    selectable={true}
                    style={{
                      fontWeight: 'bold',
                      fontSize: 13,
                      color: '#fff',
                    }}>
                    نوع بیمه
                  </Text>
                  <Picker
                    note
                    mode="dropdown"
                    style={{width: '100%', color: '#fff'}}
                    selectedValue={this.state.Insurance}
                    onValueChange={txt => {
                      this.setState({Insurance: txt});
                      console.log(this.state.Insurance);
                    }}>
                    <Picker.Item label="انتخاب کنید ..." value={0} />
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
                    margin: 20,
                    width: width * 0.5,
                  }}>
                  <Text
                    selectable={true}
                    style={{
                      fontWeight: 'bold',
                      fontSize: 13,
                      color: '#fff',
                    }}>
                    تخصص
                  </Text>
                  <Picker
                    note
                    mode="dropdown"
                    style={{width: '100%', color: '#fff'}}
                    selectedValue={this.state.Specialty}
                    onValueChange={txt => {
                      this.setState({Specialty: txt});
                    }}>
                    <Picker.Item label="انتخاب کنید ..." value={0} />
                    <Picker.Item label="چشم" value={1} />
                    <Picker.Item label="گوش" value={2} />
                    <Picker.Item label="ارتوپد" value={3} />
                    <Picker.Item label="پوست" value={4} />
                  </Picker>
                </View>
              </View>

              <MyButton
                width={100}
                marginTop={18}
                marginBottom={8}
                onPress={() => {
                  this.setState({filter: false});
                  if (
                    this.state.Specialty != 0 &&
                    this.state.NameSearch != '' &&
                    this.state.Insurance != 0
                  ) {
                    //this.setState({loading:true })
                    this.search_name_spec_ins();
                  } else if (
                    this.state.Specialty != 0 &&
                    this.state.NameSearch != '' &&
                    this.state.Insurance == 0
                  ) {
                    //this.setState({loading:true })
                    this.search_name_spec();
                  } else if (
                    this.state.Specialty == 0 &&
                    this.state.NameSearch != '' &&
                    this.state.Insurance != 0
                  ) {
                    //this.setState({loading:true })
                    this.search_name_ins();
                  }
                  //  else if(this.state.Specialty == 0 && this.state.NameSearch != '' && this.state.Insurance == 0){
                  //    //this.setState({loading:true })
                  //   this.search_name();
                  //  }
                  //this.filter();
                }}
                title="  اعمال فیلتر  "
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
          <View
            style={{
              backgroundColor: '#484c7f',
              flexDirection: 'column',
              height: height * 0.2,
            }}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <StatusBar backgroundColor="#484c7f" barStyle="light-content" />
              {/* <Left style={styles.headerLeftP}> */}
              <View style={styles.headerLeftP} />
              <View style={styles.headerBodyP}>
                <Text style={styles.title}>Doci</Text>
              </View>
              <View style={styles.headerRightP}>
                <MyButton
                  width={35}
                  marginTop={8}
                  marginBottom={8}
                  onPress={() => this.openDrawer()}
                  title=""
                  fontSizeIcon={10}
                  backgroundColor="#484c7f"
                  color="#fff"
                  colorIcon="#fff"
                  Icon={true}
                  nameIcon="menu"
                  typeIcon="MaterialIcons"
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row-reverse',
                justifyContent: 'space-around',
              }}>
              <Item
                fixedLabel
                style={{
                  width: width * '0.7',
                  height: height * '0.06',
                  borderRadius: 40,
                  // borderLeftWidth: 2,
                  // borderTopWidth: 2,
                  // borderRightWidth: 2,
                  // borderBottomWidth: 2,
                  borderColor: '#fff',
                  marginTop: 10,
                  backgroundColor: '#fff',
                  marginBottom: 10,
                }}>
                <Icon
                  name="search"
                  type="MaterialIcons"
                  style={{color: '#2C2E4D', margin: 10}}
                />
                <Input
                  style={{
                    height: height * '0.06',
                  }}
                  placeholder={
                    global.language == 'Persian'
                      ? 'جستجوی نام پزشک'
                      : "Search Doctor's Name "
                  }
                  placeholderTextColor="#424342"
                  value={this.state.NameSearch}
                  onChangeText={txt => {
                    this.setState({NameSearch: txt});
                    this.search_name(txt);
                  }}
                />
                <Icon
                  name="account-circle"
                  type="MaterialIcons"
                  style={{color: '#2C2E4D'}}
                />
              </Item>
              <MyButton
                width={35}
                marginTop={0}
                marginBottom={0}
                onPress={() => {
                  this.setState({filter: true});
                }}
                title=""
                fontSizeIcon={10}
                backgroundColor="#484c7f"
                color="#fff"
                colorIcon="#fff"
                Icon={true}
                nameIcon="filter"
                typeIcon="FontAwesome"
              />
            </View>
          </View>

          <View style={{width: width, height: height * 0.72}}>
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
                extraData={this.state.loading}
                renderItem={({item}) => (
                  <DoctorFlatList
                    item={item}
                    op = {()=> {global.username_doci = item.username ; global.first_name_doci = item.first_name;global.last_name_doci= item.last_name;this.props.navigation.navigate('ScreenAppointmentBooking')}}
                     onPress1={() => {
                      global.DataSourceD = item;
                      this.props.navigation.navigate('ScreenShowDoctor');
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
              <View style={{height: height * 0.129}} />
            </ImageBackground>
          </View>
        </View>
      </Drawer>
    );
  }
}
