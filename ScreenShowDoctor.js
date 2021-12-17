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
  ListView
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
} from 'native-base';
//import * as RNFS from 'react-native-fs';
// import {componentDidAppear} from 'react-navigation'
import MyButton from './Mybtn';
import SideBar from './SideBar';
import styles from './Styles';
import {
  createAppContainer,
} from 'react-navigation';
const {width, height} = Dimensions.get('screen');
//import SQLite from 'react-native-sqlite-storage';
import TabScreenDoctor from './TabScreenDoctor';  
const Doctor = createAppContainer(TabScreenDoctor)  
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'dd.db' }); 


export default class ScreenShowDoctor extends Component {
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
      
      loading: false,
    };

    //const {db} = this.state;
    // db.transaction(tx => {
      
    //   console.log("before add doctor");
    //   tx.executeSql("SELECT * FROM DOCTOR where  DOCTOR.specialtyId is null UNION SELECT DOCTOR.* FROM DOCTOR,SPECIALTY  where DOCTOR.specialtyId=SPECIALTY.specialtyId", [], (tx, results) => {
    //     var temp = [];
    //     var len=results.rows.length;
    //     console.log(len);
    //     for (let i = 0; i < results.rows.length; ++i) {
    //       temp.push(results.rows.item(i));
    //     }
    //     console.log("addddd doctor");
    //     console.log(temp);
    //     this.setState({
    //       DataSource: temp,
    //     });});})


     
     
     




        
      
    
  }
  closeDrawer() {
    this._drawer._root.close();
  }
  openDrawer() {
    this._drawer._root.open();
  }

    

  
  
  
  
  
  render() {
    // const refresh= props.navigation.getParam('refresh', false)
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
        {/* <Container> */}
        <View style={{height: height }}>
          <View
            style={{
              backgroundColor: '#484c7f',
              flexDirection: 'column',
              height: height * 0.4,
            }}>
            <View style={{flexDirection: 'row',height:0.14*height}}>
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

                <MyButton
                  width={35}
                  marginTop={8}
                  marginBottom={8}
                  onPress={() => {
                    this.createDir.call(this);
                    // this.setState({NameSearch:''})
                    //this.props.navigation.navigate('ScreenCreateRecipe');
                  }}
                  title=""
                  fontSizeIcon={10}
                  backgroundColor="#484c7f"
                  color="#fff"
                  colorIcon="#fff"
                  Icon={true}
                  nameIcon="add-circle-outline"
                  typeIcon="MaterialIcons"
                />
              </View>
              {/* </Left> */}

              {/* <Body style={styles.headerBodyP}> */}
              <View style={styles.headerBodyP}>
                <Text style={styles.title}>
                  Doci
                </Text>
              </View>
              {/* </Body> */}
              <View style={styles.headerRightP}>
                {/* <Right style={styles.headerRightP}> */}
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
              {/* </Right> */}
            </View>
            <View style={{flex: 1, alignItems: 'center',justifyContent:'flex-start'}}>
            {global.DataSourceD.photo != null ? (
            <Image
              style={styles.UserImage}
              source={{
                uri:
                  'data:image/jpeg;base64,' +
                  global.DataSourceD.photo,
              }}
            />
          ) : (
            <Image
              style={[styles.UserImage, {backgroundColor: '#fff'}]}
              source={require('./images/Doctor1.png')}
            />
          )}
          
            </View>
          </View>
          <Doctor/>
        </View>
      </Drawer>
    );
  }
}
