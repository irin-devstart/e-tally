import React from 'react';

import {StyleSheet, Text, Button, View, Image} from 'react-native';
import {androidClientId} from './superSecretKey';
import Expo from 'expo';

export default class LoginSreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: ""
    }
  }
  signIn = async () =>{
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: androidClientId,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
       // return result.accessToken;
          this.setState({
            signedIn: true,
            name: result.user.name,
            photoUrl: result.user.photoUrl
          })
      } else {
        //return {cancelled: true};
        console.log("cancelled")
      }
    } catch(e) {

      console.log("eroor",e)
     // return {error: true};
    }
    
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <LoggedInPage name={this.state.name} 
            photoUrl={this.state.photoUrl}/>
        ) 
        : (
          <LoginPage signIn={this.signIn}/>
        )}
          
      </View>
    );
  }
}

const LoginPage = props => {
  return(
    <View>
      <Text style={styles.header}> Login in With Google</Text>
      <Button title="Login in With Google" onPress={ () => props.signIn()} />
    </View>
  )
}

const LoggedInPage = props => {
  return(
    <View style={styles.container}>
      <Text style={styles.header}> Welcome: {props.name}</Text>
      <Image style={styles.image} source={{uri: props.photoUrl}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
})
