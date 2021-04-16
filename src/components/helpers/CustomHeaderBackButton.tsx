import React from 'react';
import {
    View,
    Text,
    Platform,
    Dimensions
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import CreateBackButton from './BackButton';
import { scale, verticalScale } from './Scaling';
const DEVICES = [
    'iPhone X',
    'iPhone XS',
    'iPhone XS Max',
    'iPhone XR'
]

const DEVICE_HEIGHTS = {
    "iPhone X": 812,
    "iPhone XS": 812,
    "iPhone XS Max": 896,
    "iPhone XR": 896,
}

const CustomBackHeader = (props) => {
    const { nav, nav_to, show_backButton, booking_type, screen_title, is_cross } = props;
    const { height, width } = Dimensions.get("window");
    const device_name = DeviceInfo.getModel();
    let is_zoomed = false;
    if (DEVICES.includes(device_name)) {
        if (DEVICE_HEIGHTS[device_name] > height) {
            is_zoomed = true;
        }
    }
    return (
        <View
            style={{
                height: Platform.OS == "ios" ? (is_zoomed ? verticalScale(93.75) : verticalScale(63.75)) : verticalScale(55.75),
                backgroundColor: "#fff",
                flexDirection: "row",
                justifyContent: show_backButton ? "space-between" : "center",
                alignItems: "flex-end",
                paddingBottom: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 0.2 },
                shadowOpacity: is_zoomed ? null : 0.3,
                elevation: 12,
                position: 'relative',
                borderBottomWidth: 0.4,
                borderBottomColor: "rgba(0,0,0,0.3)"
            }}
        >
            {
                show_backButton
                &&
                <CreateBackButton navigate={nav} nav_to={nav_to} booking_type={booking_type} screen_title={screen_title} is_cross={is_cross} />
            }

            <Text
                style={{
                    fontFamily: "BurlingamePro-CondBold",
                    fontSize: scale(16),
                    color: "#666666",
                }}
            >
                {props.title}
            </Text>

            {
                show_backButton
                &&
                <View style={{ width: 36, height: 36 }} />
            }
        </View>
    )
};

export default CustomBackHeader;
