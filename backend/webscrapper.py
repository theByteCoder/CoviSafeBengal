# import time
# import requests
# from selenium import webdriver
#
#
# def generate_geolocation(address):
#     r = requests.get(
#         f'https://maps.googleapis.com/maps/api/geocode/json?address={address}&key=AIzaSyAbXbGA2ISQnS26IYk-wsnp54EL-o9q4Vk')
#     return r.json()
#
#
# def get_daily_hospital_data():
#     # setup
#     driver = webdriver.Chrome('chromedriver.exe')
#     driver.maximize_window()
#     driver.get("https://excise.wb.gov.in/chms/Public/Page/CHMS_Public_Hospital_Bed_Availability.aspx")
#     # create list of district names
#     districts_list = []
#     time.sleep(30)
#     # get district dropdown
#     selects = driver.find_element_by_xpath(".//select[@class='form-control']")
#     # get district dropdown options
#     for element in selects.find_elements_by_tag_name("option"):
#         if element.text != "--Select--":
#             districts_list.append(element.text)
#     # create a dict from list of district names
#     districts = dict.fromkeys(districts_list)
#     for keys in districts.keys():
#         districts[keys] = {'govt': [], 'pvt': [], 'requisitioned': []}
#     # show only hospitals with available beds
#     driver.find_element_by_xpath('(.//span[@class="ListControl"])[2]/parent::div').click()
#     time.sleep(2)
#     # get hospital data
#     for district in districts_list:
#         time.sleep(5)
#         selects = driver.find_element_by_xpath(".//select[@class='form-control']")
#         for item in selects.find_elements_by_tag_name("option"):
#             time.sleep(2)
#             if item.get_attribute("value") != "--Select--":
#                 if district == item.text:
#                     item.click()
#                     time.sleep(2)
#                     # select government hospitals
#                     driver.find_element_by_xpath('(.//label)[1]').click()
#                     time.sleep(4)
#                     hospital_cards_list = driver.find_elements_by_xpath(".//table/tbody/tr/td/div")
#                     time.sleep(6)
#                     if len(hospital_cards_list) > 0:
#                         for each_card in driver.find_elements_by_xpath(".//table/tbody/tr/td/div"):
#                             time.sleep(6)
#                             hospital = str(each_card.find_element_by_xpath('.//div/h5').text).replace(
#                                 '(Government Hospital)', '').replace('(Satellite Govt. Building)', '')
#                             address = each_card.find_element_by_xpath('(.//div/div/div)[1]').text
#                             contact = each_card.find_element_by_xpath('(.//div/div/div/a)[1]').get_attribute(
#                                 'href')
#                             online_registration = each_card.find_element_by_xpath(
#                                 '(.//div/div/div/a)[2]').get_attribute(
#                                 'href')
#                             total_beds = each_card.find_element_by_xpath(
#                                 '(.//div/div/div/div/ul/li/h3)[7]').text
#                             available_beds = each_card.find_element_by_xpath(
#                                 '(.//div/div/div/div/ul/li/h3)[8]').text
#                             last_updated = each_card.find_element_by_xpath('.//div/small').text
#                             location = generate_geolocation(f'{hospital}, {district}')
#                             lat = location['results'][0]['geometry']['location']['lat']
#                             lng = location['results'][0]['geometry']['location']['lng']
#                             govt = {'hospital': hospital, 'address': address, 'total_beds': total_beds,
#                                     'available_beds': available_beds, 'contact': contact,
#                                     'online_registration': online_registration,
#                                     'last_updated': last_updated, 'lat': lat, 'lng': lng}
#                             districts[district]['govt'].append(govt)
#                     time.sleep(6)
#                     # select requisitioned hospitals
#                     driver.find_element_by_xpath('(.//label)[2]').click()
#                     time.sleep(4)
#                     if len(driver.find_elements_by_tag_name('table')) > 0:
#                         hospital_cards_list = driver.find_elements_by_xpath(".//table/tbody/tr/td/div")
#                         time.sleep(6)
#                         if len(hospital_cards_list) > 0:
#                             for each_card in driver.find_elements_by_xpath(".//table/tbody/tr/td/div"):
#                                 time.sleep(6)
#                                 hospital = str(each_card.find_element_by_xpath('.//div/h5').text).replace(
#                                     '(Govt. Requisitioned Pvt. Hospital)', '')
#                                 address = each_card.find_element_by_xpath('(.//div/div/div)[1]').text
#                                 contact = each_card.find_element_by_xpath('(.//div/div/div/a)[1]').get_attribute(
#                                     'href')
#                                 online_registration = each_card.find_element_by_xpath(
#                                     '(.//div/div/div/a)[2]').get_attribute(
#                                     'href')
#                                 total_beds = each_card.find_element_by_xpath(
#                                     '(.//div/div/div/div/ul/li/h3)[7]').text
#                                 available_beds = each_card.find_element_by_xpath(
#                                     '(.//div/div/div/div/ul/li/h3)[8]').text
#                                 last_updated = each_card.find_element_by_xpath('.//div/small').text
#                                 location = generate_geolocation(f'{hospital}, {district}')
#                                 lat = location['results'][0]['geometry']['location']['lat']
#                                 lng = location['results'][0]['geometry']['location']['lng']
#                                 requisitioned = {'hospital': hospital, 'address': address, 'total_beds': total_beds,
#                                                  'available_beds': available_beds, 'contact': contact,
#                                                  'online_registration': online_registration,
#                                                  'last_updated': last_updated, 'lat': lat, 'lng': lng}
#                                 districts[district]['requisitioned'].append(requisitioned)
#                     time.sleep(6)
#                     # select private hospitals
#                     driver.find_element_by_xpath('(.//label)[3]').click()
#                     time.sleep(4)
#                     if len(driver.find_elements_by_tag_name('table')) > 0:
#                         if len(driver.find_elements_by_xpath(
#                                 "(.//tr[@class='pagination-ys']/td/table/tbody/tr)[1]/td")) > 0:
#                             for page in range(len(driver.find_elements_by_xpath(
#                                     "(.//tr[@class='pagination-ys']/td/table/tbody/tr)[1]/td"))):
#                                 time.sleep(6)
#                                 if driver.find_elements_by_xpath(
#                                         "(.//tr[@class='pagination-ys']/td/table/tbody/tr)[1]/td")[page].text != '1':
#                                     driver.find_elements_by_xpath(
#                                         "(.//tr[@class='pagination-ys']/td/table/tbody/tr)[1]/td")[
#                                         page].find_element_by_xpath('.//a').click()
#                                 time.sleep(6)
#                                 if len(driver.find_elements_by_xpath(".//table/tbody/tr/td/div")) > 0:
#                                     for each_card in driver.find_elements_by_xpath(".//table/tbody/tr/td/div"):
#                                         time.sleep(6)
#                                         hospital = str(each_card.find_element_by_xpath('.//div/h5').text).replace(
#                                             '(Private Hospital (Self Run))', '').replace('(Satellite Hotel)',
#                                                                                          '').replace(
#                                             '(Satellite Pvt. Building)', '')
#                                         address = each_card.find_element_by_xpath('(.//div/div/div)[1]').text
#                                         contact = each_card.find_element_by_xpath(
#                                             '(.//div/div/div/a)[1]').get_attribute(
#                                             'href')
#                                         online_registration = each_card.find_element_by_xpath(
#                                             '(.//div/div/div/a)[2]').get_attribute(
#                                             'href')
#                                         total_beds = each_card.find_element_by_xpath(
#                                             '(.//div/div/div/div/ul/li/h3)[7]').text
#                                         available_beds = each_card.find_element_by_xpath(
#                                             '(.//div/div/div/div/ul/li/h3)[8]').text
#                                         last_updated = each_card.find_element_by_xpath('.//div/small').text
#                                         location = generate_geolocation(f'{hospital}, {district}')
#                                         lat = location['results'][0]['geometry']['location']['lat']
#                                         lng = location['results'][0]['geometry']['location']['lng']
#                                         pvt = {'hospital': hospital, 'address': address, 'total_beds': total_beds,
#                                                'available_beds': available_beds, 'contact': contact,
#                                                'online_registration': online_registration,
#                                                'last_updated': last_updated, 'lat': lat, 'lng': lng}
#                                         districts[district]['pvt'].append(pvt)
#                         else:
#                             hospital_cards_list = driver.find_elements_by_xpath(".//table/tbody/tr/td/div")
#                             time.sleep(6)
#                             if len(hospital_cards_list) > 0:
#                                 for each_card in driver.find_elements_by_xpath(".//table/tbody/tr/td/div"):
#                                     time.sleep(6)
#                                     hospital = str(each_card.find_element_by_xpath('.//div/h5').text).replace(
#                                         '(Private Hospital (Self Run))', '')
#                                     address = each_card.find_element_by_xpath('(.//div/div/div)[1]').text
#                                     contact = each_card.find_element_by_xpath('(.//div/div/div/a)[1]').get_attribute(
#                                         'href')
#                                     online_registration = each_card.find_element_by_xpath(
#                                         '(.//div/div/div/a)[2]').get_attribute(
#                                         'href')
#                                     total_beds = each_card.find_element_by_xpath(
#                                         '(.//div/div/div/div/ul/li/h3)[7]').text
#                                     available_beds = each_card.find_element_by_xpath(
#                                         '(.//div/div/div/div/ul/li/h3)[8]').text
#                                     last_updated = each_card.find_element_by_xpath('.//div/small').text
#                                     location = generate_geolocation(f'{hospital}, {district}')
#                                     lat = location['results'][0]['geometry']['location']['lat']
#                                     lng = location['results'][0]['geometry']['location']['lng']
#                                     pvt = {'hospital': hospital, 'address': address, 'total_beds': total_beds,
#                                            'available_beds': available_beds, 'contact': contact,
#                                            'online_registration': online_registration,
#                                            'last_updated': last_updated, 'lat': lat, 'lng': lng}
#                                     districts[district]['pvt'].append(pvt)
#                     break
#     print('Data captured - Hospitals')
#     driver.close()
#     driver.quit()
#     return districts
#
#
# def get_daily_safe_home_data():
#     # setup
#     driver = webdriver.Chrome('chromedriver.exe')
#     driver.maximize_window()
#     driver.get("https://excise.wb.gov.in/chms/Public/Page/CHMS_Public_Safe_Home_Bed_Availability.aspx")
#     # create list of district names
#     districts_list = []
#     time.sleep(30)
#     # get district dropdown
#     selects = driver.find_element_by_xpath(".//select[@class='form-control']")
#     # get district dropdown options
#     for element in selects.find_elements_by_tag_name("option"):
#         if element.text != "--Select--":
#             districts_list.append(element.text)
#     # create a dict from list of district names
#     districts = dict.fromkeys(districts_list)
#     for keys in districts.keys():
#         districts[keys] = {'data': []}
#     # show only safe homes with available beds
#     driver.find_element_by_xpath('(.//span[@class="ListControl"])[1]/parent::div').click()
#     time.sleep(2)
#     # get data
#     for district in districts_list:
#         time.sleep(5)
#         selects = driver.find_element_by_xpath(".//select[@class='form-control']")
#         for item in selects.find_elements_by_tag_name("option"):
#             time.sleep(2)
#             if item.get_attribute("value") != "--Select--":
#                 if district == item.text:
#                     item.click()
#                     time.sleep(2)
#                     hospital_cards_list = driver.find_elements_by_xpath(".//table/tbody/tr/td/div")
#                     time.sleep(6)
#                     if len(hospital_cards_list) > 0:
#                         for each_card in driver.find_elements_by_xpath(".//table/tbody/tr/td/div"):
#                             time.sleep(6)
#                             hospital = str(each_card.find_element_by_xpath('.//div/h5').text).replace(
#                                 '(Safe Home)', '')
#                             address = each_card.find_element_by_xpath('(.//div/div/div)[1]').text
#                             contact = each_card.find_element_by_xpath('(.//div/div/div/a)[1]').get_attribute(
#                                 'href')
#                             online_registration = each_card.find_element_by_xpath(
#                                 '(.//div/div/div/a)[2]').get_attribute(
#                                 'href')
#                             total_beds = each_card.find_element_by_xpath(
#                                 '(.//div/div/div/div/ul/li/h3)[7]').text
#                             available_beds = each_card.find_element_by_xpath(
#                                 '(.//div/div/div/div/ul/li/h3)[8]').text
#                             last_updated = each_card.find_element_by_xpath('.//div/small').text
#                             location = generate_geolocation(f'{hospital}, {district}')
#                             lat = location['results'][0]['geometry']['location']['lat']
#                             lng = location['results'][0]['geometry']['location']['lng']
#                             data = {'hospital': hospital, 'address': address, 'total_beds': total_beds,
#                                     'available_beds': available_beds, 'contact': contact,
#                                     'online_registration': online_registration,
#                                     'last_updated': last_updated, 'lat': lat, 'lng': lng}
#                             districts[district]['data'].append(data)
#                     break
#     print('Data captured - Safe Homes')
#     driver.close()
#     driver.quit()
#     return districts


import time
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def generate_geolocation(address):
    r = requests.get(
        f'https://maps.googleapis.com/maps/api/geocode/json?address={address}&key=AIzaSyAbXbGA2ISQnS26IYk-wsnp54EL-o9q4Vk')
    return r.json()


def wait_for_preloader(driver):
    if len(driver.find_elements_by_xpath(".//div[@id='preloader']")) > 0:
        WebDriverWait(driver, 60).until(EC.invisibility_of_element_located((By.XPATH, ".//div[@id='preloader']")))


def wait_for_spinner(driver):
    if len(driver.find_elements_by_xpath(
            ".//div[@class='spinner-border']/parent::div/parent::div[@aria-hidden='false']")) > 0:
        WebDriverWait(driver, 60).until(EC.invisibility_of_element_located(
            (By.XPATH, ".//div[@class='spinner-border']/parent::div/parent::div[@aria-hidden='false']"))
        )


def get_daily_hospital_data():
    # setup
    driver = webdriver.Chrome('chromedriver.exe')
    driver.maximize_window()
    driver.get("https://excise.wb.gov.in/chms/Public/Page/CHMS_Public_Hospital_Bed_Availability.aspx")
    time.sleep(2)
    wait_for_preloader(driver)
    # create list of district names
    districts_list = []
    # get district dropdown
    selects = driver.find_element_by_xpath(".//select[@class='form-control']")
    # get district dropdown options
    for element in selects.find_elements_by_tag_name("option"):
        if element.text != "--Select--":
            districts_list.append(element.text)
    # create a dict from list of district names
    districts = dict.fromkeys(districts_list)
    for keys in districts.keys():
        districts[keys] = {'govt': [], 'pvt': [], 'requisitioned': []}
    # show only hospitals with available beds
    driver.find_element_by_xpath('(.//span[@class="ListControl"])[2]/parent::div').click()
    # get hospital data
    for district in districts_list:
        selects = driver.find_element_by_xpath(".//select[@class='form-control']")
        for item in selects.find_elements_by_tag_name("option"):
            if item.get_attribute("value") != "--Select--":
                if district == item.text:
                    item.click()
                    time.sleep(1)
                    wait_for_spinner(driver)
                    # select government hospitals
                    driver.find_element_by_xpath('(.//label)[1]').click()
                    time.sleep(1)
                    wait_for_spinner(driver)
                    hospital_cards_list = driver.find_elements_by_xpath(".//table/tbody/tr/td/div")
                    if len(hospital_cards_list) > 0:
                        for each_card in driver.find_elements_by_xpath(".//table/tbody/tr/td/div"):
                            hospital = str(each_card.find_element_by_xpath('.//div/h5').text).replace(
                                '(Government Hospital)', '').replace('(Satellite Govt. Building)', '')
                            address = each_card.find_element_by_xpath('(.//div/div/div)[1]').text
                            contact = each_card.find_element_by_xpath('(.//div/div/div/a)[1]').get_attribute(
                                'href')
                            online_registration = each_card.find_element_by_xpath(
                                '(.//div/div/div/a)[2]').get_attribute(
                                'href')
                            total_beds = each_card.find_element_by_xpath(
                                '(.//div/div/div/div/ul/li/h3)[7]').text
                            available_beds = each_card.find_element_by_xpath(
                                '(.//div/div/div/div/ul/li/h3)[8]').text
                            last_updated = each_card.find_element_by_xpath('.//div/small').text
                            location = generate_geolocation(f'{hospital}, {district}')
                            lat = location['results'][0]['geometry']['location']['lat']
                            lng = location['results'][0]['geometry']['location']['lng']
                            govt = {'hospital': hospital, 'address': address, 'total_beds': total_beds,
                                    'available_beds': available_beds, 'contact': contact,
                                    'online_registration': online_registration,
                                    'last_updated': last_updated, 'lat': lat, 'lng': lng}
                            districts[district]['govt'].append(govt)
                    time.sleep(1)
                    wait_for_spinner(driver)
                    # select requisitioned hospitals
                    driver.find_element_by_xpath('(.//label)[2]').click()
                    time.sleep(1)
                    wait_for_spinner(driver)
                    if len(driver.find_elements_by_tag_name('table')) > 0:
                        hospital_cards_list = driver.find_elements_by_xpath(".//table/tbody/tr/td/div")
                        if len(hospital_cards_list) > 0:
                            for each_card in driver.find_elements_by_xpath(".//table/tbody/tr/td/div"):
                                hospital = str(each_card.find_element_by_xpath('.//div/h5').text).replace(
                                    '(Govt. Requisitioned Pvt. Hospital)', '')
                                address = each_card.find_element_by_xpath('(.//div/div/div)[1]').text
                                contact = each_card.find_element_by_xpath('(.//div/div/div/a)[1]').get_attribute(
                                    'href')
                                online_registration = each_card.find_element_by_xpath(
                                    '(.//div/div/div/a)[2]').get_attribute(
                                    'href')
                                total_beds = each_card.find_element_by_xpath(
                                    '(.//div/div/div/div/ul/li/h3)[7]').text
                                available_beds = each_card.find_element_by_xpath(
                                    '(.//div/div/div/div/ul/li/h3)[8]').text
                                last_updated = each_card.find_element_by_xpath('.//div/small').text
                                location = generate_geolocation(f'{hospital}, {district}')
                                lat = location['results'][0]['geometry']['location']['lat']
                                lng = location['results'][0]['geometry']['location']['lng']
                                requisitioned = {'hospital': hospital, 'address': address, 'total_beds': total_beds,
                                                 'available_beds': available_beds, 'contact': contact,
                                                 'online_registration': online_registration,
                                                 'last_updated': last_updated, 'lat': lat, 'lng': lng}
                                districts[district]['requisitioned'].append(requisitioned)
                    time.sleep(1)
                    wait_for_spinner(driver)
                    # select private hospitals
                    driver.find_element_by_xpath('(.//label)[3]').click()
                    time.sleep(1)
                    wait_for_spinner(driver)
                    if len(driver.find_elements_by_tag_name('table')) > 0:
                        if len(driver.find_elements_by_xpath(
                                "(.//tr[@class='pagination-ys']/td/table/tbody/tr)[1]/td")) > 0:
                            for page in range(len(driver.find_elements_by_xpath(
                                    "(.//tr[@class='pagination-ys']/td/table/tbody/tr)[1]/td"))):
                                if driver.find_elements_by_xpath(
                                        "(.//tr[@class='pagination-ys']/td/table/tbody/tr)[1]/td")[page].text != '1':
                                    driver.find_elements_by_xpath(
                                        "(.//tr[@class='pagination-ys']/td/table/tbody/tr)[1]/td")[
                                        page].find_element_by_xpath('.//a').click()
                                    time.sleep(1)
                                    wait_for_spinner(driver)
                                if len(driver.find_elements_by_xpath(".//table/tbody/tr/td/div")) > 0:
                                    for each_card in driver.find_elements_by_xpath(".//table/tbody/tr/td/div"):
                                        hospital = str(each_card.find_element_by_xpath('.//div/h5').text).replace(
                                            '(Private Hospital (Self Run))', '').replace('(Satellite Hotel)',
                                                                                         '').replace(
                                            '(Satellite Pvt. Building)', '')
                                        address = each_card.find_element_by_xpath('(.//div/div/div)[1]').text
                                        contact = each_card.find_element_by_xpath(
                                            '(.//div/div/div/a)[1]').get_attribute(
                                            'href')
                                        online_registration = each_card.find_element_by_xpath(
                                            '(.//div/div/div/a)[2]').get_attribute(
                                            'href')
                                        total_beds = each_card.find_element_by_xpath(
                                            '(.//div/div/div/div/ul/li/h3)[7]').text
                                        available_beds = each_card.find_element_by_xpath(
                                            '(.//div/div/div/div/ul/li/h3)[8]').text
                                        last_updated = each_card.find_element_by_xpath('.//div/small').text
                                        location = generate_geolocation(f'{hospital}, {district}')
                                        lat = location['results'][0]['geometry']['location']['lat']
                                        lng = location['results'][0]['geometry']['location']['lng']
                                        pvt = {'hospital': hospital, 'address': address, 'total_beds': total_beds,
                                               'available_beds': available_beds, 'contact': contact,
                                               'online_registration': online_registration,
                                               'last_updated': last_updated, 'lat': lat, 'lng': lng}
                                        districts[district]['pvt'].append(pvt)
                        else:
                            hospital_cards_list = driver.find_elements_by_xpath(".//table/tbody/tr/td/div")
                            if len(hospital_cards_list) > 0:
                                for each_card in driver.find_elements_by_xpath(".//table/tbody/tr/td/div"):
                                    hospital = str(each_card.find_element_by_xpath('.//div/h5').text).replace(
                                        '(Private Hospital (Self Run))', '')
                                    address = each_card.find_element_by_xpath('(.//div/div/div)[1]').text
                                    contact = each_card.find_element_by_xpath('(.//div/div/div/a)[1]').get_attribute(
                                        'href')
                                    online_registration = each_card.find_element_by_xpath(
                                        '(.//div/div/div/a)[2]').get_attribute(
                                        'href')
                                    total_beds = each_card.find_element_by_xpath(
                                        '(.//div/div/div/div/ul/li/h3)[7]').text
                                    available_beds = each_card.find_element_by_xpath(
                                        '(.//div/div/div/div/ul/li/h3)[8]').text
                                    last_updated = each_card.find_element_by_xpath('.//div/small').text
                                    location = generate_geolocation(f'{hospital}, {district}')
                                    lat = location['results'][0]['geometry']['location']['lat']
                                    lng = location['results'][0]['geometry']['location']['lng']
                                    pvt = {'hospital': hospital, 'address': address, 'total_beds': total_beds,
                                           'available_beds': available_beds, 'contact': contact,
                                           'online_registration': online_registration,
                                           'last_updated': last_updated, 'lat': lat, 'lng': lng}
                                    districts[district]['pvt'].append(pvt)
                    print(f'Hospitals data captured for district {district}')
                    break
    print(f'Hospitals data captured for all districts')
    driver.close()
    driver.quit()
    return districts


def get_daily_safe_home_data():
    # setup
    driver = webdriver.Chrome('chromedriver.exe')
    driver.maximize_window()
    driver.get("https://excise.wb.gov.in/chms/Public/Page/CHMS_Public_Safe_Home_Bed_Availability.aspx")
    time.sleep(2)
    wait_for_preloader(driver)
    # create list of district names
    districts_list = []
    # get district dropdown
    selects = driver.find_element_by_xpath(".//select[@class='form-control']")
    # get district dropdown options
    for element in selects.find_elements_by_tag_name("option"):
        if element.text != "--Select--":
            districts_list.append(element.text)
    # create a dict from list of district names
    districts = dict.fromkeys(districts_list)
    for keys in districts.keys():
        districts[keys] = {'data': []}
    # show only safe homes with available beds
    driver.find_element_by_xpath('(.//span[@class="ListControl"])[1]/parent::div').click()
    time.sleep(1)
    wait_for_spinner(driver)
    # get data
    for district in districts_list:
        selects = driver.find_element_by_xpath(".//select[@class='form-control']")
        for item in selects.find_elements_by_tag_name("option"):
            time.sleep(1)
            if item.get_attribute("value") != "--Select--":
                if district == item.text:
                    item.click()
                    time.sleep(1)
                    wait_for_spinner(driver)
                    hospital_cards_list = driver.find_elements_by_xpath(".//table/tbody/tr/td/div")
                    if len(hospital_cards_list) > 0:
                        for each_card in driver.find_elements_by_xpath(".//table/tbody/tr/td/div"):
                            hospital = str(each_card.find_element_by_xpath('.//div/h5').text).replace(
                                '(Safe Home)', '')
                            address = each_card.find_element_by_xpath('(.//div/div/div)[1]').text
                            contact = each_card.find_element_by_xpath('(.//div/div/div/a)[1]').get_attribute(
                                'href')
                            online_registration = each_card.find_element_by_xpath(
                                '(.//div/div/div/a)[2]').get_attribute(
                                'href')
                            total_beds = each_card.find_element_by_xpath(
                                '(.//div/div/div/div/ul/li/h3)[7]').text
                            available_beds = each_card.find_element_by_xpath(
                                '(.//div/div/div/div/ul/li/h3)[8]').text
                            last_updated = each_card.find_element_by_xpath('.//div/small').text
                            location = generate_geolocation(f'{hospital}, {district}')
                            lat = location['results'][0]['geometry']['location']['lat']
                            lng = location['results'][0]['geometry']['location']['lng']
                            data = {'hospital': hospital, 'address': address, 'total_beds': total_beds,
                                    'available_beds': available_beds, 'contact': contact,
                                    'online_registration': online_registration,
                                    'last_updated': last_updated, 'lat': lat, 'lng': lng}
                            districts[district]['data'].append(data)
                    print(f'Safe Homes data captured for district {district}')
                    break
    print('Safe Homes data captured for all districts')
    driver.close()
    driver.quit()
    return districts
