/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import noble from 'react-native-ble';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    DrawerLayoutAndroid,
    WebView,
    ListView,
    TouchableHighlight
} from 'react-native';

import Svg, {
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

// {/*constructor(props) {*/}
//         {/*super(props);*/}
//
//         {/*noble.startScanning();*/}
//         {/*noble.on('discover', (p)=>{*/}
//             {/*console.log(p);*/}
//             {/*this.state.ds.append({Name:p.advertisement.localName,RSSI:p.rssi});*/}
//         {/*}).bind(this);*/}
//
//         {/*var ds = new ListView.DataSource({*/}
//             {/*rowHasChanged: (r1, r2) => r1 != r2*/}
//         {/*});*/}
//         {/*this.state = {*/}
//             {/*ds: [],*/}
//             {/*dataSource: ds,*/}
//         {/*}*/}
//     {/*}*/}

    // componentDidMount() {
    //     this.setState({
    //         dataSource: this.state.dataSource.cloneWithRows(this.state.ds),
    //     })
    // }
    //
    // renderRow(rowData) {
    //     return (
    //         <TouchableHighlight
    //             onPress={()=> this.pressRow(rowData)}
    //             underlayColor='#ddd'>
    //             <View style={styles.row}>
    //                 <Text style={{fontSize: 18}}>{rowData.Name} : {rowData.RSSI}</Text>
    //             </View>
    //         </TouchableHighlight>
    //
    //     )
    // }

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
                <WebView
                ref={'webview'}
                automaticallyAdjustContentInsets={false}
                style={styles.webView}
                source={require('./7.1.html')}
                javaScriptEnabledAndroid={true}
                domStorageEnabledAndroid={true}
                onNavigationStateChange={this.onNavigationStateChange}
                onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                startInLoadingState={true}
                scalesPageToFit={false}
                />
                {/*<ListView*/}
                    {/*dataSource={this.state.dataSource}*/}
                    {/*renderRow={this.renderRow.bind(this)}>*/}
                {/*</ListView>*/}
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
    WebView: {
        overflow: 'visible'
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