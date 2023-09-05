import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PostListItem from "./PostListItem";
import { getRelatedPosts } from "../api/post";
import Separator from "./Separator";
import { useNavigation } from "@react-navigation/native";

const RelatedPosts = ({ postId }) => {
	const [relatedPosts, setRelatedPosts] = useState([]);

	const navigation = useNavigation();

	const fetchRelatedPosts = async (postId) => {
		const { success, message, relatedPosts } = await getRelatedPosts(postId);

		if (!success) {
			return console.log(message);
		}

		setRelatedPosts([...relatedPosts]);
	};

	useEffect(() => {
		fetchRelatedPosts(postId);
	}, [postId]);

	return (
		<View>
			<Text style={{ fontWeight: "700", fontSize: 22, marginBottom: 10 }}>Related Posts</Text>
			<Separator width="100%" />
			<View style={{ marginTop: 10 }}>
				{relatedPosts?.length ? (
					relatedPosts.map((post) => (
						<View key={post._id} style={styles.relatedPostView}>
							<PostListItem post={post} onPress={() => navigation.push("PostDetails", { post })} />
						</View>
					))
				) : (
					<Text style={{ color: "#827E7E" }}>No related posts found</Text>
				)}
			</View>
		</View>
	);
};

export default RelatedPosts;

const styles = StyleSheet.create({
	relatedPostView: {
		marginBottom: 10,
	},
});
