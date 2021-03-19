import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import InformationScreen from '../screens/Information';
import PortfolioScreen from '../screens/Portfolio';

const Tab = createMaterialTopTabNavigator();

const EditProfileScreen = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Information" component={InformationScreen}/>
            <Tab.Screen name="Portfolio" component={PortfolioScreen}/>
        </Tab.Navigator>       
    );
}

export default EditProfileScreen;