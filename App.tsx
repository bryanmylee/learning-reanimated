import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BasicScreen from "./BasicScreen";
import PanGestureScreen from "./PanGestureScreen";
import ScrollViewScreen from "./ScrollViewScreen";
import ColorsScreen from "./ColorsScreen";

export type RootDrawerParamList = {
	Basic: undefined;
	PanGesture: undefined;
	ScrollView: undefined;
	Colors: undefined;
};

const RootDrawer = createDrawerNavigator<RootDrawerParamList>();

export default function App() {
	return (
		<NavigationContainer>
			<RootDrawer.Navigator initialRouteName="Basic">
				<RootDrawer.Screen name="Basic" component={BasicScreen} />
				<RootDrawer.Screen name="PanGesture" component={PanGestureScreen} />
				<RootDrawer.Screen name="ScrollView" component={ScrollViewScreen} />
				<RootDrawer.Screen name="Colors" component={ColorsScreen} />
			</RootDrawer.Navigator>
		</NavigationContainer>
	);
}
