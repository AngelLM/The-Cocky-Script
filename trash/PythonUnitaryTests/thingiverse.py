import bs4 as bs
import urllib2
import math

firstTVurl = 'https://www.thingiverse.com/AngelLM/designs/'
preurl = 'https://www.thingiverse.com'
urlList=[]
TVviews=0
TVcomments=0
TVdownloads=0
TVlikes=0
TVcollects=0
TVmakes=0
TVremixes=0

req = urllib2.Request(firstTVurl, headers={ 'User-Agent': 'Mozilla/5.0' })
source = urllib2.urlopen(req).read()
soup = bs.BeautifulSoup(source,'lxml')

TVdesigns = float(soup.findAll("span", {'class':'box-count'})[2].text)
TVdesignspages = int(math.ceil(TVdesigns/12))

for i in range(TVdesignspages):
    secondTVurl = firstTVurl+'page:'+str(i+1)
    req2 = urllib2.Request(secondTVurl, headers={ 'User-Agent': 'Mozilla/5.0' })
    source2 = urllib2.urlopen(req2).read()
    soup2 = bs.BeautifulSoup(source2,'lxml')

    for url in soup2.find_all('a', {'class':'thing-img-wrapper'}):
        urlList.append(url.get('href'))

for i in range(len(urlList)):
    thirdTVurl = preurl + urlList[i]
    req3 = urllib2.Request(thirdTVurl, headers={ 'User-Agent': 'Mozilla/5.0' })
    source3 = urllib2.urlopen(req3).read()
    soup3 = bs.BeautifulSoup(source3,'lxml')
    TVstats = soup3.findAll("span", {'class':'interaction-count'})
    TVlikes += int(TVstats[0].text)
    TVcollects += int(TVstats[1].text)
    TVcomments += int(TVstats[2].text)
    TVmakes += int(TVstats[3].text)
    TVremixes += int(TVstats[8].text)
    TVviews += int(TVstats[9].text)
    TVdownloads += int(TVstats[11].text)

print 'Total views: ' + str(TVviews)
print 'Total downloads: ' + str(TVdownloads)
print 'Total likes: ' + str(TVlikes)
print 'Total collects: ' + str(TVcollects)
print 'Total makes: ' + str(TVmakes)
print 'Total remixes: ' + str(TVremixes)
print 'Total comments: ' + str(TVcomments)
