from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import bs4 as bs
import urllib2
import re


def getStats(GGname):
    GGescapedUrl='https://groups.google.com/forum/?_escaped_fragment_=forum/' + GGname

    driver = webdriver.Firefox()
    driver.get('https://groups.google.com/forum/#!aboutgroup/' + GGname)
    #try:
    element = WebDriverWait(driver, 15).until(
        EC.visibility_of_element_located((By.CLASS_NAME, "F0XO1GC-b-Jb"))
    )

    elem = driver.find_elements_by_tag_name("div")
    divtext = elem[113].text
    GGmembers = int(divtext.split()[110])
    driver.close()

    req = urllib2.Request(GGescapedUrl, headers={ 'User-Agent': 'Mozilla/5.0' })
    source = urllib2.urlopen(req).read()
    soup = bs.BeautifulSoup(source,'lxml')

    GGthreads = int(re.findall('.*?1-21 de (.*?) temas.*?', str(soup))[0])

    GGarray = [GGmembers, GGthreads]
    return GGarray
