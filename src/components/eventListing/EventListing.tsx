import React, { Component, ReactElement } from 'react';
import { View, Text, FlatList, RefreshControl, ListRenderItem, ListRenderItemInfo } from 'react-native';
import { GRAPE_COLOR, ONYX_COLOR, PRIMARY_COLOR } from "../../../assets/color";
import Button from '../helpers/Button';
import CustomBackHeader from '../helpers/CustomHeaderBackButton';
import MyStorage from '../helpers/MyStorage';
import PureRow from '../helpers/PureRow';
import { scale, verticalScale } from '../helpers/Scaling';
import moment from 'moment';

interface State {
    eventsList: any;
}
interface Props {
    navigation: any;
    isFocused: boolean;
}
const eventList = [
    {
        title: 'Iftar Party',
        time: moment().format('LLL'),
        description: 'Iftar party description'
    },
    {
        title: 'Emumba General Interview',
        time: moment().add(20, 'm').format('LLL'),
        description: 'This is the description of Emumba General Interview'
    },
    {
        title: 'Emumba Test',
        time: moment().add(5, 'd').format('LLL'),
        description: 'This is the description of Emumba Test'
    },
    {
        title: 'Emumba Technical Interview',
        time: moment().add(2, 'w').format('LLL'),
        description: 'This is the description of Emumba Technical Interview'
    }
]
class EventListing extends Component {
    state: State;
    props: Props;
    eventList: any[];
    _unsubscribe: any;
    constructor(props) {
        super(props);
        this.state = {
            eventsList: []
        };
    }
    // componentDidMount() {
    //     this._unsubscribe = this.props.navigation.addListener('focus', () => {
    //         let list = await new MyStorage().getEvents().then(result => JSON.parse(result));
    //         console.log('listtttt', list)
    //         this.setState({
    //             eventList: list
    //         })
    //     }
    // }
    // componentWillUnmount() {
    //     this._unsubscribe();
    // }
    _renderRowItem = ({ item, index }) => (
        <PureRow item={item} index={index} nav={this.props.navigation} title="EVENTS" />
    )
    render() {
        const navigate = this.props.navigation
        return (
            <View style={{ flex: 1 }}>
                <CustomBackHeader show_backButton={false} nav={navigate} title={"My Events Listing"} />
                <View style={{
                    flexDirection: "row",
                    marginHorizontal: scale(12),
                    marginTop: verticalScale(10)
                }} >
                    <Button
                        button_label="Event Type Filter"
                        on_press={() => {  }}
                        text_style={{
                            fontFamily: 'BurlingamePro-CondSemiBold',
                            fontSize: scale(13),
                            marginRight: 18,
                        }}
                        show_icon={true}
                        custom_style={{
                            flex: 1,
                            backgroundColor: PRIMARY_COLOR,
                            height: verticalScale(40),
                            padding: scale(16),
                            marginRight: scale(12),
                            borderTopRightRadius: scale(2),
                            borderBottomRightRadius: scale(2),
                        }}
                    />

                    <Button
                        button_label="+ Create Event"
                        on_press={() => {
                            this.props.navigation.navigate('AddEvent')
                        }}
                        text_style={{
                            fontFamily: 'BurlingamePro-CondSemiBold',
                            fontSize: scale(13)
                        }}
                        custom_style={{
                            flex: 1,
                            backgroundColor: GRAPE_COLOR,
                            height: verticalScale(40),
                            padding: scale(16),
                            borderTopRightRadius: scale(2),
                            borderBottomRightRadius: scale(2),
                        }}
                    />
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    disableVirtualization={false}
                    data={eventList}
                    renderItem={this._renderRowItem}
                    contentContainerStyle={{ marginTop: verticalScale(16) }}
                    keyExtractor={item => item.title + ""}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={this.state.refreshing_list}
                //         onRefresh={this.onRefresh}
                //         tintColor="#fff"
                //         titleColor="#fff"
                //     />
                // }
                />
                {/* <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('AddEvent')
            }}>
                <Text>Add Event</Text>
            </TouchableOpacity> */}
            </View>
        );
    }
}
export default EventListing;