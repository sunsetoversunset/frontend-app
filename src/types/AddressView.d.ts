import Direction from '../index.d';

export type Photo = {
  id: string;
  coordinate: number;
  year: number;
};

export type CensusDatumForDecades = {
  1960?: number | string;
  1970?: number | string;
  1980?: number | string;
  1990?: number | string;
  2000?: number | string;
  2010?: number | string;
};

export type DecadeIndex = keyof CensusDatumForDecades;

export type CensusData = {
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

export type CensusField = keyof CensusData;

export type Occupants_Data = {
  fragment: string;
  year: number;
  entry: string;
}

export type NewspaperArticle = {
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

export type AssessorRow = {
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

export type AddressData = {
  side: 'n' | 's';
  boundaries: [number, number];
  photos: Photo[];
  census_data: CensusData;
  occupants_data: Occupants_Data[];
  newspaper_data: NewspaperArticle[];
  assessor_data: AssessorRow[];
};