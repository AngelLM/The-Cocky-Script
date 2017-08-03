#from selenium import webdriver
#from selenium.webdriver.common.keys import Keys

#driver = webdriver.Firefox()
#driver.get("https://groups.google.com/forum/#!aboutgroup/thor-opensource-3d-printable-robotic-arm")
#driver.implicitly_wait(10) # seconds

#assert "Thor" in driver.title
#elem = driver.find_elements_by_tag_name("div")
#for i in range (0, len(elem)):
#    print elem[i].text

#driver.close()

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Firefox()
driver.get("https://groups.google.com/forum/#!aboutgroup/thor-opensource-3d-printable-robotic-arm")
#try:
element = WebDriverWait(driver, 10).until(
    EC.visibility_of_element_located((By.CLASS_NAME, "F0XO1GC-b-Jb"))
)

elem = driver.find_elements_by_tag_name("div")
print elem[113].text
#for i in range (0, len(elem)):
#    if "Miembros" in elem[i].text:
#        print i
#        driver.close()

driver.close()




#finally:
#    driver.quit()
