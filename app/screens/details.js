import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Loc from '../assets/img/locg.png'
import Bg from '../assets/img/map.png'
import Eq from '../assets/img/earthquake.png'
import Fire from '../assets/img/fire.png'
import Storm from '../assets/img/storm.png'
import Flood from '../assets/img/flood.png'
import Radio from '../assets/img/radioactive.png'

var valueColorE="#FFF";
var valueColorF="#FFF";
var valueColorFl="#FFF";
var valueColorS="#FFF";
var valueColorO="#FFF";
export default class Details extends Component {

  constructor() {
    super();
    this.state = {
      show: false,
      quake:0,
      fire:0,
      storm:0,
      flood:0,
      overall:0,
      scoreset:"",
    };
    
  }

  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  };

componentDidMount(){
    
}


  getRiskScores(latitude,longitude){
      if(this.state.scoreset==""){
    fetch('https://us-central1-aiot-fit-xlab.cloudfunctions.net/getriskscoresbylocation', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "lat":latitude,  
          "lon":longitude,   

        })
})
    .then((response) => response.json())
    .then((responseJson) => {
       console.log(responseJson);
       this.setState({quake:responseJson.quake});
       this.setState({fire:responseJson.fire});
       this.setState({storm:responseJson.storm});
       this.setState({flood:responseJson.flood});
       this.setState({overall:responseJson.overall});
       this.setState({scoreset:"success"});
       console.log(this.state.scoreset);
    })
    .catch((error) => {
        console.error(error);
    });
}
if(this.state.quake>0 && this.state.quake<=20){
        valueColorE="#A2FAA3";
    }
    else if(this.state.quake>20 && this.state.quake<=40){
        valueColorE="#92C9B1";
    }
    else if(this.state.quake>40 && this.state.quake<=60){
        valueColorE="#4F759B";
    }
    else if(this.state.quake>60 && this.state.quake<=80){
        valueColorE="#5D5179";
    }
    else if(this.state.quake>80 && this.state.quake<=100){
        valueColorE="#F00";
    }
if(this.state.flood>0 && this.state.flood<=20){
        valueColorFl="#A2FAA3";
    }
    else if(this.state.flood>20 && this.state.flood<=40){
        valueColorFl="#92C9B1";
    }
    else if(this.state.flood>40 && this.state.flood<=60){
        valueColorFl="#4F759B";
    }
    else if(this.state.flood>60 && this.state.flood<=80){
        valueColorFl="#5D5179";
    }
    else if(this.state.flood>80 && this.state.flood<=100){
        valueColorFl="#F00";
    }
if(this.state.fire>0 && this.state.fire<=20){
        valueColorF="#A2FAA3";
    }
    else if(this.state.fire>20 && this.state.fire<=40){
        valueColorF="#92C9B1";
    }
    else if(this.state.fire>40 && this.state.fire<=60){
        valueColorF="#4F759B";
    }
    else if(this.state.fire>60 && this.state.fire<=80){
        valueColorF="#5D5179";
    }
    else if(this.state.fire>80 && this.state.fire<=100){
        valueColorF="#F00";
    }
if(this.state.storm>0 && this.state.storm<=20){
        valueColorS="#A2FAA3";
    }
    else if(this.state.storm>20 && this.state.storm<=40){
        valueColorS="#92C9B1";
    }
    else if(this.state.storm>40 && this.state.storm<=60){
        valueColorS="#4F759B";
    }
    else if(this.state.storm>60 && this.state.storm<=80){
        valueColorS="#5D5179";
    }
    else if(this.state.storm>80 && this.state.storm<=100){
        valueColorF="#F00";
    }
if(this.state.overall>0 && this.state.overall<=20){
        valueColorO="#A2FAA3";
    }
    else if(this.state.overall>20 && this.state.overall<=40){
        valueColorO="#92C9B1";
    }
    else if(this.state.overall>40 && this.state.overall<=60){
        valueColorO="#4F759B";
    }
    else if(this.state.overall>60 && this.state.overall<=80){
        valueColorO="#5D5179";
    }
    else if(this.state.overall>80 && this.state.overall<=100){
        valueColorO="#F00";
    }
    else{
        valueColorO="#CCC";

    }
}



  render() {
    const { navigation, route } = this.props;
    const { latitude,longitude,scoreset } = route.params;
    return (

      <View style={{backgroundColor:'#FFF', flex:1}}>
          {this.getRiskScores(latitude,longitude)}
        <View style={{backgroundColor:'#6B92D6', height:550, position:'absolute',zIndex:1, width:'100%'}}>
            <Text style={{fontSize:20,fontFamily:'Avenir', color:'#DDFBD2', marginTop:'10%', marginLeft:'10%'}}>Detailed Risk Score for</Text>
            <Image  source={Loc} style={{height:15, width:15, position:'absolute', zIndex:2, resizeMode:'contain',marginTop:'15%', marginLeft:'10%' }}></Image>
            <Text style={{fontSize:50,fontFamily:'Avenir', color:'#DDFBD2', marginTop:'1%', marginLeft:'25%'}}>{latitude.toFixed(2)},{longitude.toFixed(2)}</Text>
        </View>
        <View style={styles.mapContainer}> 
        <Text style={{height:40, width:150, fontFamily:'Avenir', fontSize:30, position:'absolute', top:'10%', left:'20%', color:valueColorE}}>{this.state.quake}</Text><Image source={Eq} style={{height:40, width:40, resizeMode:'contain', position:'absolute', top:'20%', left:'20%'}}></Image><Text style={{height:40, width:150, fontFamily:'Avenir', fontSize:20, position:'absolute', top:'30%', left:'10%', color:'#6B92D6'}}>EARTHQUAKE</Text>
        <Text style={{height:40, width:150, fontFamily:'Avenir', fontSize:30, position:'absolute', top:'40%', left:'20%', color:valueColorF}}>{this.state.fire}</Text><Image source={Fire} style={{height:40, width:40, resizeMode:'contain', position:'absolute', top:'50%', left:'20%'}}></Image><Text style={{height:40, width:150, fontFamily:'Avenir', fontSize:20, position:'absolute', top:'60%', left:'20%', color:'#6B92D6'}}>FIRE</Text>
        <Text style={{height:40, width:150, fontFamily:'Avenir', fontSize:30, position:'absolute', top:'10%', right:'-7%', color:valueColorFl}}>{this.state.flood}</Text><Image source={Flood} style={{height:40, width:40, resizeMode:'contain', position:'absolute', top:'20%', right:'20%'}}></Image><Text style={{height:40, width:150, fontFamily:'Avenir', fontSize:20, position:'absolute', top:'30%', right:'-5%', color:'#6B92D6'}}>FLOOD</Text>
        <Text style={{height:40, width:150, fontFamily:'Avenir', fontSize:30, position:'absolute', top:'40%', right:'-7%', color:valueColorS}}>{this.state.storm}</Text><Image source={Storm} style={{height:40, width:40, resizeMode:'contain', position:'absolute', top:'50%', right:'20%'}}></Image><Text style={{height:40, width:150, fontFamily:'Avenir', fontSize:20, position:'absolute', top:'60%', right:'-5%', color:'#6B92D6'}}>STORM</Text>
        <Text style={{height:50, width:150, fontFamily:'Avenir', fontSize:40, position:'absolute', top:'75%', left:'17%', color:valueColorO}}>{this.state.overall}</Text><Text style={{height:40, width:150, fontFamily:'Avenir', fontSize:20, position:'absolute', top:'85%', left:'10%', color:'#6B92D6', textAlign:'center'}}>OVERALL</Text>
        <Image  source={Radio} style={{height:10, width:10, position:'absolute', zIndex:2, resizeMode:'contain',marginLeft:'60%', marginTop:'95%' }}></Image><Text style={{fontFamily:'Avenir', fontSize:40, position:'absolute', top:'75%', left:'57%', color:'transparent', zIndex:5}} onPress={()=>{this.props.navigation.navigate('Radio')}}>RADIO</Text>
      </View>
      
      <Text style={{borderRadius:10, width:'80%', position:'absolute', zIndex:3,bottom:'2.5%', alignSelf:'center',textAlign:'center', height:70,fontFamily:'Avenir', fontSize:30, textAlignVertical:'center', color:'transparent'}}  onPress={() => {
            this.props.navigation.navigate('State');
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
    elevation:2,
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