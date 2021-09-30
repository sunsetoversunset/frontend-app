import { useState } from 'react'
import { NavHeader } from './NavHeader';
import { Footer } from './Footer'
import axios from "axios"

import '../styles/App.scss'
import '../styles/Stories.scss'

export const StoriesView = () => {

  return (
    <div className="app-page stories-view">
      <NavHeader />
      <div className='stories-view-container'>
        <div className="header-image" style={{backgroundImage: `url('https://media.getty.edu/iiif/image/5deb7e9f-cc95-4cbd-9e94-29d154d01da2/full/,1400/0/default.jpg`}}>
          <span className="background-texture"></span>
          <p className="story-title">The Gradual Disappearance of Gas Stations on Sunset</p>
        </div>

        <div className="text-block">
          <p className="byline"><b>By Francesca Ammon</b>July 23, 2021</p>
          <p className="top-text">In 1969, there were 239,000 gas stations in the United States; today, less than half that number exist. In smaller scale, Sunset Boulevard illustrates this gradual disappearance of gas retail establishments on the postwar commercial strip. </p>
          <p>In driving along six miles of Sunset Boulevard in 1973, Ed Ruscha captured about 27 gas stations with his camera, while his comparable drive in 2007 documented only 10. This is a drop from more than four stations per mile to just over one. The life cycles of these sites demonstrate the development trajectories of these decreasingly ubiquitous building types.</p>
          <p>During these late decades of the 20th century, Chevron, the successor to Standard Oil of California, dominated the Sunset Boulevard landscape; Texaco was close behind. The two companies would eventually merge in 2000. Other companies represented on the boulevard included Arco, Shell, Gulf, Mobil, and Union 76. </p>
          <p>Geographically, most gas stations were located on corner parcels, affording drivers multiple means of entry and exit. In fact, of all the gas stations on Sunset Boulevard during this period, only one—8543 Sunset Blvd—was located mid-block.</p>
        </div>

        <div className="single-image">
          <img src="https://media.getty.edu/iiif/image/22f24418-8d7e-4b99-bfc9-d887a081cfe0/full/,1000/0/default.jpg" />
          <p className="caption">
            <b>8543 Sunset Boulevard.</b> 1966.
          </p>
        </div>

        <div className="text-block">
          <p className="title">Corporate Ownership</p>
          <p>Those gas stations that survived across the decades tended to remain in the same corporate hands. At these sites, Ruscha’s photographs demonstrate changes in signage and architecture, but not ownership. At 8101 Sunset Blvd, for example, Chevron dropped the term “Standard” from its signage. The shape of the canopy extending out from the oblong garage building morphed from flat to gabled, and this form continued through Ruscha’s 2007 photographs. But despite these physical changes, the Chevron name remained constant.</p>
        </div>

        <div className="fullwidth-images three">
          <span className="image"><img src="https://media.getty.edu/iiif/image/5deb7e9f-cc95-4cbd-9e94-29d154d01da2/full/,400/0/default.jpg" /></span>
          <span className="image"><img src="https://media.getty.edu/iiif/image/57797332-eb53-4483-b31c-95ec1f47ced3/full/,400/0/default.jpg" /></span>
          <span className="image"><img src="https://media.getty.edu/iiif/image/9c0f8a45-41ba-4832-b9a0-e1e79bca457c/full/,400/0/default.jpg" /></span>
          <p className="caption">
              <b>8101 Sunset Boulevard.</b> From left: 1966, 1985, 2007.
            </p>
        </div>

        <div className="fullwidth-text">
          <p>Ruscha’s photographs demonstrate changes in signage and architecture, but not ownership.</p>
        </div>

        <div className="text-block">
          <p>The Union 76 station at 7979 Sunset Blvd illustrates a similar story. Here, however, Ruscha’s photographs also capture a changing landscape around the station—including the growth of trees and new construction to its rear. </p>
        </div>

        <div className="fullwidth-images three">
          <span className="image"><img src="https://media.getty.edu/iiif/image/81a2bbf2-3025-4421-a093-19c4ababe842/full/,400/0/default.jpg" /></span>
          <span className="image"><img src="https://media.getty.edu/iiif/image/14615978-5192-45de-bf6b-2168fa21f2f5/full/,400/0/default.jpg" /></span>
          <span className="image"><img src="https://media.getty.edu/iiif/image/895e5226-4954-48a9-8827-87e2b0e803cf/full/,400/0/default.jpg" /></span>
          <p className="caption">
              <b>7979 Sunset Boulevard.</b> From left: 1973, 1995, 2008.
            </p>
        </div>

        <div className="text-block">
          <p>These last two examples were in relatively close proximity to each other, a common phenomenon. Retail clustering made real estate sense. There were even several instances—such as at 5007 and 5025 Sunset Blvd—where competing gas stations located right next to each other. In this case, these two stations took up the entire northern stretch of Sunset Blvd between North Mariposa Ave and North Alexandria Ave. Although Ruscha had not photographed this area during his 1966 drive, city directories confirm that these sites served as home to gas stations since at least that time; they also continued going forward, through his 2007 photo shoot.</p>
        </div>

        <div className="fullwidth-images long">
          long image goes here
          <p className="caption">
              <b>Arco/Gulf at 5025 and Shell at 5007 Sunset Boulevard.</b> From left: 1973, 2007.
            </p>
        </div>

        <div className="text-block">
          <p className="title">Vacancy and Reuse</p>
          <p>More typical than the endurance of individual gas stations, however, was their replacement by different uses entirely. Parking lots for newly constructed strip malls were a frequent successor. The typical corner parcel of most gas stations made an L-shaped constellation of stores a desirable successor occupant. Paving over of the gas station site was an economical application to land that would have required substantial environmental remediation for other kinds of reuse, like housing. </p>
        </div>

        <div className="fullwidth-images two">
          <span className="image"><img src="https://media.getty.edu/iiif/image/e46542b5-4661-4d4c-bd27-73257f7371e2/full/,400/0/default.jpg" /></span>
          <span className="image"><img src="https://media.getty.edu/iiif/image/cd57c021-81e7-45ea-9e71-84f1d4e476d4/full/,400/0/default.jpg" /></span>
          <p className="caption">
              <b>6767 Sunset Boulevard.</b> From left: 1973, 1995.
            </p>
        </div>

        <div className="text-block">
          <p>All along Sunset Boulevard, Ruscha’s photographs reveal demolition and new construction remaking numerous parcels. Yet gas station sites stand out for frequently experiencing a period of vacancy before the construction of that new use. The photographs are particularly valuable for capturing these interim moments. This pattern can be explained by both the contamination of the gas station site, which would require some reworking before it could be redeveloped, as well as by the changing gasoline economy following the oil crisis of the 1970s. In the wake of this reshaping of the global market, U.S. gasoline companies shifted their strategies from dominating market share to dominating profitability. They closed many of their former retail outlets as a result. At this point, those sites sat vacant, awaiting their next occupants.</p>
          <p>In 1973, for example, 7980 Sunset Blvd was the site of a Shell station. By 1985, the pumps were gone and only the station’s auto repair function remained. By 1995, the Gaucho Grill building had been constructed atop the former pump site.</p>
        </div>

        <div className="fullwidth-images three">
          <span className="image"><img src="https://media.getty.edu/iiif/image/586030fb-05d1-4338-80ee-6e2709a52f97/full/,400/0/default.jpg" /></span>
          <span className="image"><img src="https://media.getty.edu/iiif/image/b5ec8cb8-0a95-48ec-a0bd-cee195583463/full/,400/0/default.jpg" /></span>
          <span className="image"><img src="https://media.getty.edu/iiif/image/f68e494a-2d0c-4a4b-8416-711120ecdb12/full/,400/0/default.jpg" /></span>
          <p className="caption">
              <b>7980 Sunset Boulevard.</b> From left: 1973, 1985, 1995.
            </p>
        </div>

        <div className="fullwidth-text">
          <p>In the wake of this reshaping of the global market, U.S. gasoline companies shifted their strategies from dominating market share to dominating profitability.</p>
        </div>

         <div className="text-block">
          <p>At 8873 Sunset Blvd, property owners proceeded to demolish the entire gas station facility while awaiting a new occupant. After photographing a Shell station on the site in 1966 through 1985, Ruscha captured an empty lot in 1995 and construction in progress in 2007. Shortly after, a Japanese restaurant opened there.</p>
        </div>

        <div className="fullwidth-images three">
          <span className="image"><img src="https://media.getty.edu/iiif/image/303f7698-4152-4668-8a85-a7be24315a49/full/,400/0/default.jpg" /></span>
          <span className="image"><img src="https://media.getty.edu/iiif/image/990a6a19-24ec-480c-b88c-e2df7f01e09b/full/,400/0/default.jpg" /></span>
          <span className="image"><img src="https://media.getty.edu/iiif/image/bdcb1054-3292-43e2-9eaa-62b367bd63fc/full/,400/0/default.jpg" /></span>
          <p className="caption">
              <b>8873 Sunset Boulevard.</b> From left: 1966, 1995, 2007.
            </p>
        </div>

        <div className="text-block">
          <p>If former gas station sites did not become part of a strip mall, their convenient corner location also often lent itself to fast food development. 6407 Sunset Blvd was home to a Texaco when Ruscha first photographed the site in 1973. By 1985, the site had been cleared, and a Jack in the Box was in operation there by 1995.</p>
        </div>

        <div className="fullwidth-images three">
          <span className="image"><img src="https://media.getty.edu/iiif/image/b3e82d56-c9a2-4109-b6bb-ebba90d8ad6e/full/,400/0/default.jpg" /></span>
          <span className="image"><img src="https://media.getty.edu/iiif/image/7d73317b-de9f-400e-bd37-880c31b40039/full/,400/0/default.jpg" /></span>
          <span className="image"><img src="https://media.getty.edu/iiif/image/73075226-6ea7-44e1-a529-c1fb4ea4229f/full/,400/0/default.jpg" /></span>
          <p className="caption">
              <b>6407 Sunset Boulevard.</b> From left: 1973, 1985, 1995.
            </p>
        </div>

        <div className="text-block">
          <p>Similar transformations gave way between 1985 and 1995 to a Burger King at 7077 Sunset Blvd and a Rally’s (and then Carl’s Jr.) at 6750 Sunset Blvd. One photographic cycle earlier, by 1985, a Denny’s had replaced a Chevron at 5757 Sunset Blvd.</p>
        </div>

        <div className="fullwidth-images two">
          <span className="image"><img src="https://media.getty.edu/iiif/image/37079f8d-3628-4e23-ab54-d7ff3006a71d/full/,400/0/default.jpg" /></span>
          <span className="image"><img src="https://media.getty.edu/iiif/image/cc93753c-c01d-4752-86c7-72e791d2fe05/full/,400/0/default.jpg" /></span>
          <p className="caption">
              <b>7077 Sunset Boulevard.</b> From left: 1973, 1995.
            </p>
        </div>

        <div className="fullwidth-images three">
          <span className="image"><img src="https://media.getty.edu/iiif/image/d566a28e-db75-4961-9108-3c791cbd7366/full/,400/0/default.jpg" /></span>
          <span className="image"><img src="https://media.getty.edu/iiif/image/882e49e2-7079-4725-bb2f-846470045c0f/full/,400/0/default.jpg" /></span>
          <span className="image"><img src="https://media.getty.edu/iiif/image/ac038cee-c8f4-4ad8-9a4f-4ad0ae7e25ed/full/,400/0/default.jpg" /></span>
          <p className="caption">
              <b>6750 Sunset Boulevard.</b> From left: 1973, 1995, 2007.
            </p>
        </div>

        <div className="fullwidth-images two">
          <span className="image"><img src="https://media.getty.edu/iiif/image/5c264134-3fc0-41c0-b629-db4806e3af85/full/,400/0/default.jpg" /></span>
          <span className="image"><img src="https://media.getty.edu/iiif/image/72962895-164f-4c82-8562-f5c3a79e2957/full/,400/0/default.jpg" /></span>
          <p className="caption">
              <b>5757 Sunset Boulevard.</b> From left: 1973, 1985.
            </p>
        </div>

        <div className="text-block">
          <p className="title">Oil Crisis</p>
          <p>In October 1973, the Organization of Petroleum Exporting Countries (OPEC) imposed an embargo on the United States. The result was shortages of gasoline, limits on consumers’ ability to purchase the fuel, and a dramatic increase in gas prices where the product was available. Motorists frequently had to wait in line to purchase the limited supply—until individual gas stations simply ran out of their allocation. Edward Ruscha photographed Sunset Boulevard in July of that same year, just a few months too soon to capture such scenes. But at least one of his 1985 sites offers a belated flavor for this moment. At 5278 Sunset Blvd, a handmade sign facing the street announced, “No Gas.” This site would eventually become parking for the adjacent auto repair shop.</p>
        </div>

        <div className="fullwidth-images two">
          <span className="image"><img src="https://media.getty.edu/iiif/image/2e30f26a-0d8d-4d37-997e-e5af1bd9a41f/full/,400/0/default.jpg" /></span>
          <span className="image"><img src="https://media.getty.edu/iiif/image/1e531efe-d457-49d7-9aab-644b186cc85c/full/,400/0/default.jpg" /></span>
          <p className="caption"> 
              <b>5278 Sunset Boulevard.</b> From left: 1985, 1995.
            </p>
        </div>

        <div className="fullwidth-text">
          <p>At 5278 Sunset Boulevard, a handmade sign facing the street announced, “No Gas.”</p>
        </div>

         <div className="text-block"> 
          <p>Not only the oil crisis, but also changing gasoline retail trends hastened the demise of postwar gas stations in places like Sunset Boulevard. Many of the gas stations depicted in these photographs were developed in cooperation with the auto garages that also occupied their parcel. By the 1980s, however, gas stations were changing. Self-service was increasingly common, buildings that had once served as garages now housed convenience stores instead. The overall footprint of these gas stations was also expanding. For all these reasons, earlier gas stations were becoming out of date. While drivers along Sunset Boulevard still require gasoline, and a range of facilities continued to satisfy that need, most companies have now shifted the bulk of their properties outside the dense commercial strip.</p>
        </div>


      </div>
      <Footer />
    </div>
  )
}