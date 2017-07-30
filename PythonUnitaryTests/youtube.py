import bs4 as bs
import urllib2

YTurl = 'https://www.youtube.com/user/ALM37454/about'

req = urllib2.Request(YTurl, headers={ 'User-Agent': 'Mozilla/5.0' })
source = urllib2.urlopen(req).read()
soup = bs.BeautifulSoup(source,'lxml')

YTstats = soup.findAll("span", {'class':'about-stat'})
YTsuscriptors = int(YTstats[0].b.text.replace(".",""))
YTviews = int(YTstats[1].b.text.replace(".",""))

print 'Total suscriptors: ' + str(YTsuscriptors)
print 'Total views: ' + str(YTviews)
