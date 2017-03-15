/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
//import SearchBar from 'react-native-searchbar';
import Heading from 'react-native-heading';
import BleManager from 'react-native-ble-manager';
import SearchBar from 'react-native-material-design-searchbar';


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
        super();

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
            width: 50,
            height: 50,
            backgroundColor: 'rgba(153, 153, 153, 0.39)',
            borderColor: 'black',
            borderWidth: 0
        };

        var path = [0, 2, 3, 4, 5, 6, 7, 8, 9];
        if (path.indexOf(i) > -1)style.backgroundColor = '#ffca28';

        var zones = {
            1: ['0', 1, 2],
            2: [3],
            3: [4, 5],
            4: [6, 7],
            5: [8, 9, 10],
            6: [11, 12, 13]
        };
        if (zones[this.state.beacon].indexOf(i) > -1 && path.indexOf(i) > -1)style.backgroundColor = '#ff8f00';
        return style
    }

    handleSearchResults(results) {
        console.log(results);
    }

    render() {
        var items = [
            1337,
            'janeway',
            {
                lots: 'of',
                different: {
                    types: 0,
                    data: false,
                    that: {
                        can: {
                            be: {
                                quite: {
                                    complex: {
                                        hidden: ['gold!']
                                    }
                                }
                            }
                        }
                    }
                }
            }
                [4, 2, 'tree'],
        ];

        const bleList = this.state.beacon
            ? <Text style={styles.text}> Position: {this.state.beacon} </Text>
            : <Text style={styles.text}>no devices nearby</Text>;

        return (<View>
            <SearchBar
                onSearchChange={() => console.log('On Focus')}
                height={50}
                onFocus={() => console.log('On Focus')}
                onBlur={() => console.log('On Blur')}
                placeholder={'Search...'}
                autoCorrect={false}
                padding={5}
                returnKeyType={'search'}
            />
            <Image source={require('./pointer.png')}
                style={[styles.pointer, {transform: [{rotateZ: this.state.azimuth + 'deg'}]}]}/>
            <ScrollView>
                <ScrollView contentContainerStyle={styles.container} horizontal={true}>
                {this.state.floor == 7 ? (<View>
                    <View style={styles.cell}>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_class_room}>
                            <Text style={styles.text}>BE Elex</Text>
                        </View>
                        <View style={this.pathStyle('p7_0')}></View>
                        <View style={styles.cell_lab}>
                            <Text style={styles.text}>Adv Comm Lab</Text>
                        </View>
                        <View style={styles.cell_lab}>
                            <Text style={styles.text}>Project Lab</Text>
                        </View>
                        <View style={styles.cell_lab}>
                            <Text style={styles.text}>IEDC Lab</Text>
                        </View>
                        <View style={styles.cell_loo}></View>
                    </View>
                    <View style={styles.cell}>
                        <View style={styles.cell_lift}>
                            <Text style={styles.text}>Lift</Text>
                        </View>
                        <View style={this.pathStyle('p7_1')}></View>
                        <View style={this.pathStyle('p7_2')}></View>
                        <View style={this.pathStyle('p7_3')}></View>
                        <View style={this.pathStyle('p7_4')}></View>
                        <View style={this.pathStyle('p7_5')}></View>
                        <View style={styles.cell_loo}>
                            <Text style={styles.text}>Boys' Loo</Text>
                        </View>
                    </View>
                    <View style={styles.cell}>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_class_room}>
                            <Text style={styles.text}>BE Comps</Text>
                        </View>
                        <View style={this.pathStyle('p7_6')}></View>
                        <View style={styles.cell_class_room}>
                            <Text style={styles.text}>TE Comps</Text>
                        </View>

                    </View>
                    <View style={styles.cell}>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_lab}>
                            <Text style={styles.text}>Mac Lab</Text>
                        </View>
                        <View style={this.pathStyle('p7_7')}></View>
                        <View style={styles.cell_class_room}>
                            <Text style={styles.text}>SE Comps</Text>
                        </View>

                    </View>
                    <View style={styles.cell}>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_lab}>
                            <Text style={styles.text}>CC8</Text>
                        </View>
                        <View style={this.pathStyle('p7_8')}></View>
                        <View style={this.pathStyle('p7_9')}>
                            <Text style={styles.text}>Stairs</Text>
                        </View>

                    </View>
                    <View style={styles.cell}>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_lab}>
                            <Text style={styles.text}>CC7</Text>
                        </View>
                        <View style={this.pathStyle('p7_10')}></View>
                        <View style={styles.cell_class_room}>
                            <Text style={styles.text}>Staff Room</Text>
                        </View>

                    </View>
                    <View style={styles.cell}>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_lab}>
                            <Text style={styles.text}>CC8</Text>
                        </View>
                        <View style={this.pathStyle('p7_11')}></View>
                        <View style={styles.cell_lift}>
                            <Text style={styles.text}>Lift</Text>
                        </View>

                    </View>
                    <View style={styles.cell}>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_lab}></View>
                        <View style={this.pathStyle('p7_12')}></View>
                        <View style={styles.cell_random}>
                            <Text style={styles.cell_loo}>Loo</Text>
                        </View>
                        <View style={styles.cell_loo}></View>
                        <View style={styles.cell_lift}></View>
                        <View style={styles.cell_lift}><Text style={styles.text}>Lift</Text></View>

                    </View>

                    <View style={styles.cell}>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_path}></View>
                        <View style={this.pathStyle('p7_13')}></View>
                        <View style={this.pathStyle('p7_14')}></View>
                        <View style={this.pathStyle('p7_15')}></View>
                        <View style={this.pathStyle('p7_16')}></View>
                        <View style={this.pathStyle('p7_17')}></View>

                    </View>

                    <View style={styles.cell}>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={this.pathStyle('p7_18')}></View>
                        <View style={styles.cell_loo}><Text style={styles.text}>Staff Loo</Text></View>


                    </View>
                    <View style={styles.cell}>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={this.pathStyle('p7_19')}></View>
                        <View style={styles.cell_loo}><Text style={styles.text}></Text></View>
                        <View style={this.pathStyle('p7_23')}><Text style={styles.text}>Stairs</Text></View>

                    </View>
                    <View style={styles.cell}>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={styles.cell_outside}></View>
                        <View style={this.pathStyle('p7_20')}></View>
                        <View style={this.pathStyle('p7_21')}></View>
                        <View style={this.pathStyle('p7_22')}></View>


                    </View>



                </View>) : (
                    <View>
                        <View style={styles.cell}>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_class_room}>
                                <Text style={styles.text}>BE IT</Text>
                            </View>
                            <View style={this.pathStyle('p8_0')}></View>
                            <View style={styles.cell_lab}>
                                <Text style={styles.text}> Lab 1</Text>
                            </View>
                            <View style={styles.cell_lab}>
                                <Text style={styles.text}>Lab 2</Text>
                            </View>
                            <View style={styles.cell_lab}>
                                <Text style={styles.text}>Lab 3</Text>
                            </View>
                            <View style={styles.cell_loo}></View>
                        </View>
                        <View style={styles.cell}>
                            <View style={styles.cell_lift}>
                                <Text style={styles.text}>Lift</Text>
                            </View>
                            <View style={this.pathStyle('p8_1')}></View>
                            <View style={this.pathStyle('p8_2')}></View>
                            <View style={this.pathStyle('p8_3')}></View>
                            <View style={this.pathStyle('p8_4')}></View>
                            <View style={this.pathStyle('p8_5')}></View>
                            <View style={styles.cell_loo}>
                                <Text style={styles.text}>Girls' Loo</Text>
                            </View>
                        </View>
                        <View style={styles.cell}>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_lab}>
                                <Text style={styles.text}>Lab 4</Text>
                            </View>
                            <View style={this.pathStyle('p8_6')}></View>
                            <View style={styles.cell_class_room}>
                                <Text style={styles.text}>TE IT</Text>
                            </View>

                        </View>
                        <View style={styles.cell}>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_lab}>
                                <Text style={styles.text}>Lab 5</Text>
                            </View>
                            <View style={this.pathStyle('p8_7')}></View>
                            <View style={styles.cell_class_room}>
                                <Text style={styles.text}>SE IT</Text>
                            </View>

                        </View>
                        <View style={styles.cell}>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_lab}>
                                <Text style={styles.text}>Lab 6</Text>
                            </View>
                            <View style={this.pathStyle('p8_8')}></View>
                            <View style={this.pathStyle('p8_9')}>
                                <Text style={styles.text}>Stairs</Text>
                            </View>

                        </View>
                        <View style={styles.cell}>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_lab}>
                                <Text style={styles.text}>Lab 7</Text>
                            </View>
                            <View style={this.pathStyle('p8_10')}></View>
                            <View style={styles.cell_class_room}>
                                <Text style={styles.text}>Staff Room</Text>
                            </View>

                        </View>
                        <View style={styles.cell}>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_lab}>
                                <Text style={styles.text}>Lab 8</Text>
                            </View>
                            <View style={this.pathStyle('p8_11')}></View>
                            <View style={styles.cell_lift}>
                                <Text style={styles.text}>Lift</Text>
                            </View>

                        </View>
                        <View style={styles.cell}>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_lab}></View>
                            <View style={this.pathStyle('p8_12')}></View>
                            <View style={styles.cell_random}>
                                <Text style={styles.cell_loo}>Loo</Text>
                            </View>
                            <View style={styles.cell_loo}></View>
                            <View style={styles.cell_lift}></View>
                            <View style={styles.cell_lift}><Text style={styles.text}>Lift</Text></View>

                        </View>

                        <View style={styles.cell}>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_path}></View>
                            <View style={this.pathStyle('p8_13')}></View>
                            <View style={this.pathStyle('p8_14')}></View>
                            <View style={this.pathStyle('p8_15')}></View>
                            <View style={this.pathStyle('p8_16')}></View>
                            <View style={this.pathStyle('p8_17')}></View>


                        </View>

                        <View style={styles.cell}>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={this.pathStyle()}></View>
                            <View style={styles.cell_loo}><Text style={styles.text}>Staff Loo</Text></View>


                        </View>
                        <View style={styles.cell}>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={this.pathStyle('p8_18')}></View>
                            <View style={styles.cell_loo}><Text style={styles.text}></Text></View>
                            <View style={this.pathStyle('p8_23')}><Text style={styles.text}>Stairs</Text></View>

                        </View>
                        <View style={styles.cell}>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={styles.cell_outside}></View>
                            <View style={this.pathStyle('p8_20')}></View>
                            <View style={this.pathStyle('p8_21')}></View>
                            <View style={this.pathStyle('p8_22')}></View>


                        </View>


                    </View>)}

                </ScrollView>
            </ScrollView>
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
        width: 50,
        color: 'white',
        textAlign: 'center'
    },
    cell_class_room: {
        width: 50,
        height: 50,
        backgroundColor: '#4db6ac',
        borderColor: 'black',
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cell_lift: {
        width: 50,
        height: 50,
        backgroundColor: '#00695c',
        borderColor: 'black',
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cell_loo: {
        width: 50,
        height: 50,
        backgroundColor: '#7cb342',
        borderColor: 'black',
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cell_random: {
        width: 50,
        height: 50,
        backgroundColor: '#00cccc',
        borderColor: 'black',
        borderWidth: 0,
        justifyContent: 'center'
    },
    cell: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
        width: 10000,
        height: 50
    },
    cell_outside: {
        width: 50,
        height: 50,
        backgroundColor: 'white'
    },
    cell_lab: {
        width: 50,
        height: 50,
        backgroundColor: '#00897b',
        borderColor: 'black',
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cell_path: {
        width: 50,
        height: 50,
        backgroundColor: '#ff9933',
        borderColor: 'black',
        borderWidth: 0,
        justifyContent: 'center'

    }
});

AppRegistry.registerComponent('Dora', () => Dora);
//react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/