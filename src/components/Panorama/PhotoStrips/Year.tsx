import { usePhotoStrip } from "../../../hooks";
import * as Styled from "./PhotoStrip/styled";

export const Year = ({ year }: { year: number }) => {
  const { leftX, rightX, photoData } = usePhotoStrip(year);

  const imageWidth = 299;
  const hasPhotos = photoData.some((d) => d.x >= leftX - imageWidth && d.x <= rightX + imageWidth);

  return (
    <Styled.YearPanorama $hasPhotos={hasPhotos}>
      <Styled.Year>{year}</Styled.Year>
    </Styled.YearPanorama>
  );
};

export default Year;
