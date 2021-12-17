import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import posed from "react-native-pose";
const {width, height} = Dimensions.get('screen');
const windowWidth = Dimensions.get("window").width;
const tabWidth = windowWidth / 3;
const SpotLight = posed.View({
  route0: { x: 0 },
  route1: { x: tabWidth },
   route2: { x: tabWidth * 2 },
  // route3: { x: tabWidth * 3 },
  // route4: { x: tabWidth * 4 }
});

const Scaler = posed.View({
  active: { scale: 1.25 },
  inactive: { scale: 1 }
});

const S = StyleSheet.create({
  container: {
    flexDirection: "row",
    height:height*0.08,
    elevation: 2,
    alignItems: "center",
    backgroundColor: '#E7E6EC'
  },
  tabButton: { flex: 1 },
  spotLight: {
    width: tabWidth,
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  spotLightInner: {
    width: height*0.1,
    height:height*0.1,
    backgroundColor: '#86EEF9',
    borderRadius: 100,
    // paddingBottom:30,
     marginTop: 0,
    // marginBottom: 20,
  },
  spotLightInner2: {
    width: height*0.17,
    height:height*0.16,
     backgroundColor: '#E7E6EC',
      borderColor: '#E7E6EC',
      borderTopWidth: 5,
      borderLeftWidth: 1,
      borderRightWidth: 1,
    borderRadius: 60,
    justifyContent:'flex-start',
    alignItems:'center',
    paddingTop: 5,
    // marginBottom: 20
  },
  scaler: { flex: 1, alignItems: "center", justifyContent: 'center'}
});

const TabBar = props => {
  const {
    renderIcon,
    getLabelText,
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation
  } = props;

  const { routes, index: activeRouteIndex } = navigation.state;

  return (
    <View style={S.container}>
      <View style={[StyleSheet.absoluteFillObject,{zIndex: 0}]}>
        <SpotLight style={S.spotLight} pose={`route${activeRouteIndex}`}>
            <View style={S.spotLightInner2}>
          <View style={S.spotLightInner} />
          </View>
        </SpotLight>
      </View>

      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

        return (
          <TouchableOpacity
            key={routeIndex}
            style={S.tabButton}
            onPress={() => {
              onTabPress({ route });
            }}
            onLongPress={() => {
              onTabLongPress({ route });
            }}
            accessibilityLabel={getAccessibilityLabel({ route })}
          >
            <Scaler
              pose={isRouteActive ? "active" : "inactive"}
              style={S.scaler}
            >
            <View style = {{height:'120%',alignItems:'center'}}>
              <View style = {{flex:1,paddingTop:isRouteActive?0:height*0.03,paddingBottom:0,height:'35%'}}>{renderIcon({ route, focused: isRouteActive, tintColor })}</View>
              <View style={{height:isRouteActive?'65%':0,width:'100%',justifyContent:'flex-start'}}>{isRouteActive?<Text style={{color:tintColor,fontSize:10}}>{getLabelText({ route })}</Text>:null}
              </View>
              </View>
              {/* {renderLabel({ route, focused: isRouteActive, tintColor })} */}
            </Scaler>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;