import React, {PureComponent} from 'react';

import {
  YellowBox,
  Image,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Text, View, Icon} from 'native-base';
import MyButton from './Mybtn';
import styles from './Styles';
const {width, height} = Dimensions.get('screen');
export default class AppointmentFlatList extends PureComponent {
  render() {
    return (
      <TouchableNativeFeedback onPress={this.props.onPress1}>
        <View style={{flex: 1, flexDirection: 'column',justifyContent:'center',alignItems:'center', marginRight:5,marginLeft:5,marginTop:2,marginBottom:5, borderRadius:30 ,backgroundColor: '#ac8daf',height:height*0.25,width:width*0.8}}>
            <View style ={{margin:10,flexDirection:'row-reverse',justifyContent:'flex-start',alignItems:'center',height:'80%',width:'70%'}}>

            <View style={{width:'40%',justifyContent:'flex-start',alignItems:'flex-end',height:'90%'}}>
              <Text
                style={{
                  textAlign:  'right',
                  color: '#0443F9',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                {"نام دکتر : "+"\n\n"+'نام بیمار : ' + "\n" + 'تاریخ نوبت : ' + "\n" + "ساعت نوبت : " + "\n" + " آدرس : "}
              </Text>
            </View>
            <View style={{justifyContent:'flex-start',alignItems:'flex-end',height:'90%'}}>
              <Text
                style={{
                  textAlign:  'right',
                  fontSize: 15,
                  textDecorationLine:'underline'
                }}>
                {this.props.item.doctor_name + " " + this.props.item.doctor_lastname+"\n\n"+ this.props.item.first_name +" " + this.props.item.last_name + "\n" + this.props.item.year + '/' +this.props.item.month + "/" +this.props.item.day + "\n" + this.props.item.start_hour +" - "+ this.props.item.end_hour+ "\n" + " خیابان : " + this.props.item.street + "\n کوچه :" +this.props.item.alley+ "\n پلاک : " + this.props.item.plaque }
              </Text>
            </View>

            {/* <View style={{marginRight:20,width:width*0.7,justifyContent:'flex-start',alignItems:'flex-end'}}>
              <Text
                style={{
                  textAlign:  'auto',
                  color: '#0A0A0A',
                  fontWeight: 'bold',
                  fontSize: 15,
                  
                }}>
                {"نام بیمار : "+this.props.item.first_name + ' ' + this.props.item.last_name}
              </Text>
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#0A0A0A',
                  
                  fontSize: 15,
                }}>
                {"شماره تلفن : "+this.props.item.first_name_d}
              </Text>
              
            </View> */}
            </View>
            
            
          
          {/* <View style={{height:'20%', flexDirection: 'row', margin: 1,justifyContent:'space-evenly'}}>
            <MyButton
              title="کنسل کردن"
              onPress={() => {
                //this.props.navigation.navigate('App');
              }}
              backgroundColor="#F7160B"
              color="#fff"
              fontSize={12}
              height={30}
              borderRadius={100}
              width={60}
            />
            
            </View> */}
        </View>
      </TouchableNativeFeedback>
    );
  }
}
