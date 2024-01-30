import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ImageBackground, Text, View ,size} from "react-native";
import Constants from "expo-constants";
import { MaterialIcons } from '@expo/vector-icons';
import { getFeaturedPosts, getLatestPosts } from "../api/post";
import PostListItem from "./PostListItem";
import Separator from "./Separator";
import Slider from "./Slider";

const postsLimit = 5;
let pageNo = 1;

export default function Home({ navigation }) {
	const [featuredPosts, setFeaturedPosts] = useState([]);
	const [latestPosts, setLatestPosts] = useState([]);
	const [reachedEnd, setReachedEnd] = useState(false);
	const [loading, setLoading] = useState(false);

	const RefreshControl= async() => {
		useEffect(() => {
			const unsubscribe = navigation.addListener("focus", () => {
				fetchLatestPosts() // Gets fired whenever this screen is in focus
			});
		  
		  }, [navigation]);
	};
	

	const fetchFeaturedPosts = async () => {
		const { success, message, featuredPosts } = await getFeaturedPosts();
		if (success) {
			console.log("Hiii");
			setFeaturedPosts(featuredPosts);
		} else {
			console.log("mess "+ message);
		}
	};

	const fetchLatestPosts = async () => {
		const { success, posts, message } = await getLatestPosts(postsLimit, pageNo);
		if (success) {
			setLatestPosts(posts);
		} else {
			console.log(message);
		}
	};

	const fetchMorePosts = async () => {
		if (reachedEnd || loading) return;

		pageNo += 1;

		setLoading(true);
		const { success, posts, postsCount, message } = await getLatestPosts(postsLimit, pageNo);
		setLoading(false);

		if (!success) return console.log(message);

		if (postsCount === latestPosts.length) return setReachedEnd(true);

		setLatestPosts([...latestPosts, ...posts]);
	};

	useEffect(() => {
		fetchFeaturedPosts();
		fetchLatestPosts();

		return () => {
			// this function will be called when the component unmounts or if network connection is lost // useNetInfo hook can be used to detect network connection
			pageNo = 1;
			setReachedEnd(false);
			setLoading(false);
		};
	}, []);
	const [buttonColor, setButtonColor] = useState('black');
  const [clicked, setClicked] = useState(false);

  const handleButtonClick = () => {
    setButtonColor('grey');
    setClicked(true);
  };

  useEffect(() => {
    if (clicked) {
      const timer = setTimeout(() => {
        setButtonColor('black');
        setClicked(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
        setClicked(false); // Reset the clicked state after cleanup
      };
    }
  }, [clicked]);

	const ListHeaderComponent = useCallback(() => {
		// useCallback is used to prevent re-rendering of the component
		return (
			<View style={{ paddingTop: Constants.statusBarHeight }}>
				{featuredPosts.length ? <Slider onSlidePress={handlePostPress} title="Featured Posts" data={featuredPosts} /> : null}
				<View style={{ marginTop: 15}}>
					<Separator />
					
					<Text style={{ fontSize: 20, color: "#383838", fontWeight: "700", marginTop: 15 }}>Latest Posts</Text>
					<View style={{marginTop: 15,position: 'absolute', right: 0}}>
					{featuredPosts.length ? <MaterialIcons name="refresh" size={34} color={buttonColor} 

					onPress={() => {
					handleButtonClick();
                     fetchLatestPosts();
					 fetchFeaturedPosts();
                    console.log('You tapped the button!');
               }} />: null}
					</View>
					
 				</View>
			</View>
		);
	}, [featuredPosts]);

	const ItemSeparatorComponent = () => <Separator width="90%" style={{ marginTop: 15 }} />;

	const handlePostPress = (post) => {
		navigation.navigate("PostDetails", { post });
	};

	const renderItem = ({ item }) => {
		return (
			<View style={{ marginTop: 15 }}>
				<PostListItem onPress={() => handlePostPress(item)} post={item} />
			</View>
		);
	};

	const ListFooterComponent = () => {
		if (reachedEnd) {
			return (
				<View style={{ alignItems: "center", marginTop: 15 }}>
					<Text style={{ color: "#383838" }}>No more posts</Text>
				</View>
			);
		}
		return (
			<View style={{ alignItems: "center", marginTop: 15 }}>
				<ActivityIndicator size="small" color="#383838" />
			</View>
		);
	};

	return (
		<ImageBackground source={require('../../assets/bg.jpg')} style={{ width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		
		}}  imageStyle= 
		{{opacity:0.4}}>
 
		<FlatList
			data={latestPosts}
			keyExtractor={(item) => item._id}
			ListHeaderComponent={ListHeaderComponent}
			ItemSeparatorComponent={ItemSeparatorComponent}
			contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
			renderItem={renderItem}
			onEndReached={fetchMorePosts}
			onEndReachedThreshold={0}
			ListFooterComponent={ListFooterComponent}
		/>
		</ImageBackground>
	);
}
