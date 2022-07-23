import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withSpring,
	withRepeat,
} from "react-native-reanimated";

const SIZE = 100;

export default function BasicScreen() {
	/**
	 * Shared values are sources of truth for Reanimated.
	 */
	const progress = useSharedValue(1);
	const scale = useSharedValue(2);

	/**
	 * Animated styles should be updated with useAnimateStyle to take advantage
	 * of worklets.
	 */
	const indicatorStyle = useAnimatedStyle(() => ({
		opacity: progress.value,
		borderRadius: (progress.value * SIZE) / 2,
		transform: [
			{ scale: scale.value },
			{ rotate: `${progress.value * 2 * Math.PI}rad` },
		],
	}));

	useEffect(() => {
		progress.value = withRepeat(withTiming(0.5), -1, true);
		scale.value = withRepeat(withSpring(1), 3, true);
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Animated.View style={[styles.indicator, indicatorStyle]} />
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
	indicator: {
		height: SIZE,
		width: SIZE,
		backgroundColor: "blue",
	},
});
