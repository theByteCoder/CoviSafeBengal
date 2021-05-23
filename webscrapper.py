import time
from selenium import webdriver


def type_data(each_card):
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
    return {"hospital": hospital, "address": address, "total_beds": total_beds,
            "available_beds": available_beds, "contact": contact,
            "online_registration": online_registration,
            "last_updated": last_updated}


def private_data(driver, districts, district):
    # get private hospitals data
    # select private hospitals
    driver.find_element_by_xpath('(.//label)[3]').click()
    if len(driver.find_elements_by_tag_name('table')) > 0:
        if len(driver.find_elements_by_xpath(
                "(.//tr[@class='pagination-ys']/td/table/tbody/tr)[1]/td")) > 0:
            for page in range(len(driver.find_elements_by_xpath(
                    "(.//tr[@class='pagination-ys']/td/table/tbody/tr)[1]/td"))):
                time.sleep(2)
                if driver.find_elements_by_xpath(
                        "(.//tr[@class='pagination-ys']/td/table/tbody/tr)[1]/td")[page].text != '1':
                    driver.find_elements_by_xpath(
                        "(.//tr[@class='pagination-ys']/td/table/tbody/tr)[1]/td")[
                        page].find_element_by_tag_name('a').click()
                hospital_cards_list = driver.find_elements_by_xpath(".//table/tbody/tr/td/div")
                time.sleep(6)
                if len(hospital_cards_list) > 0:
                    for each_card in driver.find_elements_by_xpath(".//table/tbody/tr/td/div"):
                        pvt = type_data(each_card)
                        districts[district]["pvt"].append(pvt)
        else:
            hospital_cards_list = driver.find_elements_by_xpath(".//table/tbody/tr/td/div")
            time.sleep(6)
            if len(hospital_cards_list) > 0:
                for each_card in driver.find_elements_by_xpath(".//table/tbody/tr/td/div"):
                    pvt = type_data(each_card)
                    districts[district]["pvt"].append(pvt)
    print(f'Private hospital data captured for {district}')


def requisitioned_data(driver, districts, district):
    # get requisitioned hospitals data
    # select requisitioned hospitals
    driver.find_element_by_xpath('(.//label)[2]').click()
    if len(driver.find_elements_by_tag_name('table')) > 0:
        hospital_cards_list = driver.find_elements_by_xpath(".//table/tbody/tr/td/div")
        time.sleep(6)
        if len(hospital_cards_list) > 0:
            for each_card in driver.find_elements_by_xpath(".//table/tbody/tr/td/div"):
                requisitioned = type_data(each_card)
                districts[district]["requisitioned"].append(requisitioned)
    print(f'Requisitioned hospital data captured for {district}')


def government_data(driver, districts, district):
    # get hospital data
    # get government hospitals data
    # select government hospitals
    driver.find_element_by_xpath('(.//label)[1]').click()
    hospital_cards_list = driver.find_elements_by_xpath(".//table/tbody/tr/td/div")
    time.sleep(6)
    if len(hospital_cards_list) > 0:
        for each_card in driver.find_elements_by_xpath(".//table/tbody/tr/td/div"):
            govt = type_data(each_card)
            districts[district]["govt"].append(govt)
    print(f'Government hospital data captured for {district}')


# all data
def get_daily_data():
    # setup
    driver = webdriver.Chrome('chromedriver.exe')
    driver.maximize_window()
    driver.get("https://excise.wb.gov.in/chms/Public/Page/CHMS_Public_Hospital_Bed_Availability.aspx")
    # create list of district names
    districts_list = []
    # get district dropdown
    select_box = driver.find_element_by_xpath(".//select[@class='form-control']")
    # get district dropdown options
    options_list = [x for x in select_box.find_elements_by_tag_name("option")]
    for element in options_list:
        if element.text != "--Select--":
            districts_list.append(element.text)
    # create a dict from list of district names
    districts = dict.fromkeys(districts_list)
    for keys in districts.keys():
        districts[keys] = {"govt": [], "pvt": [], "requisitioned": []}
    # show only hospitals with available beds
    driver.find_element_by_xpath('(.//span[@class="ListControl"])[2]').click()
    time.sleep(2)
    # get hospital data
    for district in districts_list:
        time.sleep(5)
        selects = driver.find_element_by_xpath(".//select[@class='form-control']")
        for item in selects.find_elements_by_tag_name("option"):
            if district == item.text:
                item.click()
                time.sleep(2)
                government_data(driver, districts, district)
                time.sleep(2)
                requisitioned_data(driver, districts, district)
                time.sleep(2)
                private_data(driver, districts, district)
                break
    driver.close()
    driver.quit()
    return districts
