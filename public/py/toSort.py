#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json

tabFestival = ['Festival'];
tabALpha = ['A','B','C','D','E','F','G','H','I','J','L','K','M','N','O','P'];
tabCulturel = ['Culture','Monuments','culturelles','culturel','culturels','conference'];
tabLoisirs = ['réalité virtuelle','Loisirs','humour','Apéro','Apéros','fête','rire','artistes','artiste','soirée'];

with open('geo.json', 'r') as f:
    data = json.load(f)

# strng = 'Apéro Frenchies';
# for item in range(len(data['features'])):
#     for word in tabCulturel:
#         if word in strng:
#             data['features'][item]['properties']['long'] = 'OGKGKOKPROK'
# print(data)

for item in range(len(data['features'])):

    description = data['features'][item]['properties']['title']

    for word in tabLoisirs:
        if word in description:
            data['features'][item]['properties']['title'] += 'Loisirs'
            print(data['features'][item]['properties']['title'])

    for word in tabCulturel:
        if word in description:
            data['features'][item]['properties']['title'] += 'Culturel'
            print(data['features'][item]['properties']['title'])
    for word in tabALpha:
        if word in description:
            data['features'][item]['properties']['title'] += 'Loisirs'
            print(data['features'][item]['properties']['title'])

    for word in tabFestival:
        if word in description:
            data['features'][item]['properties']['title'] += 'Festival'
            print(data['features'][item]['properties']['title'])
# for item in range(len(data['features'])):
#
#     description = data['features'][item]['properties']['name']
#
    # for word in tabALpha:
    #     if word in description:
    #         data['features'][item]['properties']['name'] += 'Loisirs'
    #         print(data)
# with open('new.json','a+') as f:
#     json.dump(data,f)

# properties_dict={
#     "property1": "foo",

# properties_list=zip(properties_dict.keys(),properties_dict.values())

# for feat in data['features']:
#     for i in range(len(properties_list)):
#         feat ['properties'][properties_list[i][0]]=properties_list[i][1]

# #Write result to a new file
with open('new.geojson', 'w') as f:
    json.dump(data, f,indent=4)
