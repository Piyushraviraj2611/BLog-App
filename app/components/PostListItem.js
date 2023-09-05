import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import React from "react";
import dateFormat from "dateformat";

const IMAGE_WIDTH = 100;

const PostListItem = ({ post, onPress }) => {
	const { thumbnail, title, createdAt, author } = post;

	const getThumbnail = (uri) => {
		if (uri) return { uri }; // { uri: uri }

		return require("../../assets/default-blog-thumbnail.jpg"); // if uri is null or undefined then return default image
	};

	return (
		<TouchableOpacity onPress={onPress} style={{ flexDirection: "row" }}>
			<Image source={getThumbnail(thumbnail?.url)} style={{ width: IMAGE_WIDTH, height: IMAGE_WIDTH / 1.7, borderRadius: 3 }} />
			<View style={{ flex: 1, marginLeft: 5 }}>
				<Text style={{ fontSize: 16, fontWeight: "700", color: "#383838" }}>{title}</Text>
				<Text style={{ fontSize: 14, color: "#827E7E" }}>
					{dateFormat(createdAt, "mediumDate")} - {dateFormat(createdAt, "shortTime")} | {author}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default PostListItem;

const styles = StyleSheet.create({});
