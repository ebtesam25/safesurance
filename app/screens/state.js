import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import MapView, { Marker, Heatmap } from 'react-native-maps'
import Loc from '../assets/img/locb.png'
var obj = [];
var colorcode = [];
var heatmap = [];
export default class State extends Component {

  constructor() {
    super();
    this.state = {
      show: false,
      markers: [],
      amarker: [{"latlng":{
        "latitude": 25.76684817404011,
        "longitude": -80.19163068383932,
      }}],
      heatmap:[],
      wildfire:[],
    };
  }

  componentDidMount(){

    fetch('https://us-central1-aiot-fit-xlab.cloudfunctions.net/getstateriskdata', {
    method: 'GET'
 })
 .then((response) => response.json())
 .then((responseJson) => {
   obj  = responseJson.data;
    var i=0; var j = 0;
    
   
      
   this.setState({markers:obj});

   for(j=0;j<51;j++){
       heatmap[j] = {"latitude":parseFloat(this.state.markers[j].lat),"longitude":parseFloat(this.state.markers[j].lon),"weight":this.state.markers[j].overallrisk/10}
   }
   this.setState({heatmap:heatmap});
   console.log(this.state.heatmap);
   var i=0; var j = 0;
 
for (j=0;j<obj.length;j++){
    if(this.state.markers[j].overallrisk>0 && this.state.markers[j].overallrisk<=20){
    colorcode[j]="green";
}
else if(this.state.markers[j].overallrisk>20 && this.state.markers[j].overallrisk<=40){
    colorcode[j]="blue";
}
else if(this.state.markers[j].overallrisk>40 && this.state.markers[j].overallrisk<=60){
    colorcode[j]="yellow";
}
else if(this.state.markers[j].overallrisk>60 && this.state.markers[j].overallrisk<=80){
    colorcode[j]="orange";
}
else if(this.state.markers[j].overallrisk>80 && this.state.markers[j].overallrisk<=100){
    colorcode[j]="red";
}
else{
    colorcode[j]="#CCC";

}

}
    
 })
 .catch((error) => {
    console.error(error);
 });


    
  }

 
  render() {
      if(this.state.heatmap[20]==null || colorcode[20]==null){
          return (
            <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
          )
      }
      else{
    return (
      <View style={{backgroundColor:'#FFF', flex:1}}>
        <View style={{backgroundColor:'#0E1B38', height:550, position:'absolute',zIndex:1, width:'100%'}}>
            
            <Image  source={Loc} style={{height:1, width:1, position:'absolute', zIndex:2, resizeMode:'contain',marginTop:'16%', marginLeft:'10%' }}></Image>
            <Text style={{fontSize:50,fontFamily:'Avenir', color:'#6B92D6', marginTop:'16%', marginLeft:'20%'}}>{this.state.amarker[0].latlng.latitude.toFixed(2)},{this.state.amarker[0].latlng.longitude.toFixed(2)}</Text>
        </View>
        <View style={styles.mapContainer}> 
        <MapView
        style={styles.map}
        initialRegion={{
          latitude: 25.7664362,
          longitude: -80.1915964,
          latitudeDelta: 10,
          longitudeDelta: 10
        }} 
        onPress={(e) => this.setState({ amarker: [{ latlng: e.nativeEvent.coordinate }] })}
        onLongPress={(e) => this.setState({ amarker: [{ latlng: e.nativeEvent.coordinate }] })}>
          {
              this.state.amarker.map((marker, i) => (
                  <MapView.Marker key={i} coordinate={marker.latlng} >
                   {console.log(marker.latlng)}
                </MapView.Marker>
                
                  
              )),
              this.state.markers.map((marker, j) => (
                <Marker key={j} coordinate={{latitude:parseFloat(marker.lat),longitude:parseFloat(marker.lon)}} title={marker.state} description={"Earthquake:"+marker.quakerisk+","+"Flood:"+marker.floodrisk +","+"Storm:"+marker.stormrisk+","+"Fire:"+marker.firerisk} >
                 {console.log(colorcode[j])}<Text style={{color:colorcode[j], padding:"2%", fontFamily:'Avenir', borderRadius:50}}>{marker.overallrisk}</Text>
              </Marker>
            ))
              }
          <MapView.Heatmap points={this.state.heatmap} radius={50} colors={["#A2FAA3","#92C9B1","#4F759B","#5D5179","#571F4E"]}></MapView.Heatmap>
            
      </MapView>
      </View>
     
      <Text style={{borderRadius:10, width:'80%', position:'absolute', zIndex:2,bottom:'2.5%', alignSelf:'center',textAlign:'center', height:70,fontFamily:'Avenir', fontSize:30, backgroundColor:'#6B92D6', textAlignVertical:'center', color:'#FFF'}}  onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Details', {
              latitude: this.state.amarker[0].latlng.latitude,
              longitude: this.state.amarker[0].latlng.longitude,
              scoreset: "up",
            });
          }}>Details</Text>
      </View>
    );
  }
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
    backgroundColor:'#AFDBFF',
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