import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Text, StyleSheet, Platform } from 'react-native';

import ProfileScreen from '../screens/Profile';

const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="Profile"
            tabBarOptions={{
                activeTintColor: 'white', 
                activeBackgroundColor: '#fda039', 
                labelPosition: 'beside-icon', 
                tabStyle: styles.tabStyle,
                style: styles.tabBarStyle
            }}>
            <Tab.Screen name="Tab1" component={ProfileScreen}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color}/>,
                tabBarLabel: ({ focused, color}) => focused?<Text style={{color: color, marginLeft: 15, fontSize: 12}}>Tab1</Text>: null,
              }}
            />
            <Tab.Screen name="Tab2" component={ProfileScreen}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="notifications" color={color}/>,
                tabBarLabel: ({ focused, color}) => focused?<Text style={{color: color, marginLeft: 15, fontSize: 12}}>Tab2</Text>: null,
              }}
            />
            <Tab.Screen name="Tab3" component={ProfileScreen}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="perm-contact-calendar" color={color}/>,
                tabBarLabel: ({ focused, color}) => focused?<Text style={{color: color, marginLeft: 15, fontSize: 12}}>Tab2</Text>: null,
              }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color}/>,
                tabBarLabel: ({ focused, color}) => focused?<Text style={{color: color, marginLeft: 15, fontSize: 12}}>Profile</Text>: null,
              }}
            />
        </Tab.Navigator>
    );
}

function TabBarIcon(props) {
    return <MaterialIcons size={20} {...props}/>
}

const styles = StyleSheet.create({
    tabStyle: {
        borderRadius: 25,
        marginTop: 12, 
        marginBottom: 12
    },
    tabBarStyle: {
        height: (Platform.OS == 'ios'? 90: 60), 
        bottom: (Platform.OS == 'ios' ? 0: 0) 
    }
});

export default MainTab;