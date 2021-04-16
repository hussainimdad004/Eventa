import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MAIN_GRAY, PRIMARY_COLOR } from '../../../assets/color';
import { scale, verticalScale } from './Scaling';
import { Icon } from 'react-native-elements';
class PureRow extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const { item, index, title } = this.props;
		return (
			<TouchableOpacity
				activeOpacity={0.9}
				key={index}
				onPress={() => { this.openArticleDetail(item.id, title, item) }}
				style={{
					flexDirection: "row",
					backgroundColor: '#fff',
					marginTop: verticalScale(4),
					marginHorizontal: scale(12),
					borderWidth: 1,
					borderColor: 'transparent',
					borderRadius: 8,
					padding: 8
				}} >
				<View
					style={{
						flex: 1,
						marginLeft: 12
					}}
				>
					<View style={{ flexDirection: 'row' }}>
						<Text
							style={{
								color: PRIMARY_COLOR,
								fontSize: scale(11),
								fontFamily: "BurlingamePro-CondSemiBold",
							}}
						>
							{item.title}
						</Text>
						<Icon
                        color={'#000'}
                        name="trash-o"
                        type="font-awesome"
                        size={20}
                        containerStyle={{
                            position: "absolute",
                            right: 40,
                        }}
                    />
					<Icon
                        color={'#000'}
                        name="pencil"
                        type="font-awesome"
                        size={20}
                        containerStyle={{
                            position: "absolute",
                            right: 10,
                        }}
                    />
					</View>
					<Text
						style={{
							color: MAIN_GRAY,
							fontSize: scale(11),
							marginTop: 8,
							fontFamily: "BurlingamePro-CondBold",
						}}
					>
						{item.time}
					</Text>

					<Text
						style={{
							color: MAIN_GRAY,
							fontSize: scale(10),
							fontFamily: "BurlingamePro-CondBold",
						}}
					>
						{item.description}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}

	openArticleDetail = (index, _title, item) => {
		console.log("****TTTT", index, _title, item)
	}
}

export default PureRow;