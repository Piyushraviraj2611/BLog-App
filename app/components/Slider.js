import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

const width = Dimensions.get("window").width - 20; // get the width of the device and subtract 20 to have a margin of 10 on each side
let currentSlideIndex = 0; // to store the current slide index
let sliderInterval; // to store the interval

export default function Slider({ data, title, onSlidePress }) {
	const [dataToRender, setDataToRender] = useState([]);
	const [visibleSlideIndex, setVisibleSlideIndex] = useState(0);
	const [activeSlideIndex, setActiveSlideIndex] = useState(1);

	const flatListRef = useRef();
	const onViewableItemsChanged = useRef(({ viewableItems }) => {
		currentSlideIndex = viewableItems[0]?.index || 0;
		setVisibleSlideIndex(currentSlideIndex);
	});
	const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }); // 50% of the slide should be visible to change the slide

	const handleScrollTo = (index) => {
		flatListRef?.current?.scrollToIndex({ index, animated: false }); // scroll to the index without animation
	};

	const startSlider = () => {
		// start the interval
		if (currentSlideIndex <= dataToRender.length - 2) {
			sliderInterval = setInterval(() => {
				flatListRef?.current?.scrollToIndex({ index: currentSlideIndex + 1, animated: true }); // scroll to the next index with animation
			}, 4000);
		} else {
			pauseSlider();
		}
	};

	const pauseSlider = () => {
		clearInterval(sliderInterval);
	};

	useEffect(() => {
		const newData = [[...data].pop(), ...data, [...data].shift()]; // [4, 1, 2, 3, 4, 1]
		setDataToRender([...newData]);
	}, [data.length]);

	useEffect(() => {
		if (dataToRender.length && flatListRef?.current) {
			startSlider();
		}

		return () => {
			pauseSlider();
		}; // clear the interval when the component unmounts
	}, [dataToRender.length]);

	useEffect(() => {
		let length = dataToRender.length;

		// reset slide to first
		if (length && visibleSlideIndex === length - 1) handleScrollTo(1);

		// reset slide to last
		if (length && visibleSlideIndex === 0) handleScrollTo(length - 2);

		// set active slide index to the visible slide index
		setActiveSlideIndex(length && currentSlideIndex === 0 ? length - 3 : currentSlideIndex === length - 1 ? 0 : currentSlideIndex - 1); // -3 because we added 2 extra slides at the beginning and end
	}, [visibleSlideIndex]);

	const renderItem = ({ item }) => (
		<TouchableWithoutFeedback onPress={() => onSlidePress(item)}>
			<View>
				<Image source={{ uri: item?.thumbnail?.url }} style={styles.slideImage} />
				<View style={{ width }}>
					<Text numberOfLines={2} style={{ color: "#383838", fontSize: 20, fontWeight: "700", marginTop: 10 }}>
						{item.title}
					</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);

	const randomNumber = () => Math.random() * 1000;

	return (
		<View style={styles.container}>
			<View style={styles.sliderHead}>
				<Text style={styles.title}>{title}</Text>

				<View style={styles.sliderIndicatorContainer}>
					<SlideIndicators data={data} activeSlideIndex={activeSlideIndex} />
				</View>
			</View>
			<FlatList
				ref={flatListRef}
				data={dataToRender}
				keyExtractor={(item, index) => randomNumber() + item._id + index}
				renderItem={renderItem}
				horizontal
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				onScrollBeginDrag={pauseSlider}
				onScrollEndDrag={startSlider}
				initialScrollIndex={1}
				getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
				onViewableItemsChanged={onViewableItemsChanged.current}
				viewabilityConfig={viewabilityConfig.current}
			/>
		</View>
	);
}

const randomNumber = () => Math.random() * 1000;

const SlideIndicators = ({ data, activeSlideIndex }) =>
	data?.map((item, index) => (
		<View
			key={item._id + randomNumber()}
			style={[
				styles.slides,
				{
					backgroundColor: activeSlideIndex === index ? "#383838" : "transparent",
				},
			]}
		/>
	));

const styles = StyleSheet.create({
	container: {
		alignSelf: "center",
		width,
	},
	sliderHead: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 5,
	},
	title: {
		color: "#383838",
		fontSize: 20,
		fontWeight: "700",
	},
	sliderIndicatorContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	slides: {
		width: 12,
		height: 12,
		borderRadius: 6,
		borderWidth: 2,
		marginLeft: 5,
	},
	slideImage: {
		width,
		height: width / 1.7,
		borderRadius: 7,
	},
});
