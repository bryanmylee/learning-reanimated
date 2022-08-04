import { useEffect } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import {
	GestureHandlerRootView,
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { clampWorklet } from "./clamp";

export default function BottomSheetScreen() {
	return (
		<GestureHandlerRootView style={styles.rootView}>
			<View style={[styles.container]}>
				<BottomSheet />
			</View>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	rootView: {
		flex: 1,
	},
	container: {
		flex: 1,
		backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
	},
});

type TPanContext = {
	initialY: number;
};

function BottomSheet() {
	const { height } = useWindowDimensions();

	const translateY = useSharedValue(0);
	useEffect(function showBottomSheetOnLoad() {
		translateY.value = withSpring(-height / 3);
	}, []);

	const handlePanGesture = useAnimatedGestureHandler<
		PanGestureHandlerGestureEvent,
		TPanContext
	>({
		onStart(_, context) {
			context.initialY = translateY.value;
		},
		onActive(event, context) {
			translateY.value = clampWorklet(
				context.initialY + event.translationY,
				-height,
				-height / 3
			);
		},
		onEnd(event) {
			const targetY =
				translateY.value + event.velocityY < (-height * 2) / 3
					? -height
					: -height / 3;
			translateY.value = withSpring(targetY, {
				damping: 20,
				velocity: event.velocityY,
				overshootClamping: true,
			});
		},
	});

	const containerAnim = useAnimatedStyle(
		() => ({
			borderRadius: interpolate(
				translateY.value,
				[-height, -height / 3],
				[0, 25],
				Extrapolate.CLAMP
			),
			transform: [{ translateY: translateY.value }],
		}),
		[]
	);

	return (
		<PanGestureHandler onGestureEvent={handlePanGesture}>
			<Animated.View
				style={[
					bottomSheetStyles.container,
					{ height, top: height },
					containerAnim,
				]}
			>
				<View style={bottomSheetStyles.handle} />
			</Animated.View>
		</PanGestureHandler>
	);
}

const bottomSheetStyles = StyleSheet.create({
	container: {
		width: "100%",
		backgroundColor: "white",
		position: "absolute",
	},
	handle: {
		width: 75,
		height: 4,
		backgroundColor: "grey",
		alignSelf: "center",
		marginVertical: 15,
		borderRadius: 2,
	},
});
