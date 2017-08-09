from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import time
import math
import bs4 as bs
import urllib2
import re

def getStats(IGuser):
    IGurl='https://www.instagram.com/' + IGuser
    IGurls=[]
    IGreproductions = 0
    IGcomments = 0
    IGlikes = 0


    driver = webdriver.Firefox()
    driver.get(IGurl)

    IGTags = driver.find_elements_by_tag_name("span")
    IGTotalUploads = int(IGTags[3].text)
    IGTotalFollowers = int(IGTags[5].text)

    if IGTotalUploads > 12:
        FindButton = driver.find_elements_by_tag_name("a")
        for but in FindButton:
            if "?max_id" in but.get_attribute("href"):
                button = but
        button.click()

    urls = driver.find_elements_by_tag_name("a")
    for i in urls:
        if "?taken-by" in i.get_attribute("href"):
            parent1=i.find_element_by_xpath('..')
            parent2=parent1.find_element_by_xpath('..')
            classPhoto = parent1.get_attribute("class").split()[0]
            print classPhoto
            classRow = parent2.get_attribute("class")
            break

    while len(driver.find_elements_by_class_name(classRow)) < math.ceil(IGTotalUploads/3.0):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    photos = driver.find_elements_by_class_name(classPhoto)

    for f in photos:
         IGurls.append(f.find_element_by_tag_name("a").get_attribute("href"))

    driver.close()

    for url in IGurls:
        req = urllib2.Request(url, headers={ 'User-Agent': 'Mozilla/5.0' })
        source = urllib2.urlopen(req).read()
        soup = bs.BeautifulSoup(source,'lxml')

        stats = re.findall('.*?count\":(.*?),.*?', str(soup))
        if len(stats) == 3:
            IGreproductions += int(stats[0])
            IGcomments += int(stats[1])
            IGlikes += int(stats[2])
        else:
            IGcomments += int(stats[0])
            IGlikes += int(stats[1])

    IGarray = [IGTotalFollowers, IGlikes, IGreproductions, IGcomments]
    return IGarray;
