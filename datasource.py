import csv
import json

import schedule
import time
from collections import defaultdict

# this is a datasource scheduler


def get_yesterday():
    from datetime import date, timedelta
    today = date.today()
    return today - timedelta(days=1)


def get_yesterday_govt():
    yesterday = get_yesterday()
    day = yesterday.strftime("%d")
    month = yesterday.strftime("%m")
    year = yesterday.strftime("%Y")
    return f"{day}.{month}_.{year}"


def get_yesterday_pvt():
    yesterday = get_yesterday()
    day = yesterday.day
    month = yesterday.month
    year = yesterday.strftime("%Y")
    return f"{day}-{month}-.{year}"


def generate_current_date_datasource_govt_url():
    yesterday = get_yesterday_govt()
    'https://www.wbhealth.gov.in/pages/corona/bed_availability_pvt'
    # return f'https://www.wbhealth.gov.in/uploaded_files/corona/Vacant_bed_status_as_on_{yesterday}_.pdf'
    return f'https://www.wbhealth.gov.in/uploaded_files/corona/Vacant_bed_status_as_on_03.05_.2021_.pdf'


def generate_current_date_datasource_pvt_url():
    yesterday = get_yesterday_pvt()
    # return f'https://www.wbhealth.gov.in/uploaded_files/corona/Status_of_Vacant_Beds_as_on_{yesterday}_.pdf'
    return f'https://www.wbhealth.gov.in/uploaded_files/corona/Status_of_Vacant_Beds_as_on_4-5-.2021_.pdf'


def generate_datasource():
    import tabula, urllib
    url_govt = generate_current_date_datasource_govt_url()
    url_pvt = generate_current_date_datasource_pvt_url()
    # df = tabula.read_pdf(url, multiple_tables=True, pages='all', encoding='utf-8')
    try:
        tabula.convert_into(url_govt, "file_govt.csv", pages="all")
        tabula.convert_into(url_pvt, "file_pvt.csv", pages="all")
    except urllib.error.HTTPError:
        pass


def extract_datasource_govt():
    generate_datasource()
    lines = list()
    try:
        with open('file_govt.csv', 'r') as readFile:
            reader = csv.reader(readFile)
            for row in reader:
                lines.append(row)
                for field in row:
                    if field == 'Sr no' or field == 'Grand Total' or 'BED AVAILABILITY STATUS' in field:
                        lines.remove(row)
            data = defaultdict(dict)
            for values in lines:
                count = values.pop(0)
                if count != '' and values[2] != '' and values[3] != '':
                    dstrct = values.pop(0)
                    hosptl = values.pop(0).replace('\n', ' ').replace('.', '')
                    totl_beds = values.pop(0)
                    avl_beds = values.pop(0)
                    data[dstrct][hosptl] = {"total_beds": totl_beds, "available_beds": avl_beds}
            readFile.close()
            return data
    except FileNotFoundError:
        pass


def extract_datasource_pvt():
    generate_datasource()
    lines = list()
    try:
        with open('file_pvt.csv', 'r') as readFile:
            reader = csv.reader(readFile)
            for row in reader:
                lines.append(row)
                for field in row:
                    if field == 'Sl.' or field == 'TOTAL':
                        lines.remove(row)
            data = defaultdict(dict)
            for values in lines:
                count = values.pop(0).replace('.', '')
                if count != '' and values[2] != '' and values[3] != '':
                    dstrct = values.pop(0)
                    hosptl = values.pop(0).replace('\n', ' ').replace('.', '')
                    totl_beds = values.pop(0)
                    avl_beds = values.pop(0)
                    data[dstrct][hosptl] = {"total_beds": totl_beds, "available_beds": avl_beds}
            readFile.close()
            return data
    except FileNotFoundError:
        pass


def extract_all_datasource():
    govt = extract_datasource_govt()
    pvt = extract_datasource_pvt()
    yesterday = get_yesterday().strftime("%d%m%Y")
    import os
    try:
        os.remove("file_pvt.csv")
        os.remove("file_govt.csv")
    except FileNotFoundError:
        pass
    return {yesterday: {'govt': govt, 'pvt': pvt}}


data = extract_all_datasource()
print(json.dumps(data, sort_keys=True, indent=4))



# # schedule.every().day.at("06:00").do(extract_datasource)
# schedule.every(1).minutes.do(extract_datasource)
#
# while True:
#     schedule.run_pending()
#     time.sleep(1)