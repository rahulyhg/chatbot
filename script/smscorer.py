# -*- coding: utf-8 -*-
"""
Created on Sat Mar 25 21:17:26 2017

@author: Pratik
"""
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk import ngrams
from itertools import chain

#Similarity Scorer
def smscore(para1,para2):
    '''
    Input : Two strings of length 2 or more.
    Output : Score between 0-1.
    '''
#    sent1_list = sent_tokenize(para1)
#    sent2_list = sent_tokenize(para2)
    word1_list = word_tokenize(para1.lower())
    word2_list = word_tokenize(para2.lower())
#     print(word1_list)
#     print(word2_list)
    bigram1 = list(chain.from_iterable(list(ngrams(words,2)) for words in word1_list))
    bigram2 = list(chain.from_iterable(list(ngrams(words,2)) for words in word2_list))
#     print(bigram1)
#     print(bigram2)
    if(bigram1==[] or bigram2==[]):
        print("Length of both input arguments needs to be greater than or equal to 2")
        return 0 
    #Count para1 subset para2
    count1 = 0
    for bi in bigram1:
        if bi in bigram2:
            count1 += 1
    #Count para2 subset para1
    count2 = 0
    for bi in bigram2:
        if bi in bigram1:
            count2 += 1
    return ((count1+count2)/float(len(bigram1)+len(bigram2)))