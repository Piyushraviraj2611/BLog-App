import { Linking, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const SharePost = ({ post }) => {
	return (
		<View style={{ marginTop: 10 }}>
			<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
				<View>
					<Text style={{ color: "#827E7E", fontSize: 18, fontWeight: "700" }}> Share this post </Text>
				</View>
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity
						style={styles.touchableOpacity}
						onPress={() => {
							Share.share({
								title: post.title,
								message: post.title + "\n\n" + post.content.substring(0, 3000) + "..." + "\n\nRead more at " + "Hamza's Blog App",
							});
						}}>
						<FontAwesome name="share-alt" size={24} color="#fff" />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.touchableOpacity}
						onPress={() => {
							Linking.openURL(
								`whatsapp://send?text=${
									"*" + post.title + "*" + "\n\n" + post.content.substring(0, 800) + "..." + "\n\n*Read more at " + "Hamza's Blog App*"
								}`
							);
						}}>
						<FontAwesome name="whatsapp" size={24} color="#fff" />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.touchableOpacity}
						onPress={() => {
							Linking.openURL(
								`https://twitter.com/intent/tweet?text=${
									post.title + "\n\n" + post.content.substring(0, 1000) + "..." + "\n\nRead more at " + "Hamza's Blog App"
								}`
							);
						}}>
						<FontAwesome name="twitter" size={24} color="#fff" />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default SharePost;

const styles = StyleSheet.create({
	// target touchable opacity
	touchableOpacity: {
		backgroundColor: "#7784f8",
		color: "#fff",
		borderRadius: 50,
		padding: 10,
		width: 50,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 10,
	},
});
