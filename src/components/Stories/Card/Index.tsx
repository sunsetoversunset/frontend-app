import { Link } from "react-router-dom";
import type { StoryMetadata } from "../../../index.d";
import * as Styled from "./styled";

const Card = ({ storyMetadata }: { storyMetadata: StoryMetadata }) => {
  const { slug, img_id, title, author, published } = storyMetadata;
  if (!published) {
    return (
      <Styled.Card src={`https://media.getty.edu/iiif/image/${img_id}/full/,300/0/default.jpg`} published={published}>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Author>{author}</Styled.Author>
      </Styled.Card>
    );
  }
  return (
    <Link to={`/stories/${slug}`}>
      <Styled.Card src={`https://media.getty.edu/iiif/image/${img_id}/full/,300/0/default.jpg`} published={published}>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Author>{author}</Styled.Author>
      </Styled.Card>
    </Link>
  );
};

export default Card;
