import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons ,Entypo,MaterialCommunityIcons} from "@expo/vector-icons";
import Search from "../components/Search";
import CreatePostLink from "../components/CreatePostLink";
import AppNavigator from "./AppNavigator";
import { Linking } from 'react-native';
import AboutUs from "../components/AboutUs";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused, color, size }) => <Octicons name="home" size={size} color={color} />,
				}}
				name="HomeScreen"
				component={AppNavigator}
			/>
			
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused, color, size }) => <Octicons name="search" size={size} color={color} />,
				}}
				name="SearchScreen"
				component={Search}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused, color, size }) => <Entypo name="add-to-list" size={size} color={color} />,
				}}
				name="AddPost"
			//	onPress={Linking.openURL('http://google.com')}
				component={CreatePostLink}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused, color, size }) => <MaterialCommunityIcons name="account-group" size={size} color={color} />,
				}}
				name="AboutUs"
			//	onPress={Linking.openURL('http://google.com')}
				component={AboutUs}
			/>
		</Tab.Navigator>
	);
};

export default TabNavigator;
