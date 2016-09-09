/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    DrawerLayoutAndroid,
    WebView
} from 'react-native';

import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

class Dora extends Component {
    render() {
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
            </View>
        );
        return (
            <DrawerLayoutAndroid
                ref={'drawer'}
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
                <Icon.ToolbarAndroid
                    navIconName="navicon"
                    onIconClicked={()=>this.refs.drawer.openDrawer()}
                    title="Dora"
                    actions={[{title: 'Settings', iconName: 'gear', show: 'always'}]}
                    onActionSelected={this.onActionSelected}
                    style={styles.toolbar}
                />

                <Svg height="100" width="100">
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
                        width="70"
                        height="70"
                        stroke="red"
                        strokeWidth="2"
                        fill="yellow"
                    />
                </Svg>
            </DrawerLayoutAndroid>
        );
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
    });

AppRegistry.registerComponent('Dora', () => Dora);
