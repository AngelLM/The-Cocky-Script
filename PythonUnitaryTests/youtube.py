import bs4 as bs
import urllib2

YTurl = 'https://www.youtube.com/user/ALM37454'
preurl = 'https://www.youtube.com'
urlList = []
YTlikes = 0
YTdislikes =0

req = urllib2.Request(YTurl + '/about', headers={ 'User-Agent': 'Mozilla/5.0' })
source = urllib2.urlopen(req).read()
soup = bs.BeautifulSoup(source,'lxml')

YTstats = soup.findAll("span", {'class':'about-stat'})
YTsuscriptors = int(YTstats[0].b.text.replace(".",""))
YTviews = int(YTstats[1].b.text.replace(".",""))


req2 = urllib2.Request(YTurl + '/videos?live_view=500&flow=list&sort=dd&view=0', headers={ 'User-Agent': 'Mozilla/5.0' })
source2= urllib2.urlopen(req2).read()
soup2 = bs.BeautifulSoup(source2,'lxml')

for url in soup2.find_all('a', {'class':'yt-uix-tile-link'}):
    urlList.append(url.get('href'))

for i in range(len(urlList)):
    newUrl = preurl + urlList[i]
    req3 = urllib2.Request(newUrl, headers={ 'User-Agent': 'Mozilla/5.0' })
    source3= urllib2.urlopen(req3).read()
    soup3 = bs.BeautifulSoup(source3,'lxml')

    likessection = soup3.findAll('span', {'class':'like-button-renderer'})[0]
    likestats = likessection.findAll("span", {'class':'yt-uix-button-content'})
    YTlikes += int(likestats[0].text)
    YTdislikes += int(likestats[3].text)


print 'Total suscriptors: ' + str(YTsuscriptors)
print 'Total views: ' + str(YTviews)
print 'Total likes: ' + str(YTlikes)
print 'Total dislikes: ' + str(YTdislikes)
