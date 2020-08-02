import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Loc from '../assets/img/locb.png'

export default class TheMap extends Component {

  constructor() {
    super();
    this.state = {
      show: false,
      markers: [{"latlng":{
        "latitude": 25.76684817404011,
        "longitude": -80.19163068383932,
      }}],
    };
  }

  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  };

  render() {
    return (
      <View style={{backgroundColor:'#FFF', flex:1}}>
        <View style={{backgroundColor:'#0E1B38', height:550, position:'absolute',zIndex:1, width:'100%'}}>
            <Text style={{fontSize:20,fontFamily:'Avenir', color:'#6B92D6', marginTop:'10%', marginLeft:'10%'}}>How safe is this place?</Text>
            <Image  source={Loc} style={{height:1, width:1, position:'absolute', zIndex:2, resizeMode:'contain',marginTop:'16%', marginLeft:'10%' }}></Image>
            <Text style={{fontSize:50,fontFamily:'Avenir', color:'#6B92D6', marginTop:'1%', marginLeft:'20%'}}>{this.state.markers[0].latlng.latitude.toFixed(2)},{this.state.markers[0].latlng.longitude.toFixed(2)}</Text>
        </View>
        <View style={styles.mapContainer}> 
        <MapView
        style={styles.map}
        initialRegion={{
          latitude: 25.7664362,
          longitude: -80.1915964,
          latitudeDelta: .005,
          longitudeDelta: .005
        }} 
        onLongPress={this.ShowHideComponent}
        onPress={(e) => this.setState({ markers: [{ latlng: e.nativeEvent.coordinate }] })}>
          {
              this.state.markers.map((marker, i) => (
                  <MapView.Marker key={i} coordinate={marker.latlng} >
                   {console.log(marker.latlng)}
                </MapView.Marker>
                
                  
              ))}
              
      </MapView>
      </View>
     
      <Text style={{borderRadius:10, width:'80%', position:'absolute', zIndex:2,bottom:'2.5%', alignSelf:'center',textAlign:'center', height:70,fontFamily:'Avenir', fontSize:30, backgroundColor:'#6B92D6', textAlignVertical:'center', color:'#FFF'}}  onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Details', {
              latitude: this.state.markers[0].latlng.latitude,
              longitude: this.state.markers[0].latlng.longitude,
            });
          }}>Confirm</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray'
  },
  mapContainer: {
    height: 520,
    borderRadius:50,
    width:'90%',
    alignSelf:'center',
    position:'absolute',
    zIndex:2,
    top:'20%',
    backgroundColor:'#F2F3F5',
    alignContent:'center',
  },
  map: {
    height: '92%',
    borderRadius:100,
    width:'90%',
    margin:'5%',
    alignSelf:'center',
    
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  }
});