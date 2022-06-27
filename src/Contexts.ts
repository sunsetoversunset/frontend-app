import * as React from 'react';
import { Dimensions } from './index.d';
import { PanoramaContextParams } from './components/Panorama/index.d';
import { AddressData } from './types/AddressView.d';


export const DimensionsContext = React.createContext<Dimensions>({} as Dimensions);
export const PanoramaContext = React.createContext<PanoramaContextParams | null>(null);
export const AddressDataContext = React.createContext<AddressData>({} as AddressData);