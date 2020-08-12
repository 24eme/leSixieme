import pandas as pd
from nltk.stem import WordNetLemmatizer
from nltk import word_tokenize
from nltk.corpus import stopwords
# nltk.download('punkt')
import nltk
nltk.download('punkt')
nltk.download('stopwords')
stopW=stopwords.words('french')



description=open("description.txt", "r")
lignes = description.readlines()
tabd=[]
i=0
d=''
for l in lignes:
    if l[0] == '$':
        tabd.append(d)
        d=''
        i=i+1
    else:
        d=d+l
# print(tabd)

for d in tabd:
    exclude=set(string.punctuation)
    listTokeniser=word_tokenize(d)
    stopW.extend(exclude)
    tokens_without_stopW=[word for word in listTokeniser if word not in stopW ]
    print(tokens_without_stopW)

##with open('descriptionml.csv','a+') as f:
##     for data in tabd:
##         f.write(data)
