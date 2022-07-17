import * as React from 'react';
import { AppContextParams } from './index.d';
import { PanoramaContextParams } from './components/Panorama/index.d';
import { AddressData } from './types/AddressView.d';


export const AppContext = React.createContext<AppContextParams>({} as AppContextParams);
export const PanoramaContext = React.createContext<PanoramaContextParams | null>(null);
export const AddressDataContext = React.createContext<AddressData>({} as AddressData);