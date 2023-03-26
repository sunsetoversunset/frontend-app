from urllib.request import Request, urlopen
import json
import time

api_key = 'jk9y8Ms1CRYCIGD6pGdAFRkMZKiuIY9g'


def get_table(table_id, page=1):
    time.sleep(0.05)
    url = f'https://api.baserow.io/api/database/rows/table/{table_id}/?user_field_names=true&page={page}'
    if (page == 1):
        print("requesting page ", end='')
    print(f"{page} ... ", end='')
    req = Request(url)
    req.add_header('Authorization', f'Token {api_key}')
    content = urlopen(req).read()
    response_json = json.loads(content)
    results = response_json["results"]
    if response_json["count"] > page * 100:
        results = results + get_table(table_id, page + 1)
    else:
        print("")  # newline
    return results


print("getting address boundaries...")
coordinate_master = get_table(103061)

# write the addresses json file
# def get_address(address_boundary):
#     return address_boundary["address"]

# addresses = map(get_address, addresses_boundaries)

addresses_with_boundaries = list(filter(lambda coordinate: coordinate['coordinate_bound_min'] is not None, coordinate_master))
addresses = [address_boundary["label"] for address_boundary in addresses_with_boundaries]

with open("./src/assets/data/addresses_with_boundaries.json", "w") as f:
    json.dump(addresses, f)

print("getting photos...")
photographs = {
    '1966': get_table(24448),
    "1973": get_table(24445),
    "1985": get_table(24446),
    "1995": get_table(24447),
    "2007": get_table(24449)
}

print("getting census data...")
census_tracts = get_table(27382)
census_data = get_table(25442)

print("getting city directory data...")
city_directory_data = get_table(20022)

print("getting newspaper data...")
raw_newspaper_data = get_table(20025)

print("getting assessor data...")
raw_assessor_data = get_table(27759)

print("getting social/cultural data...")
raw_social_cultural_data = get_table(83220)

# make a dictionary of addresses with associated photos
addresses = {}
# buffer = 0.5
for address_boundary in addresses_with_boundaries:
    address_photos = []
    for year, value in photographs.items():
        address_photos.extend(
            {
                'id': photo['identifier'],
                'coordinate': float(photo['coordinate']),
                'year': int(year)
            }
            for photo in value
            # if (photo['coordinate'] and address_boundary['coordinate_min'] and address_boundary['coordinate_max'] and float(photo['coordinate']) >= float(address_boundary['coordinate_min']) - (float(address_boundary['coordinate_max']) - float(address_boundary['coordinate_min'])) * buffer and float(photo['coordinate']) <= float(address_boundary['coordinate_max']) + (float(address_boundary['coordinate_max']) - float(address_boundary['coordinate_min'])) * buffer and photo['street_side'] == address_boundary['street_side'])
            if (photo['coordinate'] and address_boundary['coordinate_bound_min'] and address_boundary['coordinate_bound_max'] and float(photo['coordinate']) >= float(address_boundary['coordinate_bound_min']) - 0.75 and float(photo['coordinate']) <= float(address_boundary['coordinate_bound_max']) + 0.75 and photo['street_side'] == address_boundary['street_side'])
        )

    address_census_data = {}
    for address_row in census_tracts:
        if (address_row['address'] == address_boundary['label']):
            address_census_data['tracts'] = {
                '1960': None if address_row['tract_1960'] == '--' else int(address_row['tract_1960']) if address_row['tract_1960'].isdigit() else float(address_row['tract_1960']),
                '1970': None if address_row['tract_1970'] == '--' else int(address_row['tract_1970']) if address_row['tract_1970'].isdigit() else float(address_row['tract_1970']),
                '1980': None if address_row['tract_1980'] == '--' else int(address_row['tract_1980']) if address_row['tract_1980'].isdigit() else float(address_row['tract_1980']),
                '1990': None if address_row['tract_1990'] == '--' else int(address_row['tract_1990']) if address_row['tract_1990'].isdigit() else float(address_row['tract_1990']),
                '2000': None if address_row['tract_2000'] == '--' else int(address_row['tract_2000']) if address_row['tract_2000'].isdigit() else float(address_row['tract_2000']),
                '2010': None if address_row['tract_2010'] == '--' else int(address_row['tract_2010']) if address_row['tract_2010'].isdigit() else float(address_row['tract_2010'])
            }
            for census_data_row in census_data:
                if (str(census_data_row['tract']) == str(address_census_data['tracts'][census_data_row['year']])):
                    if (census_data_row['variable'] not in address_census_data):
                        address_census_data[census_data_row['variable']] = {}
                    address_census_data[census_data_row['variable']][census_data_row['year']] = int(
                        census_data_row['value']) if census_data_row['value'].isdigit() else float(census_data_row['value'])

    occupants_data = [
        {
            "fragment": city_directory_row["address_fragment"],
            "year": int(city_directory_row["year"]) if city_directory_row["year"].isdigit() else None,
            "entry": city_directory_row["entry"]
        } for city_directory_row in city_directory_data
        if (city_directory_row["address"] == address_boundary["label"])
    ]

    newspaper_data = [
        {
            "title": newspaper_row["title"],
            "date": {
                "year": int(newspaper_row["year"]) if newspaper_row["year"].isdigit() else None,
                "month": int(newspaper_row["month"]) if newspaper_row["month"].isdigit() else None,
                "day": int(newspaper_row["day"]) if newspaper_row["day"].isdigit() else None,
            },
            "source": newspaper_row["source"],
            "entry": newspaper_row["entry"],
            "url": newspaper_row["url"]
        } for newspaper_row in raw_newspaper_data
        if (newspaper_row["address"] == address_boundary["label"])
    ]

    social_cultural_data = [
        {
            "source_date": int(social_cultural_row["source_date"]) if social_cultural_row["source_date"] is not None and social_cultural_row["source_date"].isdigit() else None,
            "building_date": int(social_cultural_row["building_date"]) if social_cultural_row["building_date"] is not None and social_cultural_row["building_date"].isdigit() else None,
            "data_type": social_cultural_row["data_type"],
            "source": social_cultural_row["source"],
            "entry": social_cultural_row["entry"],
            "url": social_cultural_row["url"]
        } for social_cultural_row in raw_social_cultural_data
        if (social_cultural_row["address"] == address_boundary["label"])
    ]

    assessor_data = [
        assessor_row
        for assessor_row in raw_assessor_data
        if (assessor_row["address"] == address_boundary["label"])
    ]

    addresses[address_boundary["label"]] = {
        "side": address_boundary["street_side"],
        "boundaries": [float(address_boundary['coordinate_bound_min']), float(address_boundary['coordinate_bound_max'])],
        'photos': address_photos,
        'census_data': address_census_data,
        'occupants_data': occupants_data,
        'newspaper_data': newspaper_data,
        'social_cultural_data': social_cultural_data,
        'assessor_data': assessor_data,
    }

    with open(f"../../public/address_data/{address_boundary['label']}.json", "w") as f:
        json.dump(addresses[address_boundary["label"]], f)


def is_n(item):
    return item["street_side"] == 'n'


def is_s(item):
    return item["street_side"] == 's'


# write the photographs json files
for year, value in photographs.items():
    n_values_iteratator = filter(is_n, value)
    n_values = list(n_values_iteratator)
    with open(f"./public/data/photographs_{year}_n.json", "w") as f:
        json.dump(n_values, f)
    s_values_iteratator = filter(is_s, value)
    s_values = list(s_values_iteratator)
    with open(f"./public/data/photographs_{year}_s.json", "w") as f:
        json.dump(s_values, f)
