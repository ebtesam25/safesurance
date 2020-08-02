import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

let customFonts  = {
  'Avenir': require('../assets/fonts/Avenir.ttf'),
};

export default class Splash extends React.Component  {
  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render(){
    if (this.state.fontsLoaded) {
    return (
    <View style={styles.container}>
      <Image source={require('../assets/img/splash.png')} style={styles.header}></Image>
      <Text style={styles.welcome} onPress={() => this.props.navigation.navigate('TheMap')}>Welcome!</Text>
    </View>
    );
    }
    else {
    return <AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
    position:'relative',
  },
  header:{
    height:'100%',
    width:'100%',
  },
  welcome:{
    fontFamily:'Avenir',
    fontSize:50,
    alignSelf:'center',
    top:'20%',
    color:'transparent',
    position:'absolute',
    zIndex:2,
  }
});