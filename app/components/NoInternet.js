import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const NoInternet = ({ onRefresh }) => {
	return (
		<View style={styles.container}>
			<Feather name="wifi-off" size={35} color="rgba(0,0,0,0.4)" />

			<Text style={{ textAlign: "center", fontSize: 18, marginTop: 20, color: "rgba(0,0,0,0.4)" }}>No internet connection</Text>

			<TouchableOpacity onPress={onRefresh}>
				<Text style={{ textAlign: "center", fontSize: 18, marginTop: 15, color: "rgba(0,0,0,0.4)" }}>
					<Feather name="refresh-cw" size={18} color="rgba(0,0,0,0.4)" /> Try Again{" "}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default NoInternet;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
