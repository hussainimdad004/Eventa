import React, { Component } from 'react';
import { View, Text, Platform, TouchableOpacity, TextInput } from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';

import { GRAPE_COLOR, LIGHT_GRAY, MAIN_GRAY, ONYX_COLOR, PRIMARY_COLOR } from "../../../assets/color";
import CustomBackHeader from '../helpers/CustomHeaderBackButton';
import ErrorText from '../helpers/ErrorText';
import { scale, verticalScale } from '../helpers/Scaling';
import GradientButton from '../helpers/gradientButton';
import { formatToTimeStamp } from '../helpers/format-numbers';
import Button from '../helpers/Button';
import MyStorage from '../helpers/MyStorage';
interface State {
    eventsList: number[];
    name: string;
    show_given_name_label: boolean;
    description: string;
    show_description_label: boolean;
    is_date_modal_visible: boolean;
    is_start_time_modal_visible: boolean;
    is_end_time_modal_visible: boolean;
    date_picker_value: any;
    event_date: any;
    start_time: any;
    end_time: any;
    start_time_picker_value: any;
    end_time_picked_value: any;
    name_error: string;
    show_name_error: boolean;
    description_error: string;
    show_description_error: boolean;
    show_date_label: boolean;
    show_start_time_label: boolean;
    show_end_time_label: boolean;
    show_create_error: boolean;
    create_error: string;
    show_loading: boolean;
}
interface Props {
    navigation: any;
}
class AddEvent extends Component {
    state: State;
    props: Props;

    constructor(props) {
        super(props);
        this.state = {
            eventsList: [],
            name: '',
            show_given_name_label: false,
            description: '',
            show_description_label: false,
            is_date_modal_visible: false,
            date_picker_value: Platform.OS == 'android' ? moment() : new Date(),
            is_start_time_modal_visible: false,
            is_end_time_modal_visible: false,
            event_date: Platform.OS == 'android' ? moment() : new Date(),
            start_time_picker_value: Platform.OS == 'android' ? moment() : new Date(),
            end_time_picked_value: Platform.OS == 'android' ? moment() : new Date(),
            start_time: Platform.OS == 'android' ? moment() : new Date(),
            end_time: Platform.OS == 'android' ? moment() : new Date(),
            name_error: '',
            show_name_error: false,
            description_error: '',
            show_description_error: false,
            show_date_label: false,
            show_start_time_label: false,
            show_end_time_label: false,
            show_create_error: false,
            create_error: '',
            show_loading: false
        };
    }
    showDatePicker = () => {
        console.log('coming here')
        this.setState({
            is_date_modal_visible: true
        })
    }
    showStartTimePicker = () => {
        this.setState({
            is_start_time_modal_visible: true
        })
    }
    showEndTimePicker = () => {
        this.setState({
            is_end_time_modal_visible: true
        })
    }
    createInputField = (
        id: number,
        is_mandatory: boolean,
        multiline: boolean,
        ref: string,
        value: any,
        show_label: boolean,
        input_placeholder_label: string,
        input_error: string,
        is_error_visible: boolean,
        keyboard_type: any,
        input_handler: any,
        editable: boolean
    ) => {
        console.log('editable editable', editable)
        return (
            <View style={{
                marginBottom: 0,
                paddingTop: 16,
                marginRight: id == 3 ? scale(8) : 0,
                width: (id == 3 || id == 4) ? '50%' : '100%',
            }} >

                {
                    show_label &&
                    <Text
                        style={{
                            fontSize: scale(11),
                            alignSelf: "flex-start",
                            paddingLeft: scale(8),
                            marginBottom: verticalScale(4),
                            fontFamily: "BurlingamePro-CondSemiBold",
                            color: ONYX_COLOR,
                            elevation: 8,
                        }}
                    >
                        {is_mandatory ? `${input_placeholder_label}*` : input_placeholder_label}
                    </Text>
                }
                <View style={{
                    flexDirection: 'row',
                    paddingLeft: scale(8),
                    paddingRight: scale(8),
                    paddingBottom: Platform.OS == 'ios' ? verticalScale(10) : 0,
                    paddingTop: Platform.OS == 'ios' ? verticalScale(10) : 0,
                    width: "100%",
                    borderColor: LIGHT_GRAY,
                    borderBottomWidth: 1,
                    alignItems: "center"
                }}>
                    <TextInput
                        onTouchStart={() => editable == false ? id == 3 ? this.showStartTimePicker() : id == 4 ? this.showEndTimePicker() : this.showDatePicker() : ""}
                        editable={true}
                        keyboardType={keyboard_type}
                        returnKeyType={Platform.OS == "ios" ? "done" : 'none'}
                        underlineColorAndroid='transparent'
                        autoCapitalize="none"
                        multiline={multiline}
                        autoCorrect={false}
                        placeholder={is_mandatory ? `${input_placeholder_label}*` : input_placeholder_label}
                        placeholderTextColor="#bbb"
                        value={value}
                        onChangeText={(text) => input_handler(text)}
                        style={{
                            flex: 1,
                            color: "#848484",
                            fontSize: scale(12),
                            fontFamily: "BurlingamePro-CondSemiBold"
                        }}
                        ref={ref}
                    />
                </View>
                {
                    is_error_visible &&
                    <ErrorText error_text={input_error} />
                }
            </View>
        );
    }
    handleGivenName = (text) => {
        this.setState({ name: text }, () => {
            if (this.state.name.length > 0) {
                this.setState({ show_given_name_label: true, show_name_error: false, });
            } else {
                this.setState({ show_given_name_label: false, });
            }
        });
    }
    handleDescription = (text) => {
        this.setState({ description: text }, () => {
            if (this.state.description.length > 0) {
                this.setState({ show_description_label: true, show_description_error: false, });
            } else {
                this.setState({ show_description_label: false, });
            }
        });
    }
    setStartTime = async (time) => {
        console.log('start', time, formatToTimeStamp(time))
        // let startTimeStamp = formatToTimeStamp(time);
        this.setState({
            start_time: time
        })
    }
    setEndTime = async (time) => {
        console.log('start setEndTime', time, formatToTimeStamp(time))
        // let endTimeStamp = formatToTimeStamp(time);
        this.setState({
            end_time: time
        })
    }
    setEventDate = (date) => {
        console.log('date***', date, moment(date).format('LL'))
        this.setState({
            event_date: date
        })
    }
    showTimePickerModal = () => {
        let text_info1 = ''
        if (this.state.is_start_time_modal_visible) {
            text_info1 = "Pick Start Time"
        } else if (this.state.is_end_time_modal_visible) {
            text_info1 = "Pick End Time"
        } else {
            text_info1 = "Pick Event Date";
        }
        let currentDate = new Date();
        return (
            <Modal
                style={{
                    justifyContent: "flex-end",
                    margin: 0,
                    marginHorizontal: scale(16)
                }}
                useNativeDriver={true}
                backdropTransitionOutTiming={0}
                animationInTiming={500}
                animationOutTiming={500}
                isVisible={this.state.is_date_modal_visible || this.state.is_start_time_modal_visible || this.state.is_end_time_modal_visible}
                onBackdropPress={() => {
                    this.setState({
                        is_date_modal_visible: false,
                        is_time_modal_visible: false
                    })
                }}
            >
                <View
                    style={{
                        maxHeight: '95%',
                        justifyContent: "center",
                        backgroundColor: '#fff',
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: 'transparent',
                        borderTopLeftRadius: scale(24),
                        borderTopRightRadius: scale(24),
                        paddingTop: verticalScale(4)
                    }}
                >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            paddingHorizontal: scale(18)
                        }}>
                            <Text
                                style={{
                                    marginTop: verticalScale(12),
                                    marginBottom: verticalScale(8),
                                    fontSize: scale(14),
                                    color: PRIMARY_COLOR,
                                    fontFamily: "BurlingamePro-CondBold",
                                    alignSelf: "center",
                                    paddingHorizontal: scale(2),
                                    textAlign: "center",
                                }}
                            >
                                {text_info1.toUpperCase()}
                            </Text>
                            {
                                <DatePicker
                                    date={
                                        this.state.is_start_time_modal_visible ?
                                            this.state.start_time_picker_value :
                                            this.state.is_end_time_modal_visible ?
                                                this.state.end_time_picked_value :
                                                this.state.date_picker_value
                                    }
                                    mode={(this.state.is_start_time_modal_visible || this.state.is_end_time_modal_visible) ? 'time' : 'date'}
                                    minimumDate={currentDate}
                                    onDateChange={(time) => {
                                        console.log('timeeeeeeeeeee', time)
                                        if (time) {
                                            this.state.is_start_time_modal_visible ?
                                                this.setState({ start_time_picker_value: time }) :
                                                this.state.is_end_time_modal_visible ?
                                                    this.setState({ end_time_picked_value: time }) :
                                                    this.setState({ date_picker_value: time })
                                        }
                                    }}
                                />

                            }

                        </View>
                    </View>
                    <View style={{
                        flexDirection: "column",
                        marginTop: verticalScale(12),
                    }} >
                        <GradientButton
                            button_label={'CONFIRM'}
                            on_press={() => {
                                console.log('this.state.is_start_time_modal_visible', this.state.is_start_time_modal_visible)
                                if (this.state.is_start_time_modal_visible) {
                                    if (this.state.start_time_picker_value) {
                                        this.setStartTime(
                                            moment(this.state.start_time_picker_value).format('LT'),
                                        )
                                    } else {
                                        this.setStartTime(moment().format('LT'))
                                    }
                                } else if (this.state.is_end_time_modal_visible) {
                                    if (this.state.end_time_picked_value) {
                                        this.setEndTime(
                                            moment(this.state.end_time_picked_value).format('LT'),
                                        )
                                    } else {
                                        this.setEndTime(moment().format('LT'))
                                    }
                                } else {
                                    if (this.state.date_picker_value) {
                                        this.setEventDate(
                                            moment(this.state.date_picker_value).format('LL'),
                                        )
                                    } else {
                                        this.setEventDate(moment().format('LL'))
                                    }
                                }
                                this.setState({
                                    is_date_modal_visible: false,
                                    is_start_time_modal_visible: false,
                                    is_end_time_modal_visible: false
                                })
                                console.log('date picker', this.state.date_picker_value)
                                // if (this.state.date_picker_value && this.state.end_time_picked_value) {
                                //     this.setAvailabilityTime(
                                //         moment(this.state.date_picker_value).format('LT'),
                                //         moment(this.state.end_time_picked_value).format('LT')
                                //     );
                                // } else {
                                //     this.setAvailabilityTime(
                                //         moment().format('LT'), moment().format('LT')
                                //     );
                                // }
                            }}
                            text_style={{
                                fontFamily: 'BurlingamePro-SemiBold',
                                color: '#fff',
                                paddingHorizontal: scale(60),
                                fontSize: scale(16)
                            }}
                            custom_style={{
                                backgroundColor: 'transparent',
                                height: verticalScale(37.5),
                                borderRadius: scale(24)
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            marginTop: verticalScale(8),
                            marginBottom: verticalScale(16),
                            height: verticalScale(37.5),
                            borderRadius: scale(24),
                            borderWidth: 1,
                            borderColor: 'transparent',
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "center",

                            backgroundColor: LIGHT_GRAY
                        }}
                        onPress={() => {
                            this.setState({
                                is_date_modal_visible: false,
                                is_start_time_modal_visible: false,
                                is_end_time_modal_visible: false
                            })
                        }}
                    >
                        <Text
                            style={{
                                paddingHorizontal: scale(80),
                                color: PRIMARY_COLOR,
                                fontSize: scale(12),
                                fontFamily: "BurlingamePro-SemiBold",
                            }}
                        >
                            CANCEL
                    </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );

    }
    saveEvent = async () => {
        this.setState({
            show_loading: true
        })
        if (this.state.name.trim() == '') {
            this.setState({
                show_name_error: true,
                show_loading: false,
                name_error: 'Please enter name'
            })
            return
        } else if (this.state.description.trim() == '') {
            this.setState({
                description_error: 'please enter description',
                show_description_error: true,
                show_loading: false,
            })
            return
        } else if (!this.state.event_date) {
            this.setState({
                create_error: 'event date & time is not valid',
                show_create_error: true,
                show_loading: false,
            })
            return
        } else if (!this.state.start_time) {
            this.setState({
                create_error: 'event date & time is not valid',
                show_create_error: true,
                show_loading: false,
            })
            return
        } else if (!this.state.end_time) {
            this.setState({
                create_error: 'event date & time is not valid',
                show_create_error: true,
                show_loading: false,
            })
            return
        }
        let oldEvents = []
        const { name, description, event_date, start_time, end_time } = this.state;
        let check = await new MyStorage().getEvents().then(result => {
            return JSON.parse(result)
        });
        if (check) {
            oldEvents = check
        }
        console.log('check', oldEvents)
        let newData = {
            title: name,
            description: description,
            date: event_date,
            start_time: start_time,
            end_time: end_time
        }
        oldEvents.push(newData);
        await new MyStorage().setEvent(JSON.stringify(oldEvents));
        console.log('oldEvents', oldEvents)
        setTimeout(() => {
            this.setState({
                show_loading: false
            })
            this.props.navigation.goBack();
        }, 200);
        // if (this.state.name && this.state.description &&
        //     this.state.event_date && this.state.start_time &&
        //     this.state.end_time
        // ) {

        // } else {
        //     return
        // }
    }
    render() {
        const navigate = this.props.navigation
        return (
            <View style={{ flex: 1 }}>
                <CustomBackHeader show_backButton={true} nav={navigate} title={"Create Event"} />
                <View style={{
                    flex: 1,
                    marginHorizontal: scale(12),
                    backgroundColor: '#fff',
                    marginTop: verticalScale(30),
                    paddingHorizontal: scale(8),
                    borderWidth: 1,
                    borderColor: 'transparent',
                    borderRadius: 8
                }}>
                    {
                        this.createInputField(
                            0,
                            true,
                            false,
                            "name",
                            this.state.name,
                            this.state.show_given_name_label,
                            "Name",
                            this.state.name_error,
                            this.state.show_name_error,
                            "default",
                            this.handleGivenName,
                            true
                        )
                    }
                    {
                        this.createInputField(
                            1,
                            true,
                            true,
                            "description",
                            this.state.description,
                            this.state.show_description_label,
                            "Description",
                            this.state.description_error,
                            this.state.show_description_error,
                            "default",
                            this.handleDescription,
                            true
                        )
                    }
                    {
                        this.createInputField(
                            2,
                            true,
                            true,
                            "date_picker",
                            this.state.event_date,
                            this.state.show_date_label,
                            "Event Date",
                            "",
                            false,
                            "default",
                            null,
                            false
                        )
                    }
                    <View style={{ flexDirection: 'row', }}>
                        {
                            this.createInputField(
                                3,
                                true,
                                true,
                                "time_picker",
                                this.state.start_time,
                                this.state.show_start_time_label,
                                "Start Times",
                                "",
                                false,
                                "default",
                                this.handleDescription,
                                false
                            )
                        }
                        {
                            this.createInputField(
                                4,
                                true,
                                true,
                                "time_picker",
                                this.state.end_time,
                                this.state.show_end_time_label,
                                "End Times",
                                "",
                                false,
                                "default",
                                this.handleDescription,
                                false
                            )
                        }
                    </View>
                    {
                        this.state.show_create_error &&
                        <ErrorText error_text={this.state.create_error} />
                    }
                </View>
                <View style={{
                    marginBottom: '20%',
                    marginTop: '10%',
                    marginHorizontal: scale(20)
                }}>
                    <Button
                        button_label="Create Event"
                        on_press={() => this.saveEvent()}
                        show_spinner={this.state.show_loading}
                        text_style={{
                            fontFamily: 'BurlingamePro-CondSemiBold',
                            fontSize: scale(13)
                        }}
                        custom_style={{
                            backgroundColor: GRAPE_COLOR,
                            height: verticalScale(40),
                            padding: scale(16),
                            borderTopRightRadius: scale(2),
                            borderBottomRightRadius: scale(2),
                        }}
                    />
                </View>
                {this.showTimePickerModal()}
            </View>
        );
    }
}
export default AddEvent;