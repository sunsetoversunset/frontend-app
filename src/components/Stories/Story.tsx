import { useEffect, useState } from 'react';
import axios from 'axios';
import Markdown from 'markdown-to-jsx';
import { useParams, useLocation } from 'react-router-dom';
import { StoryMetadata } from '../..';
import { useAppContext } from '../../hooks';
import Callout from './MarkdownOverrides/Callout/Index';
import ImageList from './MarkdownOverrides/ImageList/Index';
import AOrLink from './MarkdownOverrides/Link';
import ModalImg from './MarkdownOverrides/ModalImg';
import Footnote from './MarkdownOverrides/Footnote';
import ToPOrNotToP from './MarkdownOverrides/ToPOrNotToP/Index';
import EnlargedImg from './EnlargedImg/Index';
import * as Styled from './styled';


const Story = () => {
  const { storyslug } = useParams();
  const { hash } = useLocation();
  const scrollTo = (hash) ? hash.substring(1) : undefined;
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState<string>();
  const [byDate, setByDate] = useState<string>();
  const { width, setModalActive, setModalId } = useAppContext();
  const [headerBgImage, setHeaderBgImage] = useState<string>();
  const [bgPosition, setBGPosition] = useState<string>();
  const [story, setStory] = useState('');
  const [enlargedImg, setEnlargedImg] = useState<{ src: string, alt: string } | undefined>();

  useEffect(() => {
    axios.get(`/storiesassets/stories.json`)
      .then(response => {
        const storiesMetadata: StoryMetadata[] = response.data;
        const storyMetadata = storiesMetadata.find(d => d.slug === storyslug);
        if (storyMetadata) {
          setTitle(storyMetadata.title);
          setAuthor(storyMetadata.author);
          let byDate = `${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][storyMetadata.date.month - 1]} ${storyMetadata.date.day}, ${storyMetadata.date.year}`;
          if (storyMetadata.revised_date) {
            byDate = `${byDate} (revised ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][storyMetadata.revised_date.month - 1]} ${storyMetadata.revised_date.day}, ${storyMetadata.revised_date.year})`;
          }
          setByDate(byDate);
    setHeaderBgImage(`https://media.getty.edu/iiif/image/${storyMetadata.img_id}/full/,${width}/0/default.jpg`);
          if (storyMetadata.background_position) {
            setBGPosition(storyMetadata.background_position);
          }
        }
      });
    axios.get(`/storiesassets/stories/${storyslug}.md`)
      .then(response => {
        const lines: string[] = response.data.split('\n');
        if (lines && lines.length > 0) {

          // image bars are coded as lists of images.
          // find consequtive image lists and resize the image to fit the screen
          const barImgPattern = /\* !\[[^\]]*\]\(https:\/\/media\.getty\.edu\/iiif\/image\/(?<filename>.*?)(?="|\))(?<optionalpart>".*")?\)/;
          lines.forEach((line, idx) => {
            const match = line.match(barImgPattern);
            if (match && match.groups?.filename) {
              // look forward and to determine the number of consequetive images
              let count = 1;
              let isAMatch = true;
              let previousIdx = idx - 1;
              while (previousIdx >= 0 && isAMatch === true) {
                if (lines[previousIdx].match(barImgPattern)) {
                  count++;
                  previousIdx--;
                } else {
                  isAMatch = false;
                }
              }
              isAMatch = true;
              let nextIdx = idx + 1;
              while (nextIdx <= lines.length - 1 && isAMatch === true) {
                if (lines[nextIdx].match(barImgPattern)) {
                  count++;
                  nextIdx++;
                } else {
                  isAMatch = false;
                }
              }

              const params = match.groups.filename.split('/');
              if (params.length === 5) {
                params[2] = `${Math.floor((width - 2) / count)},`;
                lines[idx] = lines[idx].replace(match.groups.filename, params.join('/'));
              }
            }
          })
          setStory(lines.join('\n'));
        }
      });
  }, [storyslug, width]);

  useEffect(() => {
    if (scrollTo && story.length > 0) {
      const note = document.getElementById(scrollTo);
      note?.scrollIntoView({ behavior: "smooth", block: 'center' });
    }
  }, [scrollTo, story]);

  return (
      <Styled.Story>
        {(title && headerBgImage) && (
        <Styled.HeaderImage url={headerBgImage} backgroundPosition={bgPosition}>
            <Styled.Title>{title}</Styled.Title>
          </Styled.HeaderImage>
        )}

        {(author && byDate) && (
          <Styled.Byline><strong>By {author}</strong> {byDate}</Styled.Byline>
        )}
        <Markdown
          options={{
            wrapper: 'article',
            overrides: {
              p: {
                component: ToPOrNotToP,
              },
              pre: {
                component: Callout,
              },
              img: {
                component: ModalImg,
                props: {
                  setModalId,
                  setModalActive,
                  setEnlargedImg,
                }
              },
              a: {
                component: AOrLink,
              },
              ul: {
                component: ImageList,
                props: {}
              },
              h3: {
                component: Styled.SectionTitle,
              },
              div: {
                component: Footnote,
              }
            }
          }}
        >
          {story}
      </Markdown>
      {(enlargedImg) && (
        <EnlargedImg
          src={enlargedImg.src}
          alt={enlargedImg.alt}
          setEnlargedImg={setEnlargedImg}
        /> 
      )}
      </Styled.Story>
  );
};

export default Story;
