import Card from './Card/Index';
import { useStoriesMetadataPublished, useStoriesMetadataUnPublished } from '../../hooks';
import * as Styled from './styled';

const Stories = () => {
  const publishedStoriesMetadata = useStoriesMetadataPublished();
  const unpublishedStoriesMetadata = useStoriesMetadataUnPublished();
  return (
    <Styled.Stories>
      <h1>Stories</h1>
      <Styled.Cards>
        {publishedStoriesMetadata.map(d => <Card storyMetadata={d} key={d.slug} />)}
      </Styled.Cards>

      {(unpublishedStoriesMetadata.length > 0) && (
        <div>
          <h2>Coming Soon</h2>
          <Styled.Cards>
            {unpublishedStoriesMetadata.map(d => <Card storyMetadata={d} key={d.slug} />)}
          </Styled.Cards>
        </div>
      )}
    </Styled.Stories>
  );
};

export default Stories;