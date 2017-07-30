
import thingiverse
import github
import hackaday
import youtube
import twitter


TVstats = thingiverse.getStats()
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

GHstats = github.getStats()
print ''
print '----------------------'
print 'GitHub Stats'
print '----------------------'
print 'Total followers: ' + str(GHstats[0])
print 'Total watchers: ' + str(GHstats[1])
print 'Total stars: ' + str(GHstats[2])
print 'Total forks: ' + str(GHstats[3])
print 'Total contributors: ' +str(GHstats[4])

HDstats = hackaday.getStats()
print ''
print '----------------------'
print 'Hackaday Stats'
print '----------------------'
print 'Total profile followers: ' + str(HDstats[0])
print 'Total likes: ' + str(HDstats[1])
print 'Total views: ' + str(HDstats[2])
print 'Total projects followers: ' + str(HDstats[3])
print 'Total comments: ' + str(HDstats[4])

YTstats = youtube.getStats()
print ''
print '----------------------'
print 'Youtube Stats'
print '----------------------'
print 'Total suscriptors: ' + str(YTstats[0])
print 'Total views: ' + str(YTstats[1])
print 'Total likes: ' + str(YTstats[2])
print 'Total dislikes: ' + str(YTstats[3])

TWstats = twitter.getStats()
print ''
print '----------------------'
print 'Twitter Stats'
print '----------------------'
print 'Total followers: ' + str(TWstats)
