import bs4 as bs
import urllib2

def getStats():
    TWurl = 'https://twitter.com/_AngelLM'

    req = urllib2.Request(TWurl, headers={ 'User-Agent': 'Mozilla/5.0' })
    source = urllib2.urlopen(req).read()
    soup = bs.BeautifulSoup(source,'lxml')

    TWstats = soup.findAll("span", {'class':'ProfileNav-value'})
    TWfollowers = int(TWstats[2]['data-count'])

    return TWfollowers;
