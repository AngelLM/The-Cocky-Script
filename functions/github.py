import bs4 as bs
import urllib2

def getStats(GHuser):
    GHurl = 'https://github.com/' + GHuser + '?utf8=%E2%9C%93&tab=repositories&q=&type=source&language='
    preurl = 'https://github.com'
    urlList = []
    GHwatchers = 0
    GHstars = 0
    GHforks = 0
    GHcontributors = 0

    req = urllib2.Request(GHurl, headers={ 'User-Agent': 'Mozilla/5.0' })
    source = urllib2.urlopen(req).read()
    soup = bs.BeautifulSoup(source,'lxml')

    GHfollowers =  int(soup.findAll('span', {'Counter'})[2].text)
    GHprojects = soup.findAll('li', {'class':'col-12'})

    for each in GHprojects:
        url = each.findAll('a')[0]
        urlList.append(url.get('href'))

    for i in range(len(urlList)):
        newUrl = preurl + urlList[i]
        req2 = urllib2.Request(newUrl, headers={ 'User-Agent': 'Mozilla/5.0' })
        source2 = urllib2.urlopen(req2).read()
        soup2 = bs.BeautifulSoup(source2,'lxml')

        socialcounter = soup2.findAll('a', {'class':'social-count'})
        contrib = soup2.findAll('span', {'class':'num text-emphasized'})

        GHwatchers += int(socialcounter[0].text)
        GHstars += int(socialcounter[1].text)
        GHforks += int(socialcounter[2].text)
        if len(contrib[3].text)>0:
            GHcontributors += int(contrib[3].text)-1

    GHarray = [GHfollowers, GHwatchers, GHstars, GHforks, GHcontributors]
    return GHarray;
