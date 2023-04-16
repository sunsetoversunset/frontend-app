import { usePanoramaData } from '../../../../hooks';
import * as Styled from './styled';

const ScrollDistanceSlider = () => {
  const { scrollDistance, setScrollDistance } = usePanoramaData();

  return (
    <Styled.SpeedControl>
      <Styled.Label>Scroll Distance</Styled.Label>
      <label>Less</label>
      <Styled.SpeedSlider
        min={2}
        max={10}
        defaultValue={scrollDistance * 10}
        onChange={(value) => {
          setScrollDistance((value as number / 10))
        }}
        handleStyle={{
          borderColor: 'black',
          backgroundColor: 'orange',
          opacity: 0.9,
        }}
        trackStyle={{
          backgroundColor: 'grey'
        }}
        railStyle={{
          backgroundColor: 'grey'
        }}
      />
      <label>More</label>
    </Styled.SpeedControl>
  );
};

export default ScrollDistanceSlider;