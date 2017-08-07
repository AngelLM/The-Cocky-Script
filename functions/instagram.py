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

    IGTopStats = driver.find_elements_by_class_name("_s53mj")
    IGTotalUploads = int((IGTopStats[0].text.split())[0])
    IGTotalFollowers = int((IGTopStats[1].text.split())[0])

    NowPublicationsRows = driver.find_elements_by_class_name("_myci9")
    button = driver.find_element_by_class_name("_8imhp")
    button.click()

    while len(driver.find_elements_by_class_name("_myci9")) < math.ceil(IGTotalUploads/3.0):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    photos = driver.find_elements_by_class_name("_8mlbc")

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
