import csv
import json
import schedule
import time
from collections import defaultdict
import requests
import lxml.etree as etree
import tabula, urllib

# this is a datasource scheduler


def get_yesterday():
    from datetime import date, timedelta
    today = date.today()
    return today - timedelta(days=1)


def generate_current_date_datasource_govt_url():
    r = requests.get('https://www.wbhealth.gov.in/pages/corona/bed_availability')
    parser = etree.HTMLParser()
    tree = etree.HTML(r.text, parser)
    node = tree.xpath("(.//a[@target='_blank']/@href)[1]")
    return node[0]


def generate_current_date_datasource_pvt_url():
    r = requests.get('https://www.wbhealth.gov.in/pages/corona/bed_availability_pvt')
    parser = etree.HTMLParser()
    tree = etree.HTML(r.text, parser)
    node = tree.xpath("(.//a[@target='_blank']/@href)[1]")
    return node[0]


def extract_datasource_govt():
    url_govt = generate_current_date_datasource_govt_url()
    try:
        tabula.convert_into(url_govt, "file_govt.csv", pages="all")
    except urllib.error.HTTPError:
        pass
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
    url_pvt = generate_current_date_datasource_pvt_url()
    try:
        tabula.convert_into(url_pvt, "file_pvt.csv", pages="all")
    except urllib.error.HTTPError:
        pass
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