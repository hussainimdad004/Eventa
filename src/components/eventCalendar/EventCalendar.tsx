import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { GRAPE_COLOR, LIGHT_GRAY, MAIN_GRAY, ONYX_COLOR, PRIMARY_COLOR } from "../../../assets/color";
import { Calendar } from 'react-native-calendars';
import CustomBackHeader from '../helpers/CustomHeaderBackButton';
import { scale, verticalScale } from '../helpers/Scaling';
import moment from 'moment';
import Button from '../helpers/Button';
import { ScrollView } from 'react-native-gesture-handler';
import PureRow from '../helpers/PureRow';
interface State {
    eventsList: number[];
    available_slots: string[]
}
interface Props {
    navigation: any;
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
]
class EventCalendar extends Component {
    state: State;
    props: Props;
    constructor(props) {
        super(props);
        this.state = {
            eventsList: [],
            available_slots: ['8:30 AM', '9:30 PM', '8:30 AM', '9:30 PM']
        };
    }
    onDayPress = (value) => {

        // if (this.state.no_slots_available) {
        //     return
        // }
        // if (this.state.date_dictionary[value.dateString]) {
        //     this.markedDates(this.state.date_dictionary, value.dateString);
        //     this.setState({
        //         availableSlots: [],
        //         slot_error: false
        //     }, () => {
        //         this.setState({
        //             availableSlots: this.state.date_dictionary[value.dateString],
        //             selected_slot: value.dateString,
        //             complete_selected_slot: value
        //         })
        //     })
        // }
    }
    _renderRowItem = ({ item, index }) => (
        <PureRow item={item} index={index} nav={this.props.navigation} title="EVENTS" />
    )
    createSlot = (time) => {
        return (
            <TouchableOpacity
                key={time}
                onPress={() => {
                    this.setState({ selected_time: time, slot_error: false })
                }}
                style={{
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderRadius: 14,
                    marginVertical: verticalScale(4),
                    borderColor: LIGHT_GRAY,
                    paddingVertical: verticalScale(8),
                    marginHorizontal: scale(12)
                }}>
                <Text style={{
                    fontFamily: 'BurlingamePro-Medium',
                    fontSize: scale(12)
                }}>{time}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        const navigate = this.props.navigation
        return (<View style={{ flex: 1 }}>
            <CustomBackHeader show_backButton={false} nav={navigate} title={"My Events Calendar"} />
            <View style={{
                flexDirection: "row",
                marginHorizontal: scale(12),
                marginVertical: verticalScale(10)
            }} >
                <Button
                    button_label="+ Create Event"
                    on_press={() => { this.props.navigation.navigate('AddEvent') }}
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
            <ScrollView>
                <Calendar
                    style={{
                        marginBottom: verticalScale(4),
                        marginHorizontal: scale(12),
                        borderRadius: scale(4),
                    }}
                    minDate={moment().format('YYYY-MM-DD')}
                    theme={{
                        arrowStyle: {
                            backgroundColor: MAIN_GRAY,
                            padding: scale(10),
                            borderWidth: 1,
                            borderColor: 'transparent',
                            borderRadius: 2
                        },
                        arrowColor: LIGHT_GRAY,
                        monthTextColor: '#000',
                        textMonthFontWeight: 'bold',
                        textMonthFontSize: 20,
                    }}
                    onMonthChange={(month) => {
                        this.setState({
                            availableSlots: []
                        })
                        // this.getSlots(month.month, month.year)
                    }}
                    onDayPress={this.onDayPress}
                    hideExtraDays
                    markingType={'custom'}
                    markedDates={{
                        '2021-04-16': {
                            customStyles: {
                                container: {
                                    backgroundColor: PRIMARY_COLOR,
                                },
                                text: {
                                    color: '#fff',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        '2021-04-18': {
                            customStyles: {
                                container: {
                                    backgroundColor: 'white',
                                    borderWidth: 1,
                                    borderColor: PRIMARY_COLOR,
                                    elevation: 2
                                },
                                text: {
                                    color: PRIMARY_COLOR,
                                    fontWeight: 'bold'
                                }
                            }
                        }
                    }}
                />
                {/* <FlatList
                    showsVerticalScrollIndicator={false}
                    disableVirtualization={false}
                    data={eventList}
                    renderItem={this._renderRowItem}
                    contentContainerStyle={{ marginTop: verticalScale(16) }}
                    keyExtractor={item => item.title + ""}
                /> */}
                {/* {
                    this.state.available_slots.length > 0
                    &&
                    <View style={{ flex: 1, marginTop: verticalScale(4), }}>
                        <Text style={{
                            color: '#000',
                            fontSize: scale(12),
                            fontFamily: "BurlingamePro-SemiBold",
                            borderColor: PRIMARY_COLOR,
                            marginHorizontal: scale(12)
                        }}>
                            Available slots
                        </Text>
                        {this.state.available_slots.map((item, index) => {
                            if (item) {
                                return this.createSlot(item)
                            }
                        })}
                    </View>
                } */}
            </ScrollView>
        </View>
        );
    }
}
export default EventCalendar;