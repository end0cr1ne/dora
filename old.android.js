/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import BleManager from 'react-native-ble-manager';
import 'map.css'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    DrawerLayoutAndroid,
    WebView,
    ListView,
    TouchableHighlight,
    NativeAppEventEmitter,
    Platform,
    PermissionsAndroid
} from 'react-native';

class Dora extends Component {
    // render() {
    //     var navigationView = (
    //         <View style={{flex: 1, backgroundColor: '#fff'}}>
    //             <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
    //         </View>
    //     );
    //     return (
    //         <DrawerLayoutAndroid
    //             ref={'drawer'}
    //             drawerWidth={300}
    //             drawerPosition={DrawerLayoutAndroid.positions.Left}
    //             renderNavigationView={() => navigationView}>
    //             <Icon.ToolbarAndroid
    //                 navIconName="navicon"
    //                 onIconClicked={()=>this.refs.drawer.openDrawer()}
    //                 title="Dora"
    //                 actions={[{title: 'Settings', iconName: 'gear', show: 'always'}]}
    //                 onActionSelected={this.onActionSelected}
    //                 style={styles.toolbar}
    //             />
    //             <WebView
    //                 ref={'webview'}
    //                 automaticallyAdjustContentInsets={false}
    //                 style={styles.webView}
    //                 source={require('./7.1.html')}
    //                 javaScriptEnabledAndroid={true}
    //                 domStorageEnabledAndroid={true}
    //                 onNavigationStateChange={this.onNavigationStateChange}
    //                 onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
    //                 startInLoadingState={true}
    //                 scalesPageToFit={false}
    //             />
    //             {/*<ListView*/}
    //             {/*dataSource={this.state.dataSource}*/}
    //             {/*renderRow={this.renderRow.bind(this)}>*/}
    //             {/*</ListView>*/}
    //         </DrawerLayoutAndroid>
    //     );
    // }

    constructor() {
        super();

        this.state = {
            beacon: 0,
            max: -180
        };


        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.checkPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                    console.log("Permission is OK");
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
        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
        setInterval(this.setState({
            max: -180
        }), 12000);

        NativeAppEventEmitter
            .addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
        // this.setState({scanning: true});
        // this.scanning = setInterval(()=> this.handleScan(), 3000);
    }

    handleScan() {
        BleManager.scan([], 30, true)
            .then((results) => console.log('Scanning...'));
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
        //console.log('Got ble data', data);
        console.log(data.name, data.rssi, this.state.beacon, this.state.max);
        if (data.name == "1" && data.rssi > this.state.max) {
            this.setState({
                beacon: 1,
                max: data.rssi
                //r1: Math.pow(10,(((-22-data.rssi)+28-20*Math.log(2400))/2.2))
            });
        } else if (data.name == "2" && data.rssi > this.state.max) {
            this.setState({
                beacon: 2,
                max: data.rssi
                //r2: Math.pow(10,(((-16-data.rssi)+28-20*Math.log(2400))/2.2))
            });
        }
        if (data.name == "3" && data.rssi > this.state.max) {
            this.setState({
                beacon: 3,
                max: data.rssi
                //r3: Math.pow(10,(((-22-data.rssi)+28-20*Math.log(2400))/2.2))
            });
        }
        // var p4=this.trilaterate();
        // if(p4)
        //     this.setState({ble:p4.x+','+p4.y+','+p4.z});
    }

    trilaterate() {
        // based on: https://en.wikipedia.org/wiki/Trilateration

        // some additional local functions declared here for
        // scalar and vector operations
        var return_middle = true;
        var p1 = {
            x: this.state.p1.x,
            y: this.state.p1.y,
            z: this.state.p1.z,
            r: this.state.r1
        };
        var p2 = {
            x: this.state.p2.x,
            y: this.state.p2.y,
            z: this.state.p2.z,
            r: this.state.r2
        };
        var p3 = {
            x: this.state.p3.x,
            y: this.state.p3.y,
            z: this.state.p3.z,
            r: this.state.r3
        };

        console.log(p1, p2, p3);
        function sqr(a) {
            return a * a;
        }

        function norm(a) {
            return Math.sqrt(sqr(a.x) + sqr(a.y) + sqr(a.z));
        }

        function dot(a, b) {
            return a.x * b.x + a.y * b.y + a.z * b.z;
        }

        function vector_subtract(a, b) {
            return {
                x: a.x - b.x,
                y: a.y - b.y,
                z: a.z - b.z
            };
        }

        function vector_add(a, b) {
            return {
                x: a.x + b.x,
                y: a.y + b.y,
                z: a.z + b.z
            };
        }

        function vector_divide(a, b) {
            return {
                x: a.x / b,
                y: a.y / b,
                z: a.z / b
            };
        }

        function vector_multiply(a, b) {
            return {
                x: a.x * b,
                y: a.y * b,
                z: a.z * b
            };
        }

        function vector_cross(a, b) {
            return {
                x: a.y * b.z - a.z * b.y,
                y: a.z * b.x - a.x * b.z,
                z: a.x * b.y - a.y * b.x
            };
        }

        var ex, ey, ez, i, j, d, a, x, y, z, b, p4;

        ex = vector_divide(vector_subtract(p2, p1), norm(vector_subtract(p2, p1)));

        i = dot(ex, vector_subtract(p3, p1));
        a = vector_subtract(vector_subtract(p3, p1), vector_multiply(ex, i));
        ey = vector_divide(a, norm(a));
        ez = vector_cross(ex, ey);
        d = norm(vector_subtract(p2, p1));
        j = dot(ey, vector_subtract(p3, p1));

        x = (sqr(p1.r) - sqr(p2.r) + sqr(d)) / (2 * d);
        y = (sqr(p1.r) - sqr(p3.r) + sqr(i) + sqr(j)) / (2 * j) - (i / j) * x;

        b = sqr(p1.r) - sqr(x) - sqr(y);

        // floating point math flaw in IEEE 754 standard
        // see https://github.com/gheja/trilateration.js/issues/2
        if (Math.abs(b) < 0.0000000001) {
            b = 0;
        }

        z = Math.sqrt(b);

        // no solution found
        if (isNaN(z)) {
            return null;
        }

        a = vector_add(p1, vector_add(vector_multiply(ex, x), vector_multiply(ey, y)));
        p4a = vector_add(a, vector_multiply(ez, z));
        p4b = vector_subtract(a, vector_multiply(ez, z));

        if (z == 0 || return_middle) {
            return a;
        }
        else {
            return [p4a, p4b];
        }
    }

    render() {

        const container = {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
        }

        const bleList = this.state.beacon
            ? <Text> Position: {this.state.beacon} </Text>
            : <Text>no devices nearby</Text>

        return("lol denise");

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    toolbar: {
        backgroundColor: '#ddd',
        height: 56,
        elevation: 3
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    WebView: {
        overflow: 'visible'
    },
    cell_class_room: {
        display: 'inline-block',
        width: '100px',
        height: '100px',
        //'margin-left': '-4px',
        'vertical-align': 'top'
    }
});

AppRegistry.registerComponent('Dora', () => Dora);
/*
 * <Svg height="1000" width="1000">
 <Circle
 cx="50"
 cy="50"
 r="45"
 stroke="blue"
 strokeWidth="2.5"
 fill="green"
 />
 <Rect
 x="15"
 y="15"
 width="700"
 height="700"
 stroke="red"
 strokeWidth="2"
 fill="yellow"
 />
 </Svg>
 * */

/*
 * <svg width="3072" height="3675" viewBox="0 0 3072 3675" version="2">
 <g transform="matrix(3 0 0 3 618 1092)" >
 <mask id="a">
 <path d="M-206-364H818V861H-206V-364z" fill="#FFF"/>
 </mask>
 <g style="mix-blend-mode:normal" mask="url(#a)" >
 <use  transform="translate(170.5 -56)" fill="#56CCF2" style="mix-blend-mode:normal" />
 <use  transform="matrix(.0043 -1 1 0 -34.5 -218)" style="mix-blend-mode:normal" />
 <use  transform="rotate(180 -17.25 -182)" style="mix-blend-mode:normal" />
 <use  transform="translate(170.5 246)" fill="#56CCF2" style="mix-blend-mode:normal" />
 <use  transform="translate(-150.5 31)" fill="#4CAFA9" style="mix-blend-mode:normal" />
 <use  transform="translate(170.5 95)" fill="#4CAFA9" style="mix-blend-mode:normal" />
 <use  transform="translate(-150.5 400)" fill="#4CAF50" style="mix-blend-mode:normal" />
 <use  transform="translate(-149.5 249)" fill="#4CAF50" style="mix-blend-mode:normal" />
 <use  transform="rotate(180 20.25 275.5)" style="mix-blend-mode:normal" />
 <use  transform="rotate(180 433.75 353.5)" style="mix-blend-mode:normal" />
 <use  transform="rotate(-102 126.87 -4.965)" style="mix-blend-mode:normal" />
 <g style="mix-blend-mode:normal" >
 <use  transform="translate(777.5 594)" fill="#DADADA" style="mix-blend-mode:normal" />
 <use  transform="translate(777.5 644.26)" fill="#DADADA" style="mix-blend-mode:normal" />
 </g>
 <use  transform="translate(-132.5 639)" fill="#FFF" style="mix-blend-mode:normal" />
 <use  transform="translate(-206 707)" fill="#26A69A" style="mix-blend-mode:normal" />
 <use  transform="rotate(90 -315.25 235.75)" style="mix-blend-mode:normal" />
 <use  transform="rotate(90 -356.75 277.25)" style="mix-blend-mode:normal" />
 <use  transform="rotate(90 -244.75 462.25)" style="mix-blend-mode:normal" />
 <use  transform="translate(170.5 400)" fill="#4CAF50" style="mix-blend-mode:normal" />
 <use  transform="translate(170.5 400)" fill="#4CAF50" style="mix-blend-mode:normal" />
 <use  transform="translate(605.5 707)" fill="#EB5757" style="mix-blend-mode:normal" />
 <g style="mix-blend-mode:normal" >
 <use  transform="rotate(-90 67.25 146.75)" fill-opacity=".5" style="mix-blend-mode:normal" />
 <use  transform="rotate(-90 61.25 152.75)" fill-opacity=".6" style="mix-blend-mode:normal" />
 <use  transform="rotate(-90 55.25 158.75)" fill-opacity=".7" style="mix-blend-mode:normal" />
 <use  transform="rotate(-90 49.25 164.75)" fill-opacity=".8" style="mix-blend-mode:normal" />
 <use  transform="matrix(.01723 -.99985 1 0 -127.5 214)" fill-opacity=".9" style="mix-blend-mode:normal" />
 <use  transform="matrix(.03445 -.9994 1 0 -139.5 214)" style="mix-blend-mode:normal" />
 </g>
 <g style="mix-blend-mode:normal" >
 <use  transform="rotate(-90 83.25 162.75)" style="mix-blend-mode:normal" />
 <use  transform="matrix(.01723 -.99985 1 0 -127.5 246)" fill-opacity=".6" style="mix-blend-mode:normal" />
 <use  transform="matrix(.03445 -.9994 1 0 -139.5 246)" fill-opacity=".5" style="mix-blend-mode:normal" />
 <use  transform="rotate(-90 65.25 180.75)" fill-opacity=".7" style="mix-blend-mode:normal" />
 <use  transform="rotate(-90 71.25 174.75)" fill-opacity=".8" style="mix-blend-mode:normal" />
 <use  transform="rotate(-90 77.25 168.75)" fill-opacity=".9" style="mix-blend-mode:normal" />
 </g>
 <g style="mix-blend-mode:normal" >
 <use  transform="matrix(-1 0 0 -1 605.485 808.5)" style="mix-blend-mode:normal" />
 <use  transform="matrix(-1 0 -.02553 -.99967 605.49 859.075)" fill-opacity=".6" style="mix-blend-mode:normal" />
 <use  transform="matrix(-1 0 0 -1 605.485 846.65)" fill-opacity=".7" style="mix-blend-mode:normal" />
 <use  transform="matrix(-1 0 0 -1 605.485 833.934)" fill-opacity=".8" style="mix-blend-mode:normal" />
 <use  transform="matrix(-1 0 0 -1 605.485 821.217)" fill-opacity=".9" style="mix-blend-mode:normal" />
 </g>
 <g style="mix-blend-mode:normal" >
 <use  transform="matrix(-1 0 0 -1 555.485 808.5)" style="mix-blend-mode:normal" />
 <use  transform="matrix(-1 0 0 -1 555.485 853.128)" fill-opacity=".7" style="mix-blend-mode:normal" />
 <use  transform="matrix(-1 0 0 -1 555.485 838.252)" fill-opacity=".8" style="mix-blend-mode:normal" />
 <use  transform="matrix(-1 0 0 -1 555.485 823.376)" fill-opacity=".9" style="mix-blend-mode:normal" />
 </g>
 <use  transform="matrix(-.0007 1 1 .0007 605.5 752)" style="mix-blend-mode:normal" />
 <use  transform="matrix(-.0031 1 1 .0031 370.5 707)" style="mix-blend-mode:normal" />
 <use  transform="rotate(90 -357.25 349.75)" style="mix-blend-mode:normal" />
 <use  transform="rotate(90 194.25 -23.75)" style="mix-blend-mode:normal" />
 <use  transform="rotate(42 368.127 112.24)" style="mix-blend-mode:normal" />
 <use  transform="matrix(-1 .0043 0 -1 170.5 -218)" style="mix-blend-mode:normal" />
 <use  transform="translate(-54.5 -147)" fill="#DADADA" style="mix-blend-mode:normal" />
 <use  transform="translate(-165.735 -276)" fill="#DADADA" style="mix-blend-mode:normal" />
 <use  transform="translate(349.5 551)" style="mix-blend-mode:normal" />
 <g style="mix-blend-mode:normal" >
 <use  transform="translate(-68.5 -61.898)" fill="#DADADA" style="mix-blend-mode:normal" />
 <use  transform="translate(-68.5 -11.64)" fill="#DADADA" style="mix-blend-mode:normal" />
 </g>
 <g style="mix-blend-mode:normal" >
 <use  transform="rotate(-91 -152.4 44.598)" fill="#DADADA" style="mix-blend-mode:normal" />
 <use  transform="rotate(-91 -133.38 25.332)" fill="#DADADA" style="mix-blend-mode:normal" />
 </g>
 </g>
 </g>
 <defs>
 <path id="b" d="M0 0h179v151H0V0z"/>
 <path id="c" d="M.5-1H0v1h.5v-1zm145 1h.5v-1h-.5v1zM.5 0h145v-1H.5v1z"/>
 <path id="d" d="M.5-1H0v1h.5v-1zm114 1h.5v-1h-.5v1zM.5 0h114v-1H.5v1z"/>
 <path id="e" d="M0 0h190v151H0V0z"/>
 <path id="f" d="M.5-1H0v1h.5v-1zm190 1h.5v-1h-.5v1zM.5 0h190v-1H.5v1z"/>
 <path id="g" d="M.5-1H0v1h.5v-1zm173 1h.5v-1h-.5v1zM.5 0h173v-1H.5v1z"/>
 <path id="h" d="M.5-1H0v1h.5v-1zm18.416 1h.5v-1h-.5v1zM.5 0h18.416v-1H.5v1z"/>
 <path id="i" d="M0 0h34v39.74H0V0z"/>
 <path id="j" d="M12.533 14.818V36.21H8.28V14.82H.315v-3.814h20.198v3.814h-7.98z"/>
 <path id="k" d="M0 0h712v145H0V0z"/>
 <path id="l" d="M.5-1H0v1h.5v-1zm92 1h.5v-1h-.5v1zM.5 0h92v-1H.5v1z"/>
 <path id="m" d="M.5-1H0v1h.5v-1zm72 1h.5v-1h-.5v1zM.5 0h72v-1H.5v1z"/>
 <path id="n" d="M.5-1H0v1h.5v-1zm139 1h.5v-1h-.5v1zM.5 0h139v-1H.5v1z"/>
 <path id="o" d="M0 0h162v151H0V0z"/>
 <path id="p" d="M0 0h162v146H0V0z"/>
 <path id="q" d="M6-12H0V0h6v-12zM26 0h6v-12h-6V0zM6 0h20v-12H6V0z"/>
 <path id="r" d="M6-12H0V0h6v-12zM26.005 0h6v-12h-6V0zM6 0h20.005v-12H6V0z"/>
 <path id="s" d="M6-12H0V0h6v-12zM26.02 0h6v-12h-6V0zM6 0h20.02v-12H6V0z"/>
 <path id="t" d="M7.5-15H0V0h7.5v-15zM42.47 0h7.5v-15h-7.5V0zM7.5 0h34.97v-15H7.5V0z"/>
 <path id="u" d="M7.5-15H0V0h7.5v-15zM42.478 0h7.5v-15h-7.5V0zM7.5 0h34.978v-15H7.5V0z"/>
 <path id="v" d="M7.5-15H0V0h7.5v-15zM42.008 0h7.5v-15h-7.5V0zM7.5 0h34.508v-15H7.5V0z"/>
 <path id="w" d="M.5-1H0v1h.5v-1zm21 1h.5v-1h-.5v1zM.5 0h21v-1H.5v1z"/>
 <path id="x" d="M.5-1H0v1h.5v-1zm160 1h.5v-1h-.5v1zM.5 0h160v-1H.5v1z"/>
 <path id="y" d="M.5-1H0v1h.5v-1zm169 1h.5v-1h-.5v1zM.5 0h169v-1H.5v1z"/>
 <path id="z" d="M.5-1H0v1h.5v-1zm240.423 1h.5v-1h-.5v1zM.5 0h240.423v-1H.5v1z"/>
 <path id="A" d="M.5-1H0v1h.5v-1zm204.002 1h.5v-1h-.5v1zM.5 0h204.002v-1H.5v1z"/>
 <path id="B" d="M0 0h81v70H0V0z"/>
 <path id="C" d="M0 0h81v58H0V0z"/>
 <path id="D" d="M.5-1H0v1h.5v-1zm523 1h.5v-1h-.5v1zM.5 0h523v-1H.5v1z"/>
 <path id="E" d="M0 0h34v30.468H0V0z"/>
 <path id="F" d="M0 0h34v30.468H0V0z"/>
 </defs>
 </svg>
 * */