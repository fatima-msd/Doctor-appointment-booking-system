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
  Icon
} from 'native-base';
//import * as RNFS from 'react-native-fs';
// import {componentDidAppear} from 'react-navigation'
import MyButton from './Mybtn';
import FamilyFlatList from './FamilyFlatList';
import SideBar from './SideBar';
import styles from './Styles';
//var Realm = require('realm');
//import realm from './DatabaseRecipe';
const {width, height} = Dimensions.get('screen');
//import Icon from 'react-native-vector-icons/MaterialIcons';
//import SQLite from 'react-native-sqlite-storage';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'dd.db' }); 

export default class ScreenListFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DataSource:[],
      //[{first_name:'negin',last_name:'khalifat',insuranceId:3,phone_number:'123'},{first_name:'fatima',last_name:'msd',insuranceId:3,phone_number:'0917'}],
      //db,
      //Image: 'DatabaseImage',
      loading: true,
      //NameSearch: '',
      AddFamily: false,
      Number: this.props.navigation
      .dangerouslyGetParent()
      .getParam('Number', ''),
    };

    db.transaction(tx => {
      tx.executeSql('select USER.first_name,USER.last_name,USER.phone_number,INSURANCE.name\n' +
          'from USER,\n' +
          '     FAMILY_REL,INSURANCE\n' +
          'where user1_id= ? and user2_id=phone_number and USER.insuranceId=INSURANCE.insuranceId\n', [this.state.Number],
          (tx, results) => {
              console.log('show_all_family');
               var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
          }
              //set state //todo
              console.log(temp)
              this.setState({DataSource:temp,loading:false})

          });

  });

    
      
    
  }
  

  
  

    

  
  /*createDir() {
    var destPath = RNFS.DocumentDirectoryPath + '/' + this.state.Image;
    RNFS.mkdir(destPath);
  }*/

  
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
        <View style={{height: height }}>
          <View
            style={{
              backgroundColor: '#484c7f',
              flexDirection: 'column',
              height: height * 0.1,
            }}>
            <View style={{flexDirection: 'row', flex: 1,marginTop:15}}>
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
                    console.log(this.state.Number)
                    this.props.navigation.replace('ScreenAddF',{Number:this.state.Number});
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

              <View style={styles.headerBodyP}>
                <Text style={styles.title}>
                  Doci
                </Text>
              </View>

              
            </View>
            <View style={{flex: 1, marginRight:3}}>
              <Text style = {styles.TitleScreen}>اعضای خانواده</Text>
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
              }}
              source={require('./images/blue-white1.jpg')}>
              {/* <Icon name="more-vert" size={30} color="#900" /> */}
              <FlatList
                data={this.state.DataSource}
                ListEmptyComponent={this.ListEmpty}
                // extraData={this.state.refresh}
                renderItem={({item}) => (
                  <FamilyFlatList
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
