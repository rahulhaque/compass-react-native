import React, {Component} from 'react';
import {Text, View, Image, Dimensions} from 'react-native';
import {Grid, Col, Row} from 'react-native-easy-grid';
import {Magnetometer} from 'react-native-sensors';

const {height, width} = Dimensions.get('window');

type Props = {};

export default class App extends Component<Props> {

  constructor() {
    super();
    this.state = {
      magnetometer: '0',
    };
  }

  componentDidMount() {
    this._toggle();
  };

  componentWillUnmount() {
    this._unsubscribe();
  };

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  };

  _subscribe = async () => {
    new Magnetometer({
      updateInterval: 100
    })
    .then(magnetometerObservable => {
      this._subscription = magnetometerObservable;
      this._subscription.subscribe(sensorData => {
        console.log(sensorData);
        this.setState({magnetometer: this._angle(sensorData)});
      });
    })
    .catch(error => {
      console.log("The sensor is not available");
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.stop();
    this._subscription = null;
  };

  _angle = (magnetometer) => {
    if (magnetometer) {
      let {x, y, z} = magnetometer;

      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      }
      else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }

    return Math.round(angle);
  };

  _direction = (degree) => {
    if (degree >= 22.5 && degree < 67.5) {
      return 'NE';
    }
    else if (degree >= 67.5 && degree < 112.5) {
      return 'E';
    }
    else if (degree >= 112.5 && degree < 157.5) {
      return 'SE';
    }
    else if (degree >= 157.5 && degree < 202.5) {
      return 'S';
    }
    else if (degree >= 202.5 && degree < 247.5) {
      return 'SW';
    }
    else if (degree >= 247.5 && degree < 292.5) {
      return 'W';
    }
    else if (degree >= 292.5 && degree < 337.5) {
      return 'NW';
    }
    else {
      return 'N';
    }
  };

  // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
  _degree = (magnetometer) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  render() {

    return (
      <Grid style={{backgroundColor: 'black'}}>

        <Row style={{alignItems: 'center'}} size={.9}>
          <Col style={{alignItems: 'center'}}>
            <Text
              style={{
                color: '#fff',
                fontSize: height / 26,
                fontWeight: 'bold'
              }}>{this._direction(this._degree(this.state.magnetometer))}
            </Text>
          </Col>
        </Row>

        <Row style={{alignItems: 'center'}} size={.1}>
          <Col style={{alignItems: 'center'}}>
            <View style={{width: width, alignItems: 'center', bottom: 0}}>
              <Image source={require('./assets/compass_pointer.png')} style={{
                height: height / 26,
                resizeMode: 'contain'
              }}/>
            </View>
          </Col>
        </Row>

        <Row style={{alignItems: 'center'}} size={2}>
          <Text style={{
            color: '#fff',
            fontSize: height / 27,
            width: width,
            position: 'absolute',
            textAlign: 'center'
          }}>
            {this._degree(this.state.magnetometer)}°
          </Text>

          <Col style={{alignItems: 'center'}}>

            <Image source={require("./assets/compass_bg.png")} style={{
              height: width - 80,
              justifyContent: 'center',
              alignItems: 'center',
              resizeMode: 'contain',
              transform: [{rotate: 360 - this.state.magnetometer + 'deg'}]
            }}/>

          </Col>
        </Row>

        <Row style={{alignItems: 'center'}} size={1}>
          <Col style={{alignItems: 'center'}}>
            <Text style={{color: '#fff'}}>Copyright @RahulHaque</Text>
          </Col>
        </Row>

      </Grid>
    );
  }
}
