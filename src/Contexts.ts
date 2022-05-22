import * as React from 'react';
import { Dimensions } from './index.d';
import { PanoramaContextParams } from './components/Panorama/index.d';


export const DimensionsContext = React.createContext<Dimensions | null>(null);
export const PanoramaContext = React.createContext<PanoramaContextParams | null>(null);