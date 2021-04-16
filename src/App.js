import 'react-native-gesture-handler';
import React from 'react';
import MyRouter from './MyRouter';
import SplashScreen from 'react-native-splash-screen';
import reducers from './redux/reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import 'react-native-gesture-handler';
export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        SplashScreen.hide();
    }
    render() {
        console.disableYellowBox = true
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
        return (
            <Provider store={store} >
                <MyRouter />
            </Provider>
        );
    }
}