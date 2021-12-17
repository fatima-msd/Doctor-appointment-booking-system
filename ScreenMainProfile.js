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
export default class ScreenMainProfile extends Component {
  constructor(props) {
    super(props);
    // this.backButtonClick = this.backButtonClick.bind(this);
    this.state = {
      FirstName: this.props.navigation
        .dangerouslyGetParent()
        .getParam('FirstName', ''),
      LastName: this.props.navigation
        .dangerouslyGetParent()
        .getParam('LastName', ''),
      Number: this.props.navigation
        .dangerouslyGetParent()
        .getParam('Number', ''),
      Photo: this.props.navigation.dangerouslyGetParent().getParam('Photo', ''),
      imageSource: [],
      recipeSource: [],
      selectedStartDate: null,
      modalDateVisible: false,
    };
    // this.onDateChange = this.onDateChange.bind(this);
    console.log("Prof")
  }

  closeDrawer() {
    this._drawer._root.close();
  }
  openDrawer() {
    this._drawer._root.open();
  }
  onDateChange = date => {
    this.setState({selectedStartDate: date});
    this.setState({modalDateVisible: true});
  };

  Convert = inp => {
    var out = [];
    for (let i = 0; i < inp.length; i = i + 1) {
      out.push(inp[i]);
    }
    return out;
  };

  /* setModalVisible(visible) {
    this.setState({modalDateVisible: visible});
  }

  funcImage = () => {
    var ImageS = [];
    /*for (const i of realm.objects('RecipeDB')) {
      for (const j of i.images) {
        ImageS.push(j);
        // this.setState({recipeSource:this.state.recipeSource.concat(i)});
      }
    }
    return ImageS;
  };*/

  EditPatient() {
    //const {db} = this.state;
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM USER where phone_number=?',
        [this.state.Number],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          if (len == 0) {
            console.log('Naaaaaaaa');
            console.log(this.state.Number);
          } else {
            console.log(temp[0]);
            this.props.navigation.navigate('ScreenEditPP', {
              Insurance: temp[0].insuranceId,
              Number: temp[0].phone_number,
              FirstName: temp[0].first_name,
              LastName: temp[0].last_name,
              Photo: temp[0].photo,
              BirthDay: temp[0].birth_day,
              GenderID: temp[0].genderID,
            });
          }
        },
      );
    });
  }

  render() {
    return (
      <Drawer
        side="right"
        ref={ref => {
          this._drawer = ref;
        }}
        content={<SideBar navigator={this._navigator}/>}
        onClose={() => this.closeDrawer()}>
        <View style={{height: height * 0.92}}>
          <View
            style={{
              backgroundColor: '#484c7f',
              flexDirection: 'row',
              height: height * 0.12,
            }}>
            <StatusBar backgroundColor="#484c7f" barStyle="light-content" />
            <View style={styles.headerLeftP} />

            <View style={styles.headerBodyP}>
              <View>
                <Text style={styles.title}>Doci</Text>
              </View>
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
              height: height * 0.3,
              backgroundColor: '#484c7f',
              padding: 10,
              paddingRight: 40,
              paddingLeft: 40,
              alignItems:'center'           
            }}>
            <Text style={styles.TitleScreen}>
              {this.state.FirstName + ' ' + this.state.LastName}
            </Text>

            {this.state.Photo != null ? (
              <Image
                style={styles.UserImage}
                source={{
                  uri: 'data:image/jpeg;base64,' + this.state.Photo,
                }}
              />
            ) : (
              <Image
                style={[styles.UserImage, {backgroundColor: '#fff'}]}
                source={require('./images/User.jpg')}
              />
            )}
          </View>
          <View
            style={{
              width: width,
              height: height * 0.75,
              // justifyContent: 'center',
              backgroundColor: '#fff',
            }}>
            <ImageBackground
              imageStyle={{resizeMode: 'stretch'}}
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                flexDirection: 'column',
              }}
              source={require('./images/blue-white1.jpg')}>
              <TouchableNativeFeedback
                onPress={() => {
                  this.EditPatient();
                }}>
                <View
                  style={{
                    margin: 20,
                    padding: 10,
                    borderRadius: 30,
                    height: 100,
                    borderWidth: 2,
                    borderColor: '#948D8D',
                  }}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    مشاهده و ویرایش پروفایل
                  </Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => {
                  this.props.navigation.navigate('ScreenListFamily', {
                    Number: this.state.Number,
                  });
                }}>
                <View
                  style={{
                    margin: 20,
                    padding: 10,
                    borderRadius: 30,
                    height: 100,
                    borderWidth: 2,
                    borderColor: '#948D8D',
                  }}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    اعضای خانواده{' '}
                  </Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={() => {this.props.navigation.navigate('ScreenListAppointment', {
                    Number: this.state.Number,
                  });}}>
                <View
                  style={{
                    margin: 20,
                    padding: 10,
                    borderRadius: 30,
                    height: 100,
                    borderWidth: 2,
                    borderColor: '#948D8D',
                  }}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    نوبت های من{' '}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </ImageBackground>
          </View>
        </View>
      </Drawer>
    );
  }
}
//  <TouchableHighlight onPress={() => {
//                   }}>
//                   <View style={{ flex: 1, flexDirection: "column", margin: 1 }}>
//                     <Image
//                       style={styles.Allphoto}
//                       source={require('./images/ce1.jpg')}
//                     />
//                   </View>
//                   </TouchableHighlight>

// <FlatList
//               data={this.funcImage()}
//               extraData={this.state.refresh}
//               renderItem={({item,index}) => (
//                  <TouchableHighlight onPress={() => {
//                 console.log(item);
//                 }}>
//                 <View style={{ flex: 1, flexDirection: "column", margin: 1 }}>
//                   <Image
//                     style={styles.Allphoto}
//                     source={require('./images/ce1.jpg')}
//                   />
//                 </View>
//                 </TouchableHighlight>
//                 //     <FlatList
//                 //   data={item.images}
//                 //   extraData={this.state.refresh}
//                 //   renderItem={({ item2 }) => (
//                 //      <TouchableHighlight onPress={() => {
//                 //     console.log(item.images[item.images.length-1]);
//                 //     }}>
//                 //     <View style={{ flex: 1, flexDirection: "column", margin: 1 }}>
//                 //       {/* <Image
//                 //         style={styles.Allphoto}
//                 //         source={require('./images/ce1.jpg')}
//                 //       /> */}
//                 //       <Image
//                 //           style={styles.Allphoto}
//                 //           source={{
//                 //             uri: 'data:image/jpeg;base64,' + item.images[item.images.length-1],
//                 //           }}
//                 //         />
//                 //     </View>
//                 //     </TouchableHighlight>

//                 //   )}
//                 //   //Setting the number of column
//                 //   numColumns={3}
//                 //   keyExtractor={(item2, index2) => index2}
//                 // />
//                 // <SwiperFlatList
//                 //   // paginationStyle={{fontSize: 10, color: '#ff1', height: 30}}
//                 //   paginationStyleItem={{width: 8, height: 8, marginTop: 45}}
//                 //   paginationActiveColor="#1F43E8"
//                 //   index={0}
//                 //   data={item.images}
//                 //   renderItem={(
//                 //     {item2}, // Standard Image
//                 //   ) => (
//                 //     <View
//                 //       style={{
//                 //         marginBottom: 30,
//                 //         marginTop: 30,
//                 //         width: width,
//                 //         height: 320,
//                 //         backgroundColor: '#000',
//                 //       }}>
//                 //       <Image
//                 //         style={{height: 300, flex: 1, resizeMode: 'stretch'}}
//                 //         source={{
//                 //           uri: 'data:image/jpeg;base64,' + item2,
//                 //         }}
//                 //       />
//                 //     </View>
//                 //   )}
//                 //   showPagination
//                 // />
//               )}
//               //Setting the number of column
//               // numColumns={3}
//                keyExtractor={(item, index) => index}
//             />
