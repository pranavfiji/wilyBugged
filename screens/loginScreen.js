import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View,Image,Alert,KeyboardAvoidingView,ToastAndroid} from 'react-native';
 
import * as firebase from "firebase"
import db from "../config"

export default class LoginScreen extends React.Component{
    constructor(){
        super();
    this.state={
        emailId:"",
        password:""
    }
    }
    login=async(email,password)=>{
        console.log("login Started")
        console.log(email+ password)
        if(email && password){
          // try is executing each and every line, due to some conditions,   this finds the error and catched it
            try{
                console.log("Came into try block")
                const response = await firebase.auth().signInWithEmailAndPassword(email,password)
                console.log(response);
                alert(response);
                if(response){
                  this.props.navigation.navigate('Transaction')
                }
            }
            catch(error){
                switch (error.code) {
                    case 'auth/user-not-found':
                      alert("user dosen't exists")
                      console.log("doesn't exist")
                      
                      break
                    case 'auth/invalid-email':
                      alert('incorrect email or password')
                      console.log('invaild')
                      break
                  }
            }

            
            console.log("Login ENded")
        }
    }

    

    render(){
        return(
            <KeyboardAvoidingView style = {{alignItems:'center',marginTop:20}}>
            <View>
              <Image
                source={require("../assets/appImg.jpg")}
                style={{width:200, height: 200}}/>
              <Text style={{textAlign: 'center', fontSize: 30}}>Wily</Text>
            </View>
            <View>
            <TextInput
              style={styles.loginBox}
              placeholder="abc@example.com"
              keyboardType ='email-address'
              onChangeText={(text)=>{
                this.setState({
                  emailId: text
                })
              }}
            />
    
            <TextInput
              style={styles.loginBox}
              secureTextEntry = {true}
              placeholder="enter Password"
              onChangeText={(text)=>{
                this.setState({
                  password: text
                })
              }}
            />
            </View>
            <View>
              <TouchableOpacity style={{height:30,width:90,borderWidth:1,marginTop:20,
              paddingTop:5,borderRadius:7}}
              onPress={()=>{this.login(this.state.emailId ,this.state.password)}}>
              <Text style={{textAlign:'center'}}>Login</Text>
            </TouchableOpacity>
  
          </View>
        </KeyboardAvoidingView>
  
        )
       
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginBox:
  {
    width: 300,
  height: 40,
  borderWidth: 1.5,
  fontSize: 20,
  margin:10,
  paddingLeft:10
  }
});