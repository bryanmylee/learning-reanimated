import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BasicScreen from "./BasicScreen";

export type RootDrawerParamList = {
	Basic: undefined;
};

const RootDrawer = createDrawerNavigator<RootDrawerParamList>();

export default function App() {
	return (
		<NavigationContainer>
			<RootDrawer.Navigator initialRouteName="Basic">
				<RootDrawer.Screen name="Basic" component={BasicScreen} />
			</RootDrawer.Navigator>
		</NavigationContainer>
	);
}
