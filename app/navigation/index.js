import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import SubmitRequestScreen from '../screens/SubmitRequest';
import MainTab from './tab';
import EditProfileScreen from './editprofile';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();


const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Main" component={MainTab} options={{ headerShown: false }}/>           
                <Stack.Screen name="SubmitRequest" component={SubmitRequestScreen} options={{ headerShown: false }}/>    
                <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{
                    headerStyle: {
                        backgroundColor: '#fda039'
                    },
                    headerTitleStyle: {
                        color: 'white'
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: () =>{
                        return (
                            <Ionicons name="ios-arrow-back" size={25} color="white" style={{marginLeft: 10}}/>
                        )
                    }
                }}/> 
            </Stack.Navigator>
        </NavigationContainer>        
    );
}

export default Navigation;