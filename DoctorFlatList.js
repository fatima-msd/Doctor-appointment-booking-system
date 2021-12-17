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
        <View style={{flex: 1, flexDirection: 'row-reverse', margin: 3 ,backgroundColor: '#ac8daf',height:height*0.1,borderRadius:30}}>
          {this.props.item.photo != null ? (
            <Image
              style={styles.RecipeImage}
              source={{
                uri:
                  'data:image/jpeg;base64,' +
                  this.props.item.photo,
              }}
            />
          ) : (
            <Image
              style={[styles.RecipeImage, {backgroundColor: '#fff'}]}
              source={require('./images/Doctor1.png')}
            />
          )}

          <View style={styles.RecipeTitle} opacity={1}>
            <View style={{margin:10}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#0A0A0A',
                  fontWeight: 'bold',
                  fontSize: 20,
                  textDecorationLine:'underline'
                }}>
                {this.props.item.first_name + ' ' + this.props.item.last_name}
              </Text>
            </View>
            <View style={{}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#0A0A0A',
                  backgroundColor:'#C2CACf',
                  fontSize: 15,
                  marginBottom:10
                }}>
                {'  تخصص  :  '+ this.props.item.name + '    '}
              </Text>
              {/* <Text
                style={{
                  textAlign: 'center',
                  color: '#0A0A0A',
                  fontSize: 15,
                }}>
                {'اولین نوبت خالی:' + this.props.item.year + '/' +this.props.item.month + "/" +this.props.item.day + "   " + this.props.item.start_hour +"-"+ this.props.item.end_hour}
              </Text> */}
            </View>
            
          </View>
          <View style={{flex: 1, flexDirection: 'column', margin: 6,justifyContent:'space-around'}}>
            {/* <MyButton
              title="مشاهده ی پروفایل"
              onPress={() => {
                //this.props.navigation.navigate('App');
              }}
              backgroundColor="#1F05"
              color="#fff"
              fontSize={12}
              height={30}
              borderRadius={100}
              width={100}
            /> */}
            <MyButton
              title="گرفتن نوبت"
              onPress={this.props.op}
              backgroundColor="#1F05"
              color="#fff"
              fontSize={12}
              height={30}
              borderRadius={100}
              width={100}
            />
            </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}
