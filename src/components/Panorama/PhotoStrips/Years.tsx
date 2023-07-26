import { usePanoramaData } from "../../../hooks";
import Year from './Year';

export const PhotoStrips = () => {
  const {
    years
  } = usePanoramaData();  
  return (
    <div>
      {years.map(year => {
        return (
          <Year
            year={year}
            key={`year-${year}`}
          />
        );
      })}
    </div>
  )
}

export default PhotoStrips;