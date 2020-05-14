# Compass React Native 🧭
A simple compass app built with react-native solely for learning purpose. Expo version can be found [here](https://github.com/rahulhaque/compass-react-native-expo). This project is overall an example for anyone trying to work with sensors/magnetometer in react native.

## Description
A very simple demonstration of how to use device's built in `Magnetometer` sensor to identify direction and calculate degree of angle. This app makes use of the below packages - 
- [React-Native-Sensors](https://github.com/react-native-sensors/react-native-sensors) for magnetometer data.
- [Low-Pass-Filter](https://github.com/uhho/LPF) to reduce sensor data fluctation.

## Run the App
- Clone or download the repository.
- `cd` into directory.
- Run `npm install`
- Copy your `debug.keystore` from Android Studio to project `/android/app`
- Connect your device in `USB debugging` mode or use Android emulator.
- Then run `react-native run-android`.

## To-do
- Build and test the app on iOS devices. The `/ios` directory does not contain any dependencies or config. (Yet to own a Mac 💻).

## Screenshots
<img title="Compass" src="https://github.com/rahulhaque/compass-react-native/blob/master/screenshots/image.png" width="300">

## Info
Share the project and spare a 🟊 if helped.
