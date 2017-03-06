/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
//import Icon from 'react-native-vector-icons/EvilIcons';
import Heading from 'react-native-heading';
import BleManager from 'react-native-ble-manager';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    DrawerLayoutAndroid,
    WebView,
    ScrollView,
    Image,
    NativeModules,
    TouchableHighlight,
    NativeAppEventEmitter,
    DeviceEventEmitter,
    Platform,
    PermissionsAndroid
} from 'react-native';

class Dora extends Component {

    currentAzimuth = 0;
    interval = null;

    constructor() {
        //super();

        this.state = {
            beacon: 1,
            max: -180,
            azimuth: 0,
            floor: 7
        };


        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.checkPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                    console.log("Permission is OK(HB)");
                } else {
                    PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                        if (result) {
                            console.log("User accept");
                        } else {
                            console.log("User refuse");
                        }
                    });
                }
            });
        }
    }

    componentDidMount() {
        BleManager.start({showAlert: true});
        try {
            NativeAppEventEmitter
                .addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral.bind(this));
            this.setState({scanning: true});
            this.scanning = setInterval(()=> this.handleScan(), 3000);

            Heading.start(1)
                .then(didStart => {
                    console.log('Heading:', didStart);
                });

            DeviceEventEmitter.addListener('headingUpdated', data => {
                //console.log('New heading is:', data.heading);
                this.currentAzimuth = data.heading - 120;
            });

            this.interval = setInterval(() => {
                this.setState({
                    azimuth: this.currentAzimuth
                });
            }, 100);

        } catch (e) {
            console.log(e);
        }
    }

    handleScan() {
        try {
            BleManager.scan([], 30, true)
                .then((results) => console.log('Scanning...'));
            this.setState({
                max: -180
            });
        } catch (e) {
            console.log(e);
        }
    }

    toggleScanning(bool) {
        if (bool) {
            this.setState({scanning: true});
            this.scanning = setInterval(()=> this.handleScan(), 3000);
        } else {
            this.setState({scanning: false, ble: null});
            clearInterval(this.scanning);
        }
    }

    handleDiscoverPeripheral(data) {
        try {
            console.log('Got ble data', data);
            console.log(data.name, data.rssi, this.state.beacon, this.state.max);
            var name = parseInt(data.name);
            if (Number.isInteger(name) && data.rssi > this.state.max) {
                this.setState({
                    beacon: name,
                    max: data.rssi,
                    floor: name < 6 ? 7 : 8
                    //r1: Math.pow(10,(((-22-data.rssi)+28-20*Math.log(2400))/2.2))
                });
            }
        } catch (e) {
            console.log(e);
        }

    }

    pathStyle(i) {
        //console.log(i);
        var style = {
            width: 100,
            height: 100,
            backgroundColor: 'rgba(153, 153, 153, 0.39)',
            borderColor: 'black',
            borderWidth: 2
        };

        var path = [13, 11, 0, 2, 3, 4, 5, 6, 7, 8, 9];
        if (path.indexOf(i) > -1)style.backgroundColor = 'orange';

        var zones = {
            1: [0, 1, 2],
            2: [3],
            3: [4, 5],
            4: [6, 7],
            5: [8, 9, 10],
            6: [11, 12, 13]
        };
        if (zones[this.state.beacon].indexOf(i) > -1 && path.indexOf(i) > -1)style.backgroundColor = 'orangered';
        return style
    }

    render() {

        const bleList = this.state.beacon
            ? <Text style={styles.text}> Position: {this.state.beacon} </Text>
            : <Text style={styles.text}>no devices nearby</Text>;

        return (<View>
            <Image source={require('./pointer.png')}
                   style={[styles.pointer, {transform: [{rotateZ: this.state.azimuth + 'deg'}]}]}/>
            <ScrollView><ScrollView contentContainerStyle={styles.container} horizontal={true}>
                {this.state.floor == 7 ? (<View><View style={styles.cell}>
                    <View style={styles.cell_outside}></View>
                    <View style={styles.cell_class_room}><Text style={styles.text}>BE Elex</Text></View>
                    <View style={this.pathStyle(0)}></View>
                    <View style={styles.cell_lab}><Text style={styles.text}>Lab</Text></View>
                    <View style={styles.cell_lab}><Text style={styles.text}>Lab</Text></View>
                    <View style={styles.cell_lab}><Text style={styles.text}>Lab</Text></View>
                    <View style={styles.cell_random}><Text style={styles.text}>Boys' Restroom</Text></View>
                </View>
                    <View style={styles.cell}>
                        <View style={styles.cell_random}><Text style={styles.text}>Lift</Text></View>
                        <View style={this.pathStyle(1)}></View>
                        <View style={this.pathStyle(2)}></View>
                        <View style={this.pathStyle(3)}></View>
                        <View style={this.pathStyle(4)}></View>
                        <View style={this.pathStyle(5)}></View>
                        <View style={styles.cell_random}></View>
                    </View>
                    <View style={styles.cell}>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_class_room}><Text style={styles.text}>BE Computers</Text></View>
                        <View style={this.pathStyle(6)}></View>
                        <View style={styles.cell_class_room}><Text style={styles.text}>TE Computers</Text></View>

                    </View>
                    <View style={styles.cell}>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_lab}></View>
                        <View style={this.pathStyle(7)}></View>
                        <View style={styles.cell_class_room}><Text style={styles.text}>SE Comps</Text></View>

                    </View>
                    <View style={styles.cell}>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_lab}></View>
                        <View style={this.pathStyle(8)}></View>
                        <View style={this.pathStyle(9)}></View>

                    </View>
                    <View style={styles.cell}>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_lab}></View>
                        <View style={this.pathStyle(10)}></View>
                        <View style={styles.cell_class_room}></View>

                    </View>
                </View>) : (
                    <View>
                        <View style={styles.cell}>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_class_room}><Text style={styles.text}>BE IT</Text></View>
                            <View style={this.pathStyle(11)}></View>
                            <View style={styles.cell_lab}><Text style={styles.text}>Lab</Text></View>
                            <View style={styles.cell_lab}><Text style={styles.text}>Lab</Text></View>
                            <View style={styles.cell_lab}><Text style={styles.text}>Lab</Text></View>
                            <View style={styles.cell_random}><Text style={styles.text}>Girls' Restroom</Text></View>
                        </View>
                        <View style={styles.cell}>
                            <View style={styles.cell_random}><Text style={styles.text}>Lift</Text></View>
                            <View style={this.pathStyle(12)}></View>
                            <View style={this.pathStyle(13)}></View>
                            <View style={this.pathStyle(14)}></View>
                            <View style={this.pathStyle(15)}></View>
                            <View style={this.pathStyle(16)}></View>
                            <View style={styles.cell_random}></View>
                        </View>
                        <View style={styles.cell}>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_lab}><Text style={styles.text}>Lab</Text></View>
                            <View style={this.pathStyle(17)}></View>
                            <View style={styles.cell_class_room}><Text style={styles.text}>TE IT</Text></View>

                        </View>
                        <View style={styles.cell}>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_lab}></View>
                            <View style={this.pathStyle(18)}></View>
                            <View style={styles.cell_class_room}><Text style={styles.text}>SE IT</Text></View>

                        </View>
                        <View style={styles.cell}>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_lab}></View>
                            <View style={this.pathStyle(19)}></View>
                            <View style={this.pathStyle(20)}></View>

                        </View>
                        <View style={styles.cell}>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_lab}></View>
                            <View style={this.pathStyle(21)}></View>
                            <View style={styles.cell_class_room}></View>

                        </View>
                    </View>)}

            </ScrollView></ScrollView>
        </View>)

    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        height: 600,
        width: 700
    },
    pointer: {
        flex: 1,
        width: 50,
        height: 50,
        resizeMode: 'contain',
        zIndex: 2,
        position: 'absolute',
        top: 5,
        right: 5
    },
    text: {
        width: 75,
        color: 'white',
        textAlign: 'center'
    },
    cell_class_room: {
        width: 100,
        height: 100,
        backgroundColor: '#2aa22a',
        borderColor: 'black',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cell_random: {
        width: 100,
        height: 100,
        backgroundColor: 'cornflowerblue',
        borderColor: 'black',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cell: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
        width: 10000,
        height: 100
    },
    cell_outside: {
        width: 100,
        height: 100,
        backgroundColor: 'white'
    },
    cell_lab: {
        width: 100,
        height: 100,
        backgroundColor: '#00b386',
        borderColor: 'black',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cell_path: {
        width: 100,
        height: 100,
        backgroundColor: 'rgba(153, 153, 153, 0.39)',
        borderColor: 'black',
        borderWidth: 2
    }
});

AppRegistry.registerComponent('Dora', () => Dora);
//react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/