import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Markdown from 'markdown-to-jsx';
import PhotoViewerModal from "../PhotoViewerModal";
import ToPOrNotToP from './MarkdownOverrides/ToPOrNotToP';
import ModalImg from './MarkdownOverrides/ModalImg';
import AOrLink from './MarkdownOverrides/Link';
import { StoryMetadata } from '../..';
import { useAppContext } from '../../hooks';
import '../../styles/App.scss';
import '../../styles/Story.scss';


const Story = () => {
  const { storyslug } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState<string>();
  const [byDate, setByDate] = useState<string>();
  const { width, setModalActive } = useAppContext();
  const [modalId, setModalId] = useState<string>();
  const [headerBgImage, setHeaderBgImage] = useState<string>();
  const [story, setStory] = useState('');


  useEffect(() => {
    axios.get(`/stories/stories.json`)
      .then(response => {
        const storiesMetadata: StoryMetadata[] = response.data;
        const storyMetadata = storiesMetadata.find(d => d.slug === storyslug);
        if (storyMetadata) {
          setTitle(storyMetadata.title);
          setAuthor(storyMetadata.author);
          setByDate(`${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][storyMetadata.date.month - 1]} ${storyMetadata.date.day}, ${storyMetadata.date.year}`);
          setHeaderBgImage(`https://media.getty.edu/iiif/image/${storyMetadata.img_id}/full/,${width}/0/default.jpg`);
        }
      });
    axios.get(`/stories/${storyslug}.md`)
      .then(response => {
        const lines: string[] = response.data.split('\n');
        if (lines && lines.length > 0) {
          // // the first h1 ('#  {title}') is the title
          // const titleIdx = lines.findIndex(line => line.startsWith('# '));
          // if (titleIdx !== -1) {
          //   // setTitle(lines[titleIdx].substring(2));
          //   lines.splice(titleIdx, 1);
          // }
          // // the first img is the background image
          // const imgpattern = /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/;
          // const imgIdx = lines.findIndex(line => line.match(imgpattern));
          // if (imgIdx !== -1) {
          //   const matches = lines[imgIdx].match(imgpattern);
          //   // if (matches?.groups?.filename) {
          //   //   setHeaderBgImage(matches?.groups.filename);
          //   // }
          //   lines.splice(imgIdx, 1);
          // }

          // image bars are coded as lists of images.
          // find consequtive image lists and resize the image to fit the screen
          const barImgPattern = /\* !\[[^\]]*\]\(https:\/\/media\.getty\.edu\/iiif\/image\/(?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/;
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

  console.log(headerBgImage);

  return (
    <>
      <div className='app-page story'>
        <div className='stories-view-container'>
          {(title && headerBgImage) && (
            <div
              className="header-image"
              style={{
                backgroundImage: `url(${headerBgImage}`
              }}
            >
              <h1 className="story-title">
                {title}
              </h1>
            </div>
          )}

          {(author && byDate) && (
            <div className="byline">
              <strong>By {author}</strong> {byDate}
            </div>
          )}
          <Markdown
            options={{
              wrapper: 'article',
              overrides: {
                p: ToPOrNotToP,
                img: {
                  component: ModalImg,
                  props: {
                    setModalId,
                    setModalActive,
                  }
                },
                a: AOrLink,
              }
            }}
          >
            {story}
          </Markdown>
        </div>
      </div>

      {
        (modalId) && (
          <PhotoViewerModal
            id={modalId}
            setModalId={setModalId}
          />
        )
      }
    </>
  );
};

export default Story;
