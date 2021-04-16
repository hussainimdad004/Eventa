import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from './Tabs';
import AddEvent from './components/pages/AddEvent';
const Stack = createStackNavigator();
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    },
};
const tabOptions = {
    showLabel: false,
    style: {
        height: 70,
        backgroundColor: '#fff',

    },
};
const MyTransition = {
    cardStyleInterpolator: ({ current, layouts }) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },
                ],
            },
        };
    },
};
export default function MyRouter() {
    return (
        <NavigationContainer theme={theme}>
            {
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen options={{ ...MyTransition }} name="EventsList" component={Tabs} />
                    <Stack.Screen options={{ ...MyTransition }} name="EventsCalendar" component={Tabs} />
                    <Stack.Screen options={{ ...MyTransition }} name="AddEvent" component={AddEvent} />
                </Stack.Navigator>
            }
        </NavigationContainer>
    );
}