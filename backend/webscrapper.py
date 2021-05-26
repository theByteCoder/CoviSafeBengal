import time
import requests
from selenium import webdriver
from selenium.common.exceptions import ElementNotVisibleException, ElementNotSelectableException, \
    StaleElementReferenceException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

chrome_driver = 'chromedriver.exe'


def generate_geolocation(address):
    r = requests.get(
        f'https://maps.googleapis.com/maps/api/geocode/json?address={address}&key=AIzaSyAbXbGA2ISQnS26IYk-wsnp54EL-o9q4Vk')
    return r.json()


def wait_for_preloader(driver):
    if len(driver.find_elements_by_xpath(".//div[@id='preloader']")) > 0:
        WebDriverWait(driver, 60, poll_frequency=1,
                      ignored_exceptions=[ElementNotVisibleException, ElementNotSelectableException,
                                          StaleElementReferenceException]).until(
            EC.invisibility_of_element_located((By.XPATH, ".//div[@id='preloader']")))


def wait_for_spinner(driver):
    if len(driver.find_elements_by_xpath(
            ".//div[@class='spinner-border']/parent::div/parent::div[@aria-hidden='false']")) > 0:
        WebDriverWait(driver, 60, poll_frequency=1,
                      ignored_exceptions=[ElementNotVisibleException, ElementNotSelectableException,
                                          StaleElementReferenceException]).until(EC.invisibility_of_element_located(
            (By.XPATH, ".//div[@class='spinner-border']/parent::div/parent::div[@aria-hidden='false']"))
        )


def get_daily_hospital_data():
    # setup
    driver = webdriver.Chrome(chrome_driver)
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
                            time.sleep(1)
                            try:
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
                            except:
                                pass
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
                                time.sleep(1)
                                try:
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
                                except:
                                    pass
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
                                        time.sleep(1)
                                        try:
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
                                        except:
                                            pass
                        else:
                            hospital_cards_list = driver.find_elements_by_xpath(".//table/tbody/tr/td/div")
                            if len(hospital_cards_list) > 0:
                                for each_card in driver.find_elements_by_xpath(".//table/tbody/tr/td/div"):
                                    time.sleep(1)
                                    try:
                                        hospital = str(each_card.find_element_by_xpath('.//div/h5').text).replace(
                                            '(Private Hospital (Self Run))', '')
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
                                    except:
                                        pass
                    print(f'Hospitals data captured for district {district}')
                    break
    print(f'Hospitals data captured for all districts')
    driver.close()
    driver.quit()
    return districts


def get_daily_safe_home_data():
    # setup
    driver = webdriver.Chrome(chrome_driver)
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
                            time.sleep(1)
                            try:
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
                            except:
                                pass
                    print(f'Safe Homes data captured for district {district}')
                    break
    print('Safe Homes data captured for all districts')
    driver.close()
    driver.quit()
    return districts


def get_ambulance_location(ambulance, district):
    location = generate_geolocation(f'{ambulance}, {district}')
    if len(location['results']) == 0:
        location = generate_geolocation(f'{ambulance}, west bengal')
        if len(location['results']) == 0:
            location = generate_geolocation(f'{ambulance}')
            return location
        return location
    return location


def get_daily_ambulance_data():
    # setup
    driver = webdriver.Chrome(chrome_driver)
    driver.maximize_window()
    driver.get("https://excise.wb.gov.in/chms/Public/Page/CHMS_Public_MIS_Ambulance.aspx")
    time.sleep(2)
    wait_for_preloader(driver)
    # create list of district names
    districts_list = []
    # get district dropdown
    selects = driver.find_element_by_xpath("(.//select[@class='form-control'])[1]")
    # get district dropdown options
    for element in selects.find_elements_by_tag_name("option"):
        if element.text != "--Select--":
            districts_list.append(element.text)
    # create a dict from list of district names
    districts = dict.fromkeys(districts_list)
    for keys in districts.keys():
        districts[keys] = {'data': []}
    # show all with available ambulances
    driver.find_element_by_xpath('((.//span[@class="ListControl"])[1]/parent::div/span/label)[1]').click()
    time.sleep(1)
    wait_for_spinner(driver)
    # get data
    for district in districts_list:
        selects = driver.find_element_by_xpath("(.//select[@class='form-control'])[1]")
        for item in selects.find_elements_by_tag_name("option"):
            time.sleep(1)
            if item.get_attribute("value") != "--Select--":
                if district == item.text:
                    item.click()
                    time.sleep(1)
                    wait_for_spinner(driver)
                    ambulance_cards_list = driver.find_elements_by_xpath(".//table/tbody/tr/td/div")
                    time.sleep(1)
                    if len(ambulance_cards_list) > 0:
                        if len(driver.find_elements_by_xpath(
                                "(.//tr[@class='pagination-ys']/td/table/tbody/tr)[1]/td/a")) > 0:
                            for page in range(len(driver.find_elements_by_xpath(
                                    "(.//tr[@class='pagination-ys']/td/table/tbody/tr)[1]/td/a"))):
                                driver.find_elements_by_xpath(
                                    "(.//tr[@class='pagination-ys']/td/table/tbody/tr)[1]/td/a")[
                                    page].click()
                                time.sleep(1)
                                wait_for_spinner(driver)
                                for each_card in range(len(driver.find_elements_by_xpath(".//table/tbody/tr/td/div"))):
                                    time.sleep(1)
                                    try:
                                        ambulance = str(
                                            driver.find_elements_by_xpath(".//table/tbody/tr/td/div")[
                                                each_card].find_element_by_xpath(
                                                './/div/div/div/div/div/h5').text).replace(
                                            '(Safe Home)', '').rsplit(" ", 1)[0]
                                        ambulance_type = str(
                                            driver.find_elements_by_xpath(".//table/tbody/tr/td/div")[
                                                each_card].find_element_by_xpath('.//div/div/div/div/div/h5/span').text)
                                        address = driver.find_elements_by_xpath(".//table/tbody/tr/td/div")[
                                            each_card].find_element_by_xpath('.//div/div/div/div/div/span').text
                                        contact = driver.find_elements_by_xpath(".//table/tbody/tr/td/div")[
                                            each_card].find_element_by_xpath(
                                            './/div/div/div/p/a').get_attribute(
                                            'href')
                                        available_ambulances = \
                                            driver.find_elements_by_xpath(".//table/tbody/tr/td/div")[
                                                each_card].find_element_by_xpath(
                                                "div/div/div/div/div/div/div/h3[@class='text-success']").text
                                        location = get_ambulance_location(ambulance, district)
                                        lat = location['results'][0]['geometry']['location']['lat']
                                        lng = location['results'][0]['geometry']['location']['lng']
                                        data = {'ambulance': ambulance, 'ambulance_type': ambulance_type,
                                                'address': address,
                                                'available_ambulances': available_ambulances, 'contact': contact,
                                                'lat': lat, 'lng': lng}
                                        districts[district]['data'].append(data)
                                    except:
                                        pass
                        else:
                            ambulance_cards_list = driver.find_elements_by_xpath(".//table/tbody/tr/td/div")
                            time.sleep(1)
                            if len(ambulance_cards_list) > 0:
                                for each_card in range(len(driver.find_elements_by_xpath(".//table/tbody/tr/td/div"))):
                                    time.sleep(1)
                                    try:
                                        ambulance = str(
                                            driver.find_elements_by_xpath(".//table/tbody/tr/td/div")[
                                                each_card].find_element_by_xpath(
                                                './/div/div/div/div/div/h5').text).replace(
                                            '(Safe Home)', '').rsplit(" ", 1)[0]
                                        ambulance_type = str(
                                            driver.find_elements_by_xpath(".//table/tbody/tr/td/div")[
                                                each_card].find_element_by_xpath('.//div/div/div/div/div/h5/span').text)
                                        address = driver.find_elements_by_xpath(".//table/tbody/tr/td/div")[
                                            each_card].find_element_by_xpath('.//div/div/div/div/div/span').text
                                        contact = driver.find_elements_by_xpath(".//table/tbody/tr/td/div")[
                                            each_card].find_element_by_xpath(
                                            './/div/div/div/p/a').get_attribute(
                                            'href')
                                        available_ambulances = \
                                            driver.find_elements_by_xpath(".//table/tbody/tr/td/div")[
                                                each_card].find_element_by_xpath(
                                                "div/div/div/div/div/div/div/h3[@class='text-success']").text
                                        location = get_ambulance_location(ambulance, district)
                                        lat = location['results'][0]['geometry']['location']['lat']
                                        lng = location['results'][0]['geometry']['location']['lng']
                                        data = {'ambulance': ambulance, 'ambulance_type': ambulance_type,
                                                'address': address,
                                                'available_ambulances': available_ambulances, 'contact': contact,
                                                'lat': lat, 'lng': lng}
                                        districts[district]['data'].append(data)
                                    except:
                                        pass
                    print(f'Ambulances data captured for district {district}')
                    break
    print('Ambulances data captured for all districts')
    driver.close()
    driver.quit()
    return districts
