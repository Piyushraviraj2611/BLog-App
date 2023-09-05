import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Home from "../components/Home";
import PostDetails from "../components/PostDetails";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
	const navigation = useNavigation();
	return (
		<Stack.Navigator>
			<Stack.Screen options={{ headerShown: false }} component={Home} name="Home" />
			<Stack.Screen
				options={{
					title: "",
					headerTransparent: true,
					headerShadowVisible: false,
					headerLeft: (props) => (
						<TouchableWithoutFeedback {...props} onPress={() => navigation.goBack()}>
							<View
								style={{
									width: 40,
									height: 40,
									justifyContent: "center",
									alignItems: "center",
									borderRadius: 20,
									backgroundColor: "rgba(0,0,0,0.5)",
								}}>
								<Ionicons name="arrow-back" size={24} color="white" />
							</View>
						</TouchableWithoutFeedback>
					),
				}}
				component={PostDetails}
				name="PostDetails"
			/>
		</Stack.Navigator>
	);
};

export default AppNavigator;
