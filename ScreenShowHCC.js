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
import TabScreenHCC from './TabScreenHCC';  
const HCC = createAppContainer(TabScreenHCC)  
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'dd.db' }); 


export default class ScreenShowHCC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DataSource:[{username:'123',first_name:'@3',last_name:'1324',password:"Dds4",medical_council_code:'sa',visit_price:23,photo:null},{username:'1231',first_name:'@31',last_name:'13241',password:"Dds41",medical_council_code:'sa1',visit_price:231,photo:null}],

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
    console.log('Recipe');
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
            {this.state.DataSource.photo != null ? (
            <Image
              style={styles.UserImage}
              source={{
                uri:
                  'data:image/jpeg;base64,' +
                  this.state.DataSource.photo,
              }}
            />
          ) : (
            <Image
              style={[styles.UserImage, {backgroundColor: '#fff'}]}
              source={require('./images/hospital1.png')}
            />
          )}
          
            </View>
          </View>
          <HCC/>
        </View>
      </Drawer>
    );
  }
}
