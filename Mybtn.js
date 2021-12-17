import React, { Component } from "react";
import { View, Text, TouchableNativeFeedback, } from "react-native";
import{Icon} from "native-base";
//import Icon from 'react-native-vector-icons/MaterialIcons';

class MyButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.Icon) {
      var icon = this.props.Icon;
    } else {
      var icon = false;
    }
    if (this.props.height) {
      var h = this.props.height;
    } else {
      var h = 45;
    }
    if (this.props.width) {
      var w = this.props.width;
    } else {
      var w = 45;
    }
    if (this.props.backgroundColor) {
      var bg = this.props.backgroundColor;
    } else {
      var bg = "#E91E63";
    }
    if (this.props.color) {
      var c = this.props.color;
    } else {
      var c = "#fff";
    }
    if (this.props.marginTop) {
      var mt = this.props.marginTop;
    } else {
      var mt = 0;
    }
    if (this.props.marginBottom) {
      var mb = this.props.marginBottom;
    } else {
      var mb = 0;
    }
    if (this.props.marginLeft) {
      var ml = this.props.marginLeft;
    } else {
      var ml = 0;
    }
    if (this.props.marginRight) {
      var mr = this.props.marginRight;
    } else {
      var mr = 0;
    }
    if (this.props.fontSize) {
      var fs = this.props.fontSize;
    } else {
      var fs = 12;
    }
    if (this.props.borderRadius) {
      var br = this.props.borderRadius;
    } else {
      var br = 0;
    }
    if (this.props.borderColor) {
      var bc = this.props.borderColor;
    } else {
      var bc = bg;
    }
    if (this.props.borderWidth) {
      var bw = this.props.borderWidth;
    } else {
      var bw = 0;
    }

    return (
      <TouchableNativeFeedback onPress={this.props.onPress}>
        <View
          style={{
            height: h,
            backgroundColor: this.props.backgroundColor ? bg : '',
            marginTop: mt,
            marginBottom: mb,
            marginLeft: ml,
            marginRight: mr,
            width: w,
            justifyContent: "center",
            alignItems: "center",
            borderColor: bc,
            borderWidth: bw,
            borderRadius: br,
            fontWeight: 'bold'
          }}
        >
          {icon ? (
            <Icon
              name={this.props.nameIcon}
              type={this.props.typeIcon}
              style ={{color:this.props.colorIcon}}
              fontSize={this.props.fontSizeIcon}
              
            />
          ) : (null)}
          {(this.props.title == '') ?(null):
          (<Text
            style={{ fontFamily: "IRANSansMobile", color: c, fontSize: fs }}
          >
            {this.props.title}
          </Text>)
          }
        </View>
      </TouchableNativeFeedback>
    );
  }
}

export default MyButton;
