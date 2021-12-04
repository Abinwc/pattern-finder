# pattern-finder

# Task

You will be provided with a large text file(>2GB <100GB) and a number of patterns as input. Your role is to find specific patterns that will also be provided as input and rank them in an orderly fashion (Ranking is done on exact matches vs variations in number of case changes, for example if the file contains HELLOhelloHEllo and you are asked to match HELLO, your code should return 3 matches with HELLO as rank 1(perfect case match), HEllo as rank 2(2 letters with matching case), hello as rank 3(no letters with matching case). You need to list all available patterns in the text file. 

You will be ranked on: 
Algorithmic efficiency
Time taken to return results
Accuracy of results and means of presenting them
Efficiency of successive finds
Bonus point: You can implement distance matching between words in spelling and include that in the ranking. For example if you are asked to find the pattern Hello and the file contains HFLLO → This is a distance of 1 in spelling and 4 in case.



# Solution 
The solution is there in the main.js file
