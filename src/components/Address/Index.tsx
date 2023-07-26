import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { AddressDataContext } from "../../Contexts";
import { useAddressData, useStoriesFeaturingAddress } from "../../hooks";
import Controls from "./Controls/Index";
import Header from "./Header/Index";
import PhotoStrips from "./PhotoStrips/Index";
import CensusTable from "./Tables/Census/Index";
import NewspaperTable from "./Tables/Newspaper";
import OccupancyTable from "./Tables/Occupancy";
import SocialCulturalTable from "./Tables/SocialCultural";
import TaxAssessments from "./Tables/TaxAssessments";
import * as Styled from "./styled";

const AddressView = () => {
  const { address, addressData, addressHasData } = useAddressData();

  const [show, setShow] = useState<"photos" | "context">("context");

  const [showStoriesNotification, setShowStoriesNotification] = useState(true);

  const [storiesNotificationHeight, setStoriesNotificationHeight] = useState<number>(0);

  const storiesAlert = useRef(null);

  useEffect(() => {
    setShowStoriesNotification(true)
  }, [address]);

  useEffect(() => {
    if (storiesAlert.current && showStoriesNotification && storiesNotificationHeight === 0) {
      d3.select(storiesAlert.current)
        .transition()
        .duration(500)
        .style('max-height', '250px')
        .on('end', () => {
          setStoriesNotificationHeight(250);
        });
    }
  });

  useEffect(() => {
    if (storiesAlert.current && !showStoriesNotification && storiesNotificationHeight === 250) {
      d3.select(storiesAlert.current)
        .transition()
        .duration(500)
        .style('max-height', '0px')
        .on('end', () => {
          setStoriesNotificationHeight(0);
        })
    }
  });

  const stories = useStoriesFeaturingAddress(address);

  if (!addressHasData) {
    return (
      <div className="app-page" id="address-page">
        <p>{`${address} isn't a valid address.`}</p>
      </div>
    );
  }

  if (!addressData) {
    return null;
  }

  return (
    <AddressDataContext.Provider value={addressData}>
      <Styled.Address className="app-page">
        {/* <ScrollToTop /> */}
        <Header />
        <Controls show={show} setShow={setShow} />
        {show === "photos" && <PhotoStrips />}
        {show === "context" && (
          <div id="historicalcontext">
            <OccupancyTable />
            <NewspaperTable />
            <SocialCulturalTable />
            <CensusTable />
            <TaxAssessments />
            <div id="building_records">
              <h1>Search Building Records</h1>
              <p>
                <a href="https://ladbsdoc.lacity.org/IDISPublic_Records/idis/DocumentSearchSelection.aspx" target="_blank" rel="noreferrer">
                  Click here to open the search page on the Los Angeles Department of Buildings and Safety site.
                </a>
              </p>
              <p>You'll then need to do the following:</p>
              <ol>
                <li>
                  Click <strong>"By Address"</strong>
                </li>
                <li>
                  Enter <strong>{address} W Sunset Blvd</strong>, using exactly that text, including the direction and the abbreviated "Blvd".
                </li>
                <li>
                  Click <strong>"Search"</strong> to find building records for this address.
                </li>
              </ol>
            </div>
            <div id="zimas">
              <h1>Search ZIMAS (Zone Information and Map Access System)</h1>
              <p>
                <a href="https://zimas.lacity.org/" target="_blank" rel="noreferrer">
                  Click here to open the search page on the ZIMAS site
                </a>
              </p>
              <p>You'll then need to do the following:</p>
              <ol>
                <li>
                  Enter <strong>{address}</strong> in the "House Number" field and <strong>Sunset</strong> as the "Street Name" (no prefixes or suffixes).
                </li>
                <li>
                  Click <strong>"GO"</strong> to find records for this address.
                </li>
              </ol>
            </div>
          </div>
        )}
      </Styled.Address>
      {(stories.length > 0) && (
        <Styled.StoriesAlert ref={storiesAlert} maxheight={storiesNotificationHeight}>
          <div>
            This address is discussed in the {(stories.length === 1) ? 'story ' : 'stories '}
            {stories.map((d, idx) =>
              <>
                {(stories.length >= 2 && idx === stories.length - 1) && <> and </>}
                <Styled.StoriesLink to={`/stories/${d.slug}`} key={d.slug}>{d.title}</Styled.StoriesLink>
                {(stories.length >= 3 && idx !== stories.length - 1) && <>, </>}
              </>
            )}.
          </div>
          <Styled.CloseButton onClick={() => { setShowStoriesNotification(false); }}><img src="/static/media/icon-close.ea68c934.svg" alt="icon-close-search" /></Styled.CloseButton>
        </Styled.StoriesAlert>
      )}
    </AddressDataContext.Provider>
  );
};

export default AddressView;
