import Card from './Card/Index';
import { useStoriesMetadata } from '../../hooks';
import * as Styled from './styled';

const Stories = () => {
  const storiesMetadata = useStoriesMetadata();
  return (
    <Styled.Stories>
      <h1>Stories</h1>
      <p>[Explanatory text ...]</p>
      <Styled.Cards>
        {storiesMetadata.map(d => <Card storyMetadata={d} key={d.slug} />)}
      </Styled.Cards>
    </Styled.Stories>
  );
};

export default Stories;