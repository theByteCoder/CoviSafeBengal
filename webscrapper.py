import time
from selenium import webdriver

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
    districts[keys] = {'govt': [], 'pvt': [], 'requisitioned': []}
# show only hospitals with available beds
driver.find_element_by_xpath('(.//span[@class="ListControl"])[2]').click()
time.sleep(2)


# Government data
def government_data(browser):
    # get hospital data
    for district in districts_list:
        time.sleep(5)
        selects = browser.find_element_by_xpath(".//select[@class='form-control']")
        for item in [x for x in selects.find_elements_by_tag_name("option")]:
            time.sleep(2)
            if item.get_attribute("value") != "--Select--":
                if district == item.text:
                    item.click()
                    time.sleep(2)
                    hospital_cards_list = browser.find_elements_by_xpath(".//table/tbody/tr/td/div")
                    time.sleep(6)
                    if len(hospital_cards_list) > 0:
                        for each_card in browser.find_elements_by_xpath(".//table/tbody/tr/td/div"):
                            hospital = str(each_card.find_element_by_xpath('.//div/h5').text).replace(
                                '(Government Hospital)', '').replace('(Satellite Govt. Building)', '')
                            address = each_card.find_element_by_xpath('(.//div/div/div)[1]').text
                            contact = each_card.find_element_by_xpath('(.//div/div/div/a)[1]').get_attribute('href')
                            online_registration = each_card.find_element_by_xpath(
                                '(.//div/div/div/a)[2]').get_attribute(
                                'href')
                            total_beds = each_card.find_element_by_xpath('(.//div/div/div/div/ul/li/h3)[7]').text
                            available_beds = each_card.find_element_by_xpath('(.//div/div/div/div/ul/li/h3)[8]').text
                            last_updated = each_card.find_element_by_xpath('.//div/small').text
                            govt = {'hospital': hospital, 'address': address, 'total_beds': total_beds,
                                    'available_beds': available_beds, 'contact': contact,
                                    'online_registration': online_registration, 'last_updated': last_updated}
                            districts[district]['govt'].append(govt)
                        break


# Requisitioned data
def requisitioned_data(browser):
    # select requisitioned hospitals
    browser.find_element_by_xpath('(.//label)[2]').click()
    # get hospital data
    for district in districts_list:
        time.sleep(5)
        selects = browser.find_element_by_xpath(".//select[@class='form-control']")
        for item in selects.find_elements_by_tag_name("option"):
            if district == item.text:
                item.click()
                time.sleep(2)
                if len(browser.find_elements_by_tag_name('table')) > 0:
                    hospital_cards_list = browser.find_elements_by_xpath(".//table/tbody/tr/td/div")
                    time.sleep(6)
                    if len(hospital_cards_list) > 0:
                        for each_card in browser.find_elements_by_xpath(".//table/tbody/tr/td/div"):
                            hospital = str(each_card.find_element_by_xpath('.//div/h5').text).replace(
                                '(Govt. Requisitioned Pvt. Hospital)', '')
                            address = each_card.find_element_by_xpath('(.//div/div/div)[1]').text
                            contact = each_card.find_element_by_xpath('(.//div/div/div/a)[1]').get_attribute('href')
                            online_registration = each_card.find_element_by_xpath(
                                '(.//div/div/div/a)[2]').get_attribute(
                                'href')
                            total_beds = each_card.find_element_by_xpath('(.//div/div/div/div/ul/li/h3)[7]').text
                            available_beds = each_card.find_element_by_xpath(
                                '(.//div/div/div/div/ul/li/h3)[8]').text
                            last_updated = each_card.find_element_by_xpath('.//div/small').text
                            requisitioned = {'hospital': hospital, 'address': address, 'total_beds': total_beds,
                                             'available_beds': available_beds, 'contact': contact,
                                             'online_registration': online_registration,
                                             'last_updated': last_updated}
                            districts[district]['requisitioned'].append(requisitioned)
                break


# Private data
def private_data(browser):
    # select requisitioned hospitals
    browser.find_element_by_xpath('(.//label)[3]').click()
    # get hospital data
    for district in districts_list:
        time.sleep(5)
        selects = browser.find_element_by_xpath(".//select[@class='form-control']")
        for item in selects.find_elements_by_tag_name("option"):
            if district == item.text:
                item.click()
                time.sleep(2)
                if len(browser.find_elements_by_tag_name('table')) > 0:
                    if len(browser.find_elements_by_xpath(
                            "(.//tr[@class='pagination-ys']/td/table/tbody/tr)[1]/td")) > 0:
                        for page in range(len(browser.find_elements_by_xpath(
                                "(.//tr[@class='pagination-ys']/td/table/tbody/tr)[1]/td"))):
                            time.sleep(2)
                            if browser.find_elements_by_xpath(
                                    "(.//tr[@class='pagination-ys']/td/table/tbody/tr)[1]/td")[page].text != '1':
                                browser.find_elements_by_xpath(
                                    "(.//tr[@class='pagination-ys']/td/table/tbody/tr)[1]/td")[
                                    page].find_element_by_tag_name('a').click()
                            hospital_cards_list = browser.find_elements_by_xpath(".//table/tbody/tr/td/div")
                            time.sleep(6)
                            if len(hospital_cards_list) > 0:
                                for each_card in browser.find_elements_by_xpath(".//table/tbody/tr/td/div"):
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
                                    pvt = {'hospital': hospital, 'address': address, 'total_beds': total_beds,
                                           'available_beds': available_beds, 'contact': contact,
                                           'online_registration': online_registration,
                                           'last_updated': last_updated}
                                    districts[district]['pvt'].append(pvt)
                    else:
                        hospital_cards_list = browser.find_elements_by_xpath(".//table/tbody/tr/td/div")
                        time.sleep(6)
                        if len(hospital_cards_list) > 0:
                            for each_card in browser.find_elements_by_xpath(".//table/tbody/tr/td/div"):
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
                                pvt = {'hospital': hospital, 'address': address, 'total_beds': total_beds,
                                       'available_beds': available_beds, 'contact': contact,
                                       'online_registration': online_registration,
                                       'last_updated': last_updated}
                                districts[district]['pvt'].append(pvt)
                break


government_data(driver)
time.sleep(2)
requisitioned_data(driver)
time.sleep(2)
private_data(driver)
print(districts)
driver.close()
driver.quit()
