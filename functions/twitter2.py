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

def getStats(TWuser):
    TWurl = 'https://twitter.com/' + TWuser
    TWlikes = 0
    TWretweets = 0
    TWcomments = 0

    driver = webdriver.Firefox()
    driver.get(TWurl)

    TWname = driver.find_element_by_class_name('ProfileHeaderCard-nameLink').text
    TWfollowers = int (driver.find_elements_by_class_name('ProfileNav-value')[2].get_attribute('data-count'))

    tweets = driver.find_elements_by_class_name('tweet')
    validTweets = []
    for t in tweets:
         if t.get_attribute('data-name')==TWname:
             validTweets.append(t)
    for vt in validTweets:
        counter = vt.find_elements_by_class_name('ProfileTweet-actionCountForPresentation')
        if counter[0].text!='':
            TWcomments += int(counter[0].text)
        if counter[1].text!='':
            TWretweets += int(counter[1].text)
        if counter[3].text!='':
            TWlikes += int(counter[3].text)

    driver.close()

    print TWfollowers
    print TWlikes
    print TWretweets
    print TWcomments

    TWarray = [TWfollowers, TWlikes, TWretweets, TWcomments]
    return TWarray 
