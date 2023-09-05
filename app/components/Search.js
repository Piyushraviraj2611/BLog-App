import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Constants from "expo-constants";
import { searchPosts } from "../api/post";
import PostListItem from "./PostListItem";
import Separator from "./Separator";

const Search = ({ navigation }) => {
	const [query, setQuery] = useState("");
	const [notFound, setNotFound] = useState(false);
	const [results, setResults] = useState([]);

	const handleSubmit = async () => {
		if (!query.trim()) return;

		const { success, posts, message } = await searchPosts(query);

		if (!success) {
			return Alert.alert("Error", message);
		}

		if (posts.length === 0) {
			setNotFound(true);
			return setResults([]);
		}

		setNotFound(false);
		setResults([...posts]); // using ... to copy the array and not mutate it directly (this is a good practice)
	};

	const handlePostPress = (post) => {
		navigation.navigate("PostDetails", { post });
	};

	return (
		<View style={styles.container}>
			<TextInput
				value={query}
				onChangeText={(text) => setQuery(text)}
				style={styles.searchInput}
				placeholder="Search..."
				onSubmitEditing={handleSubmit}
			/>

			<ScrollView contentContainerStyle={{ flex: 1 }}>
				{results.length > 0 &&
					results.map((post) => (
						<View key={post._id} style={{ marginTop: 10 }}>
							<PostListItem post={post} onPress={() => handlePostPress(post)} />
						</View>
					))}

				{!notFound && <Separator width="100%" style={{ marginTop: 20 }} />}

				{notFound && (
					<Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18, marginTop: 20, color: "rgba(0,0,0,0.4)", marginTop: 30 }}>
						No results found
					</Text>
				)}
			</ScrollView>
		</View>
	);
};

export default Search;

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		padding: 10,
		flex: 1,
		
	},
	searchInput: {
		marginTop: 10,
		borderWidth: 2,
		borderColor: "#383838",
		borderRadius: 5,
		padding: 5,
		fontSize: 16,
	},
});
