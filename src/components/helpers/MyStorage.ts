import SInfo from 'react-native-sensitive-info';
export default class MyStorage {
    event_list = "event_list";
    setItem(key, value) {
        SInfo.setItem(key, "".concat(value), {});
    }
    getItem(key) {
        return SInfo.getItem(key, {})
    }
    removeItem(key) {
        return SInfo.deleteItem(key, {})
    }
    clearStorage() {
        // return this.rmUserInfo();
    }
    setEvent(events) {
        console.log('events in mys', events)
        return
        this.setItem(this.event_list, events)
    }
    getEvents() {
        return this.getItem(this.event_list)
    }
}