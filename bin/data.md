# Data documentation

## Primary Data

The authoritative source of the structured data for *Sunset Over Sunset* is stored in [baserow](https://baserow.io/database/6782/).

### Photographs
There are five photograph tables by year: [`photographs_1966`](https://baserow.io/database/6782/table/24448), [`photographs_1973`](https://baserow.io/database/6782/table/24445), [`photographs_1985`](https://baserow.io/database/6782/table/24446), [`photographs_1995`](https://baserow.io/database/6782/table/24447), and [`photographs_2007`](https://baserow.io/database/6782/table/24449). The all have the same fields:

```
identifier: string;      // the getty id for the photo
coordinate: number;      // a number between 0 and 993.27018 representing the position of the photo along Sunset beginning at 9201 and ending at 307 W Sunset
street_side: 'n' | 's';  // the side of the street the camera was facing
```

### Addresses

The table [`coordinate_master`](https://baserow.io/database/6782/table/103061) contains spatial data about addresses and cross streets using the same range of coordinates as the photographs table. The boundaries are used to filter for photos that we can be reasonably confident capture the address or location.

```
identifier: number;                   // ??
label: string;                        // either the numerical address of the name of a cross street
coordinate: number:                   // a single coordinate for plotting the location as a point
street_side: 'n' | 's';               // the side of the street the location is on
label_hidden: boolean;                // whether the label is hidden, i.e. not displayed on the address bar, in the app; this prevents too much visual overlap and collision
is_address: boolean;                  // whether the location is an address
coordinate_bound_min: number | null;  // the westernmost coordinate of the boundary using the same coordinate range as the photographs tables; it's null for cross streets
coordinate_bound_max: number | null;  // the eastermonst coordinate of the boundary 
```

(Note: [`address_boundaries`](https://baserow.io/database/6782/table/27379) and [`strip_labels`](https://baserow.io/database/6782/table/23215) are vestigial tables that were previously used for this same data but have been replaced by `coordinate_master`.)

### Address data

Social, economic, material, and cultural data about addresses is stored in five tables:

1. [`census_data`](https://baserow.io/database/6782/table/25442) contains, unsurprisingly, census data about the tracts through which Sunset runs:

```
tract: 1898 | 1899 | 1901 | 1905 | 1906 | 1907 | 1908 | 1909 | 1911 | 1912 | 1913 | 1942 | 1943 | 1953 | 1954 | 1956 | 1957 | 1958 | 1959 | 1973 | 1974 | 1975 | 1976 | 1977 | 2071 | 2072 | 7003 | 7005 | 1899.02 | 1899.04 | 1899.05 | 1905.1 | 1905.2 | 1908.01 | 1908.02 | 1909.01 | 1909.02 | 1910 | 1911.1 | 1912.01 | 1913.01 | 1913.02 | 1955 | 1957.1 | 1957.2 | 1958.03 | 1958.04 | 1959.01 | 1959.02 | 1974.2 | 2071.1 | 7002 | 7005.01 | 7005.02 | 1899.01 | 1958.01;  // the tract number
year: 1960 | 1970 | 1980 | 1990 | 2000 | 2010;  // the census year
variable: 'total_pop' | 'race_white' | 'race_black' | 'race_span_hisp' | 'educ_hs' | 'educ_college' | 'jobs_service' | 'rented_housing' | 'jobs_pers_entmt' | 'avg_fam_income' | 'med_fam_income' | 'foreign_born_pop' | 'foreign_noncitizens' | 'foreign_naturalized' | 'educ_bach';   // the variable
value: number;  // the variables value for the year and tract
```

2. [`census_tract_lookups`](https://baserow.io/database/6782/table/27382) is a join table that maps addressses to census tracts by year.

```
address: string;
tract_1960: string;       // the census tract id
tract_1970: string; 
tract_1980: string; 
tract_1990: string; 
tract_2000: string; 
tract_2010: string; 
```

3. [`city_directories`](https://baserow.io/database/6782/table/20022) contains data about occupants of addresses over the years the photographs span.

```
address: string;                   // the address; it's always a numeric string
address_fragment: string | null;   // a unit number if the address has or had multiple units
year: 1965 | 1973 | 1987;          // the city directory year
entry: string;                     // the name of the occupant
```

4. [`social_cultural`](https://baserow.io/database/6782/table/83220) contains social and cultural data about addresses drawn from external sources like the [Los Angeles Public Library](https://lapl.org) and [Historic Places Los Angeles](http://historicplacesla.org/).

```
address: string;
source_date: number | null;                          // the year of the evidence
building_data: number | null;                        // the year the building was built
data_type: 'Menu' | 'Map' | 'Blog' | 'Article' ;     // the type of evidence
source: string;                                      // the name of the source, often a newspaper
entry:                                               // a description of the evidence
url: string;
Active: boolean;                                     // ?? there is no data in this column
```

5. [`newspapers`](https://baserow.io/database/6782/table/20025) contains selected newspaper articles about particularly addresses.

```
address: string;              // the address; it's always a numeric string
title: string;                // the title of the article
year: number;                 
month: number;
day: number;
source: string;               // the newspaper
entry: string;                // the content of the article
url: string | null;           // the URL of the article if it's online
```

## Instantiate Application data

The application does not draw directly from baserow. Instead, the application data is stored as json files. Two of those files are bundled into the main js file for the application; the remainder are written the the [`public` directory](../public/) and loaded asychronously by the application when needed.

These json files are instantiated nightly from the authoritative data in baserow via GitHub actions using two python scripts: [baserow_to_json.py](baserow_to_json.py) and [baserow_to_addresses.py](baserow_to_addresses.py).

`baserow_to_json.py` generates 11 files. 10 of those files are basic data for photographs, one for each year and each side of the street. These files are written to [/public/data/](../public/data/) with the file naming convention `photographs_{year}_{street_side}.json`. The primary component consuming this data is `PhotoStrip.tsx` (via a custom hook), which renders the photo strip for a year and street side. The data structure for these json files is:

```
{
  id: number;
  order: string;            // a float variable as a string; this isn't used in the app
  identifier: string;      // the getty id for the photo
  coordinate: string;      // a number (as a string) between 0 and 993.27018 representing the position of the photo along Sunset beginning at 9201 and ending at 307 W Sunset
  street_side: 'n' | 's';  // the side of the street the camera was facing
}[]
```

The eleventh json file, [`strip_labels.json`[(../src/assets/data/strip_labels.json, is a one that isn't loaded asynchronously by the app but included in the js app bundle itself as it's used throughout the application for placing locations on the address strip and the map. It's data structure is:

```
{
  l: string;           // the address or cross street
  c: number;           // the location coordinate
  s: 'n' \ 's';        // the street side
  h: boolean;          // whether the label is hidden on address strips, etc.
  lat: number;         // a calculated latitude for the location for the map
  lng: number;         // a calculated longitude for the location for the map
  rotation: number;    // a rotation in degrees for to orient any marker for the location rougly perpendicular to Sunset or its tangent line
```

`baserow_to_addresses.py` script creats json files for addresses. It writes a large number of files: [one listing addresses with data](../src/assets/data/addresses_with_boundaries.json and one for each address containing census data, newspapers, social and cultural data, etc. for the address. The former, like strip_labels.json, is bundled with the application. It's structure could not be simpler: it's just an array of addresses (as strings) that have address data, which is used to determine whether an address is linked to an address page or not.

Those address pages load a json file with all the data about that address. These files are written by `baserow_to_addresses.py` to (`./public/address_data/`)[../public/address_data/] using the file naming convention `{address}.json`. The structure of those files is a bit involved as it includes all the different kinds of data (census data, newspapers, social and cultural data, etc.) about each address:

```
// a photo that falls between the addresses boundaries
type Photo = {
  id: string;
  coordinate: number;
  year: number;
};

// a generic type that holds some data census data value for a decade
type CensusDatumForDecades = {
  1960?: number | string;
  1970?: number | string;
  1980?: number | string;
  1990?: number | string;
  2000?: number | string;
  2010?: number | string;
};

type DecadeIndex = keyof CensusDatumForDecades;

// the census data; the key is the census variable, the value is an array of objects where the key is the census decade and the value is the census value
type CensusData = {
  tracts: CensusDatumForDecades;
  total_pop: CensusDatumForDecades;
  race_white: CensusDatumForDecades;
  race_black: CensusDatumForDecades;
  race_span_hisp: CensusDatumForDecades;
  educ_hs: CensusDatumForDecades;
  educ_college: CensusDatumForDecades;
  educ_bach: CensusDatumForDecades;
  jobs_pers_entmt: CensusDatumForDecades;
  jobs_service: CensusDatumForDecades;
  avg_fam_income: CensusDatumForDecades;
  med_fam_income: CensusDatumForDecades;
  rented_housing: CensusDatumForDecades;
  foreign_born_pop: CensusDatumForDecades;
  foreign_noncitizens: CensusDatumForDecades;
  foreign_naturalized: CensusDatumForDecades;
};

// data about an occupant
type Occupants_Data = {
  fragment: string;
  year: number;
  entry: string;
}

// data about a newspaper article
type NewspaperArticle = {
  title: string;
  date: {
    year: number;
    month: number;
    day: number;
  };
  source: string;
  entry: string;
  url: string;
}

// data about a piece of social or cultural info
type SocialCulturalInformation = {
  source_date: number;
  building_date: number;
  data_type: 'Menu' | 'Article' | 'Map' | 'Blog';
  source: string;
  entry: string;
  url: string;
}

// data about assessment
type AssessorRow = {
  id: number;
  order: string;
  OBJECTID: string;
  AIN: string;
  APN: string;
  address: string;
  SitusDirection: string;
  fragment: string;
  SitusStreet: string;
  SitusAddress: string;
  SitusCity: string;
  SitusZIP: string;
  SitusFullAddress: string;
  TaxRateArea: string;
  TaxRateCity: string;
  AgencyClassNo: string;
  AgencyName: string;
  AgencyType: string;
  UseCode: string;
  UseCode_2: string;
  UseType: string;
  UseDescription: string;
  DesignType1: string;
  YearBuilt1: string;
  EffectiveYear1: string;
  Units1: string;
  Bedrooms1: string;
  Bathrooms1: string;
  SQFTmain1: string;
  DesignType2: string;
  YearBuilt2: string;
  EffectiveYear2: string;
  Units2: string;
  Bedrooms2: string;
  Bathrooms2: string;
  SQFTmain2: string;
  DesignType3: string;
  YearBuilt3: string;
  EffectiveYear3: string;
  Units3: string;
  Bedrooms3: string;
  Bathrooms3: string;
  SQFTmain3: string;
  DesignType4: string;
  YearBuilt4: string;
  EffectiveYear4: string;
  Units4: string;
  Bedrooms4: string;
  Bathrooms4: string;
  SQFTmain4: string;
  DesignType5: string;
  YearBuilt5: string;
  EffectiveYear5: string;
  Units5: string;
  Bedrooms5: string;
  Bathrooms5: string;
  SQFTmain5: string;
  Roll_Year: string;
  Roll_LandValue: string;
  Roll_ImpValue: string;
  Roll_PersPropValue: string;
  Roll_FixtureValue: string;
  Roll_HomeOwnersExemp: string;
  Roll_RealEstateExemp: string;
  Roll_PersPropExemp: string;
  Roll_FixtureExemp: string;
  Roll_LandBaseYear: string;
  Roll_ImpBaseYear: string;
  SpatialChangeDate: string;
  ParcelCreateDate: string;
  ParcelTypeCode: string;
  Assr_Map: string;
  Assr_Index_Map: string;
  QualityClass1: string;
  QualityClass2: string;
  QualityClass3: string;
  QualityClass4: string;
  QualityClass5: string;
  LegalDescLine1: string;
  LegalDescLine2: string;
  LegalDescLine3: string;
  LegalDescLine4: string;
  LegalDescLine5: string;
  LegalDescLineLast: string;
  LegalDescription: string;
};

// the full shape of the file with many values containing arrays of the types of data above
type AddressData = {
  side: 'n' | 's';
  boundaries: [number, number];
  photos: Photo[];
  census_data: CensusData;
  occupants_data: Occupants_Data[];
  newspaper_data: NewspaperArticle[];
  social_cultural_data: SocialCulturalInformation[];
  assessor_data: AssessorRow[];
};
```

