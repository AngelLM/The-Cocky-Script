from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def getStats():
    driver = webdriver.Firefox()
    driver.get("https://groups.google.com/forum/#!aboutgroup/thor-opensource-3d-printable-robotic-arm")
    #try:
    element = WebDriverWait(driver, 15).until(
        EC.visibility_of_element_located((By.CLASS_NAME, "F0XO1GC-b-Jb"))
    )

    elem = driver.find_elements_by_tag_name("div")
    divtext = elem[113].text
    GGmembers = int(divtext.split()[110])
    driver.close()
    return GGmembers
