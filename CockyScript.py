import sys
sys.path.append("functions")
import thingiverse
import github
import hackaday
import youtube
import twitter
import googlegroups
import instagram

# Users & Names variables. Fill them with your usernames if you want the stats of that platform. Leave it blank if you don't want the stats.

TVuser = 'AngelLM'                                      # Thingiverse username. https://www.thingiverse.com/USERNAME/
GHuser = 'AngelLM'                                      # GitHub username. https://github.com/USERNAME
HDuser = 'AngelLM'                                      # Hackaday username. https://hackaday.io/USERNAME
YTuser = 'AngelLM'                                      # Youtube username. https://www.youtube.com/USERNAME
TWuser = '_AngelLM'                                     # Twitter username. https://twitter.com/USERNAME
GGname = 'thor-opensource-3d-printable-robotic-arm'     # Google Group name. https://groups.google.com/forum/#!forum/GROUPNAME
IGuser = 'angel_lm_'                                    # Instagram username. https://www.instagram.com/

if TVuser != '':
    TVstats = thingiverse.getStats(TVuser)
    print '----------------------'
    print 'Thingiverse Stats'
    print '----------------------'
    print 'Total views: ' + str(TVstats[0])
    print 'Total downloads: ' + str(TVstats[1])
    print 'Total likes: ' + str(TVstats[2])
    print 'Total collects: ' + str(TVstats[3])
    print 'Total makes: ' + str(TVstats[4])
    print 'Total remixes: ' + str(TVstats[5])
    print 'Total comments: ' + str(TVstats[6])

if GHuser != '':
    GHstats = github.getStats(GHuser)
    print ''
    print '----------------------'
    print 'GitHub Stats'
    print '----------------------'
    print 'Total followers: ' + str(GHstats[0])
    print 'Total watchers: ' + str(GHstats[1])
    print 'Total stars: ' + str(GHstats[2])
    print 'Total forks: ' + str(GHstats[3])
    print 'Total contributors: ' +str(GHstats[4])

if HDuser != '':
    HDstats = hackaday.getStats(HDuser)
    print ''
    print '----------------------'
    print 'Hackaday Stats'
    print '----------------------'
    print 'Total profile followers: ' + str(HDstats[0])
    print 'Total likes: ' + str(HDstats[1])
    print 'Total views: ' + str(HDstats[2])
    print 'Total projects followers: ' + str(HDstats[3])
    print 'Total comments: ' + str(HDstats[4])

if YTuser != '':
    YTstats = youtube.getStats(YTuser)
    print ''
    print '----------------------'
    print 'Youtube Stats'
    print '----------------------'
    print 'Total suscriptors: ' + str(YTstats[0])
    print 'Total views: ' + str(YTstats[1])
    print 'Total likes: ' + str(YTstats[2])
    print 'Total dislikes: ' + str(YTstats[3])

if TWuser != '':
    TWstats = twitter.getStats(TWuser)
    print ''
    print '----------------------'
    print 'Twitter Stats'
    print '----------------------'
    print 'Total followers: ' + str(TWstats)
#
if GGname != '':
    GGstats = googlegroups.getStats(GGname)
    print ''
    print '----------------------'
    print 'Thor Google Group Stats'
    print '----------------------'
    print 'Total members: ' + str(GGstats[0])
    print 'Total threads: ' + str(GGstats[1])

if IGuser != '':
    IGstats = instagram.getStats(IGuser)
    print ''
    print '----------------------'
    print 'Instagram Stats'
    print '----------------------'
    print 'Total followers: ' + str(IGstats[0])
    print 'Total likes: ' + str(IGstats[1])
    print 'Total reproductions: ' + str(IGstats[2])
    print 'Total comments: ' + str(IGstats[3])

print ''
print ''
