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
export default class DoctorFlatList extends PureComponent {
  render() {
    return (
      <TouchableNativeFeedback onPress={this.props.onPress1}>
        <View style={{flex: 1, flexDirection: 'row-reverse',justifyContent:'center',alignItems:'center', marginRight:width*0.025,marginLeft:width*0.025,marginTop:2,marginBottom:5, borderRadius:30 ,backgroundColor: '#ac8daf',height:height*0.07,width:width*0.95}}>
          
            <View style={{width:'30%'}}>
              <Text
                style={{
                  textAlign:  'right',
                  color: '#0A0A0A',
                  fontWeight: 'bold',
                  fontSize: 20,
                  textDecorationLine:'underline',
                  paddingRight:10
                }}>
                {this.props.item.first_name + ' ' + this.props.item.last_name}
              </Text>
            </View>
            <View style={{justifyContent:'center',alignItems:'center',width:'50%'}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#0A0A0A',
                  
                  fontSize: 15,
                }}>
                {"شماره تلفن : "+this.props.item.phone_number}
              </Text>
              
            </View>
            
            {/* <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}>
                          <Icon
                            name="stars"
                            type="MaterialIcons"
                            style={{
                              color: this.props.item.score > 0 ? '#8F0085' : '#fff',
                              fontSize: 15,
                            }}
                          />
                          <Icon
                            name="stars"
                            type="MaterialIcons"
                            style={{
                              color: this.props.item.score > 1 ? '#8F0085' : '#fff',
                              fontSize: 15,
                            }}
                          />
                          <Icon
                            name="stars"
                            type="MaterialIcons"
                            style={{
                              color: this.props.item.score > 2 ? '#8F0085' : '#fff',
                              fontSize: 15,
                            }}
                          />
                          <Icon
                            name="stars"
                            type="MaterialIcons"
                            style={{
                              color: this.props.item.score > 3 ? '#8F0085' : '#fff',
                              fontSize: 15,
                            }}
                          />
                          <Icon
                            name="stars"
                            type="MaterialIcons"
                            style={{
                              color: this.props.item.score > 4 ? '#8F0085' : '#fff',
                              fontSize: 15,
                            }}
                          />
                        </View> */}
          
          <View style={{width:'20%', flexDirection: 'row',justifyContent:'space-evenly'}}>
            <MyButton
              title="ویرایش"
              onPress={() => {
                //this.props.navigation.navigate('App');
              }}
              backgroundColor="#105"
              color="#fff"
              fontSize={12}
              height={30}
              borderRadius={100}
              width={50}
            />
            {/* <MyButton
              title="حذف"
              onPress={() => {
                //this.props.navigation.navigate('App');
              }}
              backgroundColor="#105"
              color="#fff"
              fontSize={12}
              height={30}
              borderRadius={100}
              width={50}
            /> */}
            </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}
