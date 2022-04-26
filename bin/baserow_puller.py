import requests

api_key = 'jk9y8Ms1CRYCIGD6pGdAFRkMZKiuIY9g'
tables = [
    {"tablename": "strip_labels", "baserow_id": '23215' },
    {"tablename": 'photographs_1973', "baserow_id": '24445'},
    {"tablename": 'photographs_1985', "baserow_id": '24446'},
    {"tablename": 'photographs_1995', "baserow_id": '24447'},
    {"tablename": 'photographs_1966', "baserow_id": '24448'},
    {"tablename": 'photographs_2007', "baserow_id": '24449'},
    
]

def pull_table(t):

    if(t["tablename"] == "strip_labels"):
        north_side_file = open('./src/assets/data/strip_labels_n.csv', 'w+')
        south_side_file = open('./src/assets/data/strip_labels_s.csv', 'w+')

        north_side_file.write('label,coordinate')
        south_side_file.write('label,coordinate')

        baserow_url = "https://api.baserow.io/api/database/rows/table/{}/?size=500!&user_field_names=true".format(t['baserow_id'])
        complete = False

        while not complete:

            r = request_single_page(baserow_url)

            for row in r['results']:

                if not row['hidden']:

                    if row['street_side'] == 'n':
                        north_side_file.write('\n{},{}'.format(row['label'],row['coordinate']))
                    elif row['street_side'] == 's':
                        south_side_file.write('\n{},{}'.format(row['label'],row['coordinate']))

            if(r['next'] is not None):
                baserow_url = r['next']
            else:
                complete = True


    elif(t["tablename"].split("_")[0] == "photographs"):

        north_side_file = open('./src/assets/data/{}_n.csv'.format(t['tablename']),'w+')
        south_side_file = open('./src/assets/data/{}_s.csv'.format(t['tablename']),'w+')

        north_side_file.write('identifier,coordinate')
        south_side_file.write('identifier,coordinate')

        baserow_url = "https://api.baserow.io/api/database/rows/table/{}/?size=500!&user_field_names=true".format(t['baserow_id'])
        complete = False

        while not complete:

            r = request_single_page(baserow_url)

            for row in r['results']:

                if row['street_side'] == 'n':
                    north_side_file.write('\n{},{}'.format(row['identifier'],row['coordinate']))
                elif row['street_side'] == 's':
                    south_side_file.write('\n{},{}'.format(row['identifier'],row['coordinate']))

            if(r['next'] is not None):
                baserow_url = r['next']
            else:
                complete = True


def request_single_page(url):
    r = requests.get(url, headers={"Authorization": "Token {}".format(api_key)})
    return r.json()
    

def pull_all_tables():
    for t in tables:
        pull_table(t)

pull_all_tables()