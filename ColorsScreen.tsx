import { useCallback, useState } from "react";
import { StyleSheet, Switch } from "react-native";
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useDerivedValue,
	withTiming,
} from "react-native-reanimated";

const COLORS = {
	dark: {
		background: "#1e1e1e",
		circle: "#252525",
		text: "#f8f8f8",
	},
	light: {
		background: "#f8f8f8",
		circle: "#ffffff",
		text: "#1e1e1e",
	},
};

const SWITCH_TRACK_COLOR = {
	true: "rgba(256, 0, 256, 0.2)",
	false: "rgba(0, 0, 0, 0.1)",
};

type TTheme = "light" | "dark";

export default function ColorsScreen() {
	const [theme, setTheme] = useState<TTheme>("light");
	const handleValueChange = useCallback((toggled: boolean) => {
		setTheme(toggled ? "dark" : "light");
	}, []);

	// Returns a shared value that's derived from regular state.
	const progress = useDerivedValue(() => {
		return theme === "dark" ? withTiming(1) : withTiming(0);
	}, [theme]);

	const containerStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			progress.value,
			[0, 1],
			[COLORS.light.background, COLORS.dark.background]
		),
	}));

	return (
		<Animated.View style={[styles.container, containerStyle]}>
			<Switch
				value={theme === "dark"}
				onValueChange={handleValueChange}
				trackColor={SWITCH_TRACK_COLOR}
				thumbColor="violet"
			/>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
