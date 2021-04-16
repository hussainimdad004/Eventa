import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from 'react-native-elements';
import EventListing from "./components/eventListing/EventListing";
import EventCalendar from "./components/eventCalendar/EventCalendar";
import { PRIMARY_COLOR, ONYX_COLOR } from "../assets/color";

const Tab = createBottomTabNavigator();

const tabOptions = {
    showLabel: false,
    style: {
        height: 70,
        backgroundColor: '#fff',

    },
};
const Tabs = () => {

    return (
        <Tab.Navigator
            tabBarOptions={tabOptions}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    switch (route.name) {
                        case "EventListing":
                            return (
                                <Text
                                    style={{
                                        color: focused ? PRIMARY_COLOR : ONYX_COLOR,
                                        fontSize: 16,
                                        fontFamily: "BurlingamePro-CondBold",
                                    }}
                                >List View</Text>
                            );
                       
                    }
                }
            })}
        >
            <Tab.Screen
                name="EventListing"
                component={EventListing}
            />
            <Tab.Screen
                name="EventCalendar"
                component={EventCalendar}
            />
        </Tab.Navigator>
    );
};

export default Tabs;