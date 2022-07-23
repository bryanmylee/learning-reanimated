import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

const SIZE = 100;

type TContext = {
	startX: number;
	startY: number;
};

export default function PanGestureScreen() {
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const handlePanGesture = useAnimatedGestureHandler<
		PanGestureHandlerGestureEvent,
		TContext
	>({
		onStart: (_, context) => {
			context.startX = translateX.value;
			context.startY = translateY.value;
		},
		onActive: (event, context) => {
			translateX.value = event.translationX + context.startX;
			translateY.value = event.translationY + context.startY;
		},
		onEnd: () => {
			translateX.value = withSpring(0);
			translateY.value = withSpring(0);
		},
	});

	const squareStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateX: translateX.value },
			{ translateY: translateY.value },
		],
	}));

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<PanGestureHandler onGestureEvent={handlePanGesture}>
				<Animated.View style={[styles.square, squareStyle]} />
			</PanGestureHandler>
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
	square: {
		width: SIZE,
		height: SIZE,
		backgroundColor: "blue",
		borderRadius: 20,
	},
});
