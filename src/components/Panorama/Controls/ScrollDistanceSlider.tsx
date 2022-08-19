import React from 'react';
import Slider from 'rc-slider';
import { usePanoramaData } from '../../../hooks';

const ScrollDistanceSlider = () => {
  const { scrollDistance, setScrollDistance } = usePanoramaData();

  return (
    <div id="scroll_speed_control" >
      <h6>Scroll Distance </h6>
      <label>Less</label>
      <Slider
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
        className="slider"

      />
      <label>More</label>
    </div>
  );
};

export default ScrollDistanceSlider;