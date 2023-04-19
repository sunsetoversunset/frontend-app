import { useAppContext } from "../../../hooks";
import MapMarker from './Marker';
import Base from './Base';
import Scale from './Scale';
import SelectableAddresses from './SelectableAddresses/Index';
import * as Styled from './styled';

const Map = () => {
  const { width } = useAppContext();
  const height = Math.min(200, width / 3);

  return (
    <Styled.Map height={height}>
      <svg
        width={width}
        height={height}
      >
        <Base />
        <Scale />
        <g transform={`translate(${width / 2} ${height / 2}) rotate(0)`}>
          <SelectableAddresses />
          <MapMarker />
        </g>
      </svg>
    </Styled.Map>
  )
}

export default Map;