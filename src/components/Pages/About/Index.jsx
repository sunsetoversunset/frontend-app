import getty from '../../../assets/images/getty.png'
import mapCenter from '../../../assets/images/logo-MapCenter.png'
import nEH from '../../../assets/images/logo-NEH.svg'
import uPenn from '../../../assets/images/logo-UPenn.png'
import swarthmore from '../../../assets/images/swarthmore.png'
import * as Styled from './styled';


const About = () => {
  return (
    <div className="app-page about-view" id="about">
      <Styled.About>
        <Styled.PageHeader style={{ backgroundImage: `url('https://media.getty.edu/iiif/image/de285f40-3405-4620-89af-27a0e24ef7c7/full/,1400/0/default.jpg` }}>
          <Styled.Title>
            <span className="bottom">Sunset Over Sunset</span>
            <span className="top">Sunset Over Sunset</span>
          </Styled.Title>
        </Styled.PageHeader>

        <Styled.Subtitle>
          Exploring Postwar Urban Redevelopment Using Ed Ruscha's Los Angeles Photography
        </Styled.Subtitle>

        <p><b>Between 1965 and 2007</b>, artist Ed Ruscha photographed Los Angeles's Sunset Boulevard twelve times. Largely unknown after publication of Ruscha's iconic 1966 book, Every Building on the Sunset Strip, these photographs have become available through the digitization efforts of the Getty Research Institute, which made this unique archive visible. While these images taken from a moving vehicle record the curious and innovative eye of one of the most significant artists of the last half-century, they also provide an unmatched record of small-scale urban change on one of the iconic streets in the United States. On Sunset Boulevard, changing storefronts, signs, buildings, and people trace national and global histories of migration, economic transformation, architectural innovation, and cultural change. In Ruscha's photographs lies a powerful tool for urban history, and Sunset Over Sunset seeks to reveal that history.</p>
        <p>A collaborative digital humanities project, Sunset Over Sunset incorporates five years of Ruscha's Sunset Boulevard photographs, one photo set for each decade, between Doheny Road and downtown Los Angeles. In these ten miles, a wide range of Angelenos have inhabited and reshaped dense commercial blocks. The site locates these photographs in space and time and joins them with a range of data sources—city directories, the U.S. Census, and local newspapers, among others—to provide greater context for the changes seen in Ruscha's photographs decade-by-decade. “All I was after was that store-front plane,” Ruscha once said of his Sunset photographs. Yet looking not just at the façade but also behind it proves a revelatory experience. </p>

        <Styled.Callout>Gas stations, banks, restaurants, palm trees, and ads all reveal specific stories of this street, as well as larger urban histories in decades of extensive global transformation.</Styled.Callout>

        <p>In the postwar United States, the most dramatic urban development projects involved large-scale change, first funded by the federal government in the guise of urban renewal, interstate highways, and public housing, then increasingly in the form of private-sector-led megaprojects. Understandably, superblock housing developments, stadia, and commercial centers attract attention, but far more common were small-scale gestures, what we call the “redevelopment vernacular.” The appearance of a newspaper box, a sign changed from English to Spanish, or the departure of a tenant remain difficult, if not impossible to trace in traditional archives, but they all surface here. In creating a research tool that allows easy navigation of Ruscha's images and illuminating related sources, we hope Sunset Over Sunset can enable new directions in understanding the history of cities, the buildings that fill them, and the people who inhabit them.</p>
        <p>Sunset Over Sunset comprises five main components. The Panorama view facilitates easy exploration of Ruscha's photographs over these ten miles. Clicking on an individual photo offers a detailed view of a single image. Selecting an address on the Panorama page or photo viewer brings up a deeper profile of historical quantitative and qualitative data for that location. Tags provide a visualization of the frequency and location of individual building types, uses, and other repeated phenomena on Sunset. Finally, Stories illuminate histories that have unfolded here, offering a platform for scholars to ask, “What story of Sunset do we tell if we tell it through ____?” Gas stations, banks, restaurants, palm trees, and ads all reveal specific stories of this street, as well as larger urban histories in decades of extensive global transformation. We invite you to explore these histories and use Sunset Over Sunset to write your own.</p>

        <Styled.Heading>Team</Styled.Heading>

        <Styled.Subheading>Project Directors</Styled.Subheading>
        <Styled.TeamList>
          <li><a target="_blank" rel="noreferrer" href="http://www.francescaammon.com/">Francesca Russello Ammon</a>, University of Pennsylvania</li>
          <li><a target="_blank" rel="noreferrer" href="https://briangoldstein.org/">Brian D. Goldstein</a>, Swarthmore College</li>
          <li><a target="_blank" rel="noreferrer" href="http://people.matinic.us/garrett/">Garrett Dash Nelson</a>, Leventhal Map & Education Center at the Boston Public Library</li>
        </Styled.TeamList>

        <Styled.Subheading>Design & Development</Styled.Subheading>
        <Styled.TeamList>
          <li><a target="_blank" rel="noreferrer" href="">Rob Nelson</a>, Design and Development Lead</li>
          <li><a target="_blank" rel="noreferrer" href="https://livia-foldes.com/">Livia Foldes</a>, Visual design</li>
          <li><a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/rachel-s-ng">Rachel Ng</a>, UX Design</li>
          <li><a target="_blank" rel="noreferrer" href="https://andrewlux.com/">Andrew Lux</a>, Development</li>
          <li><a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/walei">Walei Sabry</a>, Accessibility Consultant</li>
        </Styled.TeamList>

        <Styled.Subheading>Advisory Board</Styled.Subheading>
        <Styled.TeamList>
          <li><a target="_blank" rel="noreferrer" href="http://www.fallon-samuels-aidoo.com/">Fallon Samuels Aidoo</a>, Tulane University</li>
          <li><a target="_blank" rel="noreferrer" href="https://www.genevievecarpio.com/">Genevieve Carpio</a>, University of California, Los Angeles</li>
          <li><a target="_blank" rel="noreferrer" href="http://www.nathanieldeines.com">Nathaniel Deines</a>, Getty Digital</li>
          <li><a target="_blank" rel="noreferrer" href="http://www.esperdy.net/">Gabrielle Esperdy</a>, New Jersey Institute of Technology</li>
          <li><a target="_blank" rel="noreferrer" href="https://archleague.org/about/staff/">Mariana Mogilevich</a>, Urban Omnibus</li>
          <li><a target="_blank" rel="noreferrer" href="https://americanstudies.columbian.gwu.edu/suleiman-osman">Suleiman Osman</a>, George Washington University</li>
          <li><a target="_blank" rel="noreferrer" href="https://www.unlv.edu/people/mark-padoongpatt">Mark Padoongpatt</a>, University of Nevada, Las Vegas</li>
          <li><a target="_blank" rel="noreferrer" href="https://miriamposner.com/">Miriam Posner</a>, University of California, Los Angeles</li>
          <li><a target="_blank" rel="noreferrer" href="http://emilypugh.com/">Emily Pugh</a>, Getty Research Institute</li>
          <li><a target="_blank" rel="noreferrer" href="https://scholar.harvard.edu/jenniferquick">Jennifer Quick</a>, Independent Scholar</li>
          <li><a target="_blank" rel="noreferrer" href="https://www.worcester.edu/Faculty-Profiles/Earth,-Environment,-and-Physics/Alexander-Tarr/">Alexander Tarr</a>, Worcester State University</li>
        </Styled.TeamList>

        <Styled.Subheading>Research Assistants</Styled.Subheading>
        <Styled.TeamList>
          <li>Dorothy-Rui Corrigan</li>
          <li>Nathaly De La Paz</li>
          <li>Kimberly La Porte</li>
          <li>Elena Moore</li>
          <li>Juliette S. Morfin</li>
          <li>Calvin Nguyen</li>
          <li>Gerardo Ramirez Lopez</li>
          <li>Julian M. Valgora</li>
        </Styled.TeamList>


        <Styled.Subheading>Institutional Support</Styled.Subheading>
        <Styled.TeamList>
          <li><img alt='' src={getty} /></li>
          <li><img alt='' src={nEH} /></li>
          <li><img alt='' src={swarthmore} /></li>
          <li><img alt='' src={uPenn} /></li>
          <li><img alt='' src={mapCenter} /></li>
        </Styled.TeamList>

        <Styled.Heading>Acknowledgments</Styled.Heading>
        <p>Our institutional partners, funders, development team, advisory board, and numerous research assistants have enabled us to create Sunset Over Sunset, and we are grateful to all for their generosity and collaborative spirit. In addition, numerous individuals not listed above have played crucial roles in encouraging our ideas and supporting this project both intellectually and administratively. At the Getty Research Institute, we extend special thanks to Zanna Gilbert, Chelsea Larkin, Andrew Perchuk, Emily Pugh, Megan Sallabedra, and Karly Wildenhaus. At Swarthmore College, we are especially grateful to Michelle Crouch, Tania Johnson, Denise Risoli, Deborah Thompson, and Joseph Watson. At the University of Pennsylvania, we wish to thank Jessica DeJesus and Ann Vernon-Grey. Katherine E. Kelly provided essential editorial support. We thank Alison Isenberg for her confidence in and support for this project. Finally, we offer special appreciation and gratitude to Ed Ruscha, whose work—and generosity in letting scholars explore it—has made this site possible.</p>

        <Styled.Heading>Citation</Styled.Heading>
        <p>Francesca Russello Ammon, Brian D. Goldstein, and Garrett Dash Nelson, “Sunset over Sunset, accessed [date], https://sunsetoversunset.org. </p>

        <Styled.Heading>Contact</Styled.Heading>
        <p><a href="mailto:info@sunsetoversunset.org">info@sunsetoversunset.org</a></p>
      </Styled.About>
    </div >
  );
}

export default About;
