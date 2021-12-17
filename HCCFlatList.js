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
export default class HCCFlatList extends PureComponent {
  render() {
    return (
      <TouchableNativeFeedback onPress={this.props.onPress1}>
        <View style={{flex: 1, flexDirection: 'row-reverse', margin: 3 ,backgroundColor: '#ac8daf',height:height*0.13,borderRadius:30}}>
          
            <Image
              style={[styles.RecipeImage, {backgroundColor: '#fff'}]}
              source={require('./images/hospital2.png')}
            />
         

          <View style={styles.HCCTitle} opacity={1}>
            <View style={{margin:10}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#0A0A0A',
                  fontWeight: 'bold',
                  fontSize: 20,
                  textDecorationLine:'underline'
                }}>
                {this.props.item.name }
              </Text>
            </View>
            <View style={{}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#0A0A0A',
                  fontSize: 15,
                  marginBottom:10
                }}>
                {" خیابان : " + this.props.item.street +" کوچه :  " +this.props.item.alley+ " پلاک : " + this.props.item.plaque}
              </Text>
            </View>
            
          </View>
          {/* <View style={{flex: 1, flexDirection: 'column', margin: 6,justifyContent:'space-around'}}>
            <MyButton
              title="اطلاعات بیشتر"
              onPress={() => {
                //this.props.navigation.navigate('App');
              }}
              backgroundColor="#1F05"
              color="#fff"
              fontSize={12}
              height={30}
              borderRadius={100}
              width={100}
            />
            
            </View> */}
        </View>
      </TouchableNativeFeedback>
    );
  }
}
