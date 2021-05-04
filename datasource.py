import csv
import schedule
import time


# this is a datasource scheduler


def get_yesterday():
    from datetime import date, timedelta
    today = date.today()
    yesterday = today - timedelta(days=1)
    day = yesterday.strftime("%d")
    month = yesterday.strftime("%m")
    year = yesterday.strftime("%Y")
    return f"{day}.{month}_.{year}"


def generate_current_date_datasource_url():
    yesterday = get_yesterday()
    # return f'https://www.wbhealth.gov.in/uploaded_files/corona/Vacant_bed_status_as_on_{yesterday}_.pdf'
    return f'https://www.wbhealth.gov.in/uploaded_files/corona/Vacant_bed_status_as_on_03.05_.2021_.pdf'


def generate_datasource():
    import tabula, urllib
    url = generate_current_date_datasource_url()
    # df = tabula.read_pdf(url, multiple_tables=True, pages='all', encoding='utf-8')
    try:
        tabula.convert_into(url, "tab.csv", pages="all")
    except urllib.error.HTTPError:
        pass


def extract_datasource():
    generate_datasource()
    lines = list()
    try:
        with open('tab.csv', 'r') as readFile:
            reader = csv.reader(readFile)
            for row in reader:
                lines.append(row)
                for field in row:
                    if field == 'Sr no' or field == 'Grand Total' or 'BED AVAILABILITY STATUS' in field:
                        lines.remove(row)
            keys = ["district", "hospital", "total_beds", "available_beds"]
            data = {}
            for values in lines:
                count = values.pop(0)
                data[count] = dict(zip(keys, values))
            readFile.close()
            # for keys, values in data.items():
            #     print(keys, values)
            import os
            os.remove("tab.csv")
            return data
    except FileNotFoundError:
        pass


data = extract_datasource()
print(data)


# # schedule.every().day.at("06:00").do(extract_datasource)
# schedule.every(1).minutes.do(extract_datasource)
#
# while True:
#     schedule.run_pending()
#     time.sleep(1)
