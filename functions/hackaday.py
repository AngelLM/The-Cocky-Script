import bs4 as bs
import urllib2

def getStats(HDuser):
    HDurl = 'https://hackaday.io/' + HDuser
    preurl = 'https://hackaday.io'
    urlList=[]
    HDlikes = 0
    HDviews = 0
    HDcomments = 0
    HDprojfollowers = 0

    req = urllib2.Request(HDurl, headers={ 'User-Agent': 'Mozilla/5.0' })
    source = urllib2.urlopen(req).read()
    soup = bs.BeautifulSoup(source,'lxml')

    HDproffollowers = int(soup.find_all('span', {'class':'followers'})[0].text)

    projectSection = soup.find_all('section', {'class':'section'})[4]
    projectItems = projectSection.find_all('div', {'class':'project-item'})

    for each in projectItems:
        projectUrl = each.findAll('a', {'class':'item-link'})[0]
        urlList.append(projectUrl.get('href'))



    for i in range (len(urlList)):
        newUrl = preurl + urlList[i]
        req2 = urllib2.Request(newUrl, headers={ 'User-Agent': 'Mozilla/5.0' })
        source2 = urllib2.urlopen(req2).read()
        soup2 = bs.BeautifulSoup(source2,'lxml')

        likesRaw = soup2.findAll("span", {'class':'like_count'})[0].text
        if 'k' in likesRaw:
            likesRaw = float(likesRaw.replace("k", ""))*1000
        HDlikes += int(likesRaw)

        viewsRaw = soup2.findAll("span", {'class':'view_count'})[0].text
        if 'k' in viewsRaw:
            viewsRaw = float(viewsRaw.replace("k", ""))*1000
        HDviews += int(viewsRaw)

        followersRaw = soup2.findAll("span", {'class':'follower_count'})[0].text
        if 'k' in followersRaw:
            followersRaw = float(followersRaw.replace("k", ""))*1000
        HDprojfollowers += int(followersRaw)

        commentsRaw = soup2.findAll("span", {'class':'comment_count'})[0].text
        if 'k' in commentsRaw:
            commentsRaw = float(commentsRaw.replace("k", ""))*1000
        HDcomments += int(commentsRaw)

    HDarray = [HDproffollowers, HDlikes, HDviews, HDprojfollowers, HDcomments]
    return HDarray;
