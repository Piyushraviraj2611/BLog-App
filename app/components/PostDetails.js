import { Image, StyleSheet, Text, View, Dimensions, ScrollView, Linking, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import dateFormat from "dateformat";
import Markdown from "react-native-markdown-display";
import { getPost } from "../api/post";
import RelatedPosts from "./RelatedPosts";
import SharePost from "./SharePost";

const { width } = Dimensions.get("window");
const MY_WEBSITE_URL = "hamzii.me";

const PostDetails = ({ route }) => {
	const navigation = useNavigation();

	const post = route.params?.post;

	if (!post) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Text
					style={{
						fontSize: 28,
						fontWeight: "700",
					}}>
					{"Oops! Post Not Found :( "}
				</Text>
				<View style={{ marginTop: 15 }}>
					<Text
						style={{
							fontSize: 18,
							fontWeight: "700",
							color: "#827E7E",
							textDecorationLine: "underline",
						}}
						onPress={() => navigation.goBack()}>
						Go Back{" "}
					</Text>
				</View>
			</View>
		);
	}

	const getThumbnail = (uri) => {
		if (uri) return { uri }; // { uri: uri }

		return require("../../assets/default-blog-thumbnail.jpg"); // if uri is null or undefined then return default image
	};

	// // custom rules for markdown
	// const rules = {
	// paragraph: (node, children, parent, styles) => (
	//     <Text key={node.key} style={styles.paragraph} selectable>
	//         {children}
	//     </Text>
	// ),
	// };

	// if the link leads to a website then open it in the browser else open it in the app
	const handleLinkPress = async (url) => {
		if (url && url.includes(MY_WEBSITE_URL)) {
			const slug = url.split("/").pop(); // get the slug from the url

			if (slug) {
				const { success, message, post, error } = await getPost(slug); // get the post from the slug

				if (!success) {
					Alert.alert("Error", message || error);
					return false;
				} else if (!post) {
					Alert.alert("Error", "The post you are trying to open does not exist.");
					return false;
				}

				navigation.push("PostDetails", { post }); // push the post to the navigation stack, so that the user can go back to the previous screen
			} else {
				Alert.alert("Invalid URL", "The URL you are trying to open is invalid.");
			}

			return false; // return false to prevent the default behavior of the link
		}

		// check if the url is valid using Linking.canOpenURL
		Linking.canOpenURL(url).then((supported) => {
			if (supported) {
				Linking.openURL(url);
			} else {
				Alert.alert("Invalid URL", "The URL you are trying to open is invalid.");
			}
		});
	};

	return (
		<ScrollView>
			<Image source={getThumbnail(post?.thumbnail?.url)} style={{ width, height: width / 1.7 }} />
			<View style={{ padding: 10 }}>
				<Text
					style={{
						fontSize: 20,
						color: "#383838",
						fontWeight: "700",
					}}>
					{post.title}
				</Text>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						paddingVertical: 3,
					}}>
					<Text style={{ color: "#827E7E" }}>By {post.author}</Text>
					<Text style={{ color: "#827E7E" }}>
						{dateFormat(post.createdAt, "mediumDate")} - {dateFormat(post.createdAt, "shortTime")}
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
					}}>
					{post?.tags?.length > 0 && (
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}>
							<Text selectable style={{ color: "#827E7E" }}>
								Tags
							</Text>
							{post.tags.map((tag, index) => (
								<Text
									key={tag + index}
									style={{
										marginLeft: 5,
										color: "blue",
									}}>
									#{tag.trim()}
								</Text>
							))}
						</View>
					)}
				</View>

				<View style={{ marginTop: 10 }}>
					<Markdown
						//   rules={rules}
						onLinkPress={handleLinkPress}
						style={styles}>
						{post.content}
					</Markdown>
				</View>

				<SharePost post={post} />

				<View style={{ marginTop: 10 }}>
					<RelatedPosts postId={post._id} />
				</View>
			</View>
		</ScrollView>
	);
};

export default PostDetails;

const styles = StyleSheet.create({
	paragraph: {
		lineHeight: 22,
		color: "#545050",
		letterSpacing: 0.8,
	},
	body: {
		fontSize: 16,
	},
	link: {
		color: "#7784f8",
	},
	list_item: {
		color: "#545050",
		paddingVertical: 5,
	},
	image: {
		width: width - 20,
		height: width / 1.7,
	},
	// styling the markdown quote
	blockquote: {
		backgroundColor: "#f5f5f5",
		padding: 5,
		borderRadius: 5,
		marginBottom: 10,
		fontStyle: "italic",
		borderLeftWidth: 5,
	},
});
