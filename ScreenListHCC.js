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
  Picker
} from 'native-base';
//import * as RNFS from 'react-native-fs';
// import {componentDidAppear} from 'react-navigation'
import MyButton from './Mybtn';
import HCCFlatList from './HCCFlatList';
import SideBar from './SideBar';
import styles from './Styles';
//var Realm = require('realm');
//import realm from './DatabaseRecipe';
const {width, height} = Dimensions.get('screen');
//import SQLite from 'react-native-sqlite-storage';

import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'dd.db'});



export default class ScreenListHCC extends Component {
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
      Image: 'DatabaseImage',
      loading: true,
      NameSearch: '',
      filter: false,
    };


    db.transaction(tx => {
      tx.executeSql(
          'select  name,health_care_center_id, phone_number, street, alley, plaque\n' +
          'from HEALTH_CARE_CENTER,\n' +
          '     ADDRESS,\n' +
          '     ADDRESS_TEXT\n' +
          'where ADDRESS.addressId = HEALTH_CARE_CENTER.addressId\n' +
          '  and ADDRESS.address_text_id = ADDRESS_TEXT.address_text_id\n' +
          ';',[],//todo
          (tx, results) =>  {
            var temp = [];
            var len = results.rows.length;
            for (let i = 0; i < len; ++i) {
              temp.push(results.rows.item(i));
            }
            //set state //todo
            console.log(temp);
            this.setState({DataSource: temp, loading: false});
          },
      )
      ;
  });

    

    
  }


  closeDrawer() {
    this._drawer._root.close();
  }
  openDrawer() {
    this._drawer._root.open();
  }
  /*createDir() {
    var destPath = RNFS.DocumentDirectoryPath + '/' + this.state.Image;
    RNFS.mkdir(destPath);
  }*/

  searchRecipe = txt => {
    // NSPredicate *billingPredicate = [NSPredicate predicateWithFormat: @"SELF LIKE[c] %@", "Silv?"]
    //var Recipe = realm.objects('RecipeDB').filtered('title CONTAINS $0', txt);
    /*if (Recipe.length > 0) {
      this.setState({
        RecipeSource: Recipe,
      });
    } else {
      this.setState({
        RecipeSource: null,
      });
    }*/
  };
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
        <Text style={{textAlign: 'center'}}> مرکز درمانی یافت نشد</Text>
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
                marginRight:width* 0.1,
                marginLeft:width* 0.1,
                width:width* 0.8,
                height: '40%',
                justifyContent:'center',
                alignItems:'center',
                borderRadius:12,
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
                    width:width* 0.5,
                    margin:20
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
                    margin:20,
                    width:width* 0.5,
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
                  this.setState({filter: false, loading: true});
                  //this.filter();
                }}
                title="  اعمال فیلتر  "
                fontSize={15}
                backgroundColor="#1c7f"
                color="#fff"
                borderRadius = {30}
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
                      ? 'جستجوی نام مرکز درمانی'
                      : "Search HCC's Name "
                  }
                  placeholderTextColor="#424342"
                  value={this.state.NameSearch}
                  onChangeText={txt => {
                    this.setState({NameSearch: txt});
                    this.searchRecipe(txt);
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
                onPress={() => {this.setState({filter:true})}}
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
                // extraData={this.state.refresh}
                renderItem={({item}) => (
                  <HCCFlatList
                    item={item}
                    onPress1={() => {
                      global.DataSourceHCC = item;
                      this.props.navigation.navigate('ScreenShowHCC')
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
              <View style={{height: height * 0.08}} />
            </ImageBackground>
          </View>
        </View>
      </Drawer>
    );
  }
}
