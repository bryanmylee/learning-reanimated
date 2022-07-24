import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
	Extrapolate,
	interpolate,
	SharedValue,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const SIZE = width * 0.7;

interface PageProps {
	index: number;
	scrollX: SharedValue<number>;
}

function Page({ index, scrollX }: PageProps) {
	const squareStyle = useAnimatedStyle(() => ({
		transform: [
			{
				// As scrollX.value goes from [index-1, index, index+1] * width, return
				// the values [0, 1, 0].
				// If the values fall outside the range, clamp to 0.
				scale: interpolate(
					scrollX.value,
					[(index - 1) * width, index * width, (index + 1) * width],
					[0, 1, 0],
					Extrapolate.CLAMP
				),
			},
		],
	}));

	return (
		<View
			style={[
				styles.pageContainer,
				{ backgroundColor: `rgba(0, 0, 256, 0.${index})` },
			]}
		>
			<Animated.View style={[styles.square, squareStyle]} />
		</View>
	);
}

export default function ScrollViewScreen() {
	const scrollX = useSharedValue(0);
	const handleScroll = useAnimatedScrollHandler((event) => {
		scrollX.value = event.contentOffset.x;
	});

	return (
		<View style={styles.container}>
			<Animated.ScrollView
				horizontal
				onScroll={handleScroll}
				scrollEventThrottle={16}
			>
				{[0, 1, 2, 3, 4].map((index) => (
					<Page key={index} index={index} scrollX={scrollX} />
				))}
			</Animated.ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	pageContainer: {
		width,
		justifyContent: "center",
		alignItems: "center",
	},
	square: {
		width: SIZE,
		height: SIZE,
		backgroundColor: "blue",
	},
});
