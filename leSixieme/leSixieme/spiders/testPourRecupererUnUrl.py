import json

#filename = '../../eventsLinks.json'
def readLinkJson(filename):
    urls= open(filename)
    contenu = urls.readlines()
    taburls=[]
    # print(len(contenu))
    # print(contenu[2])
    # # for(i=0,i<len(contenu))
    i=0
    while(i<len(contenu)):
        u=contenu[i].split()
        taburls.append(u[2][:-1])     #le dernier caractère est " donc je supprime le dernier caractère
        i=i+1
        
    urls.close()
    return(taburls)


readLinkJson('../../eventsLinks.json')
