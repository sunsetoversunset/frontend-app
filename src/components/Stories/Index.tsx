import Card from './Card/Index';
import { useStoriesMetadataPublished, useStoriesMetadataUnPublished, useAppContext } from '../../hooks';
import * as Styled from './styled';

const Stories = () => {
  const { width } = useAppContext();
  const publishedStoriesMetadata = useStoriesMetadataPublished();
  const unpublishedStoriesMetadata = useStoriesMetadataUnPublished();
  return (
    <Styled.Stories>
      <Styled.HeaderImage url={`https://media.getty.edu/iiif/image/b5ae8080-6f5e-4178-a13a-5589446004a2/full/,${width}/0/default.jpg`}>
        <Styled.Title>Stories</Styled.Title>
      </Styled.HeaderImage>

      <p>Sunset Boulevard contains a multitude of stories behind its facades. Seeing them requires that one slow down and look, property by property, year over year, as Ruscha's camera did.</p>
      
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