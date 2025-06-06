/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import MapboxGL from '@rnmapbox/maps';
import { MAPBOX_TOKEN } from './src/config/variables';

MapboxGL.setAccessToken(MAPBOX_TOKEN);

AppRegistry.registerComponent(appName, () => App);
