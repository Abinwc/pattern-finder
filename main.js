const sort = require("./ranking-algorithm");
const patternCreator = require("./pattern-creator");
const fileLocation = "./sample3.txt";
const pattern = "abin";
const fs = require("fs");
const path = require("path");


//Handles the response
function responseHandler(data, pattern) {
	data = data.trim();
	if (data.length == 0) {
		console.log(`No matching patterns found.`);
		return;
	}

	const groupedData = groupData(data, pattern);

	const rankOneList = resultRanker(groupedData.family, pattern);
	const rankTwoList = resultRanker(groupedData.closeFriends, pattern);
	const rankThreeList = resultRanker(groupedData.friends, pattern);

	console.log("Ranked list for exact patterns");
	console.log(rankOneList);
	console.log("Ranked list for patterns with one letter mismatch");
	console.log(rankTwoList);
	console.log("Ranked list for patterns with two letter mismatch");
	console.log(rankThreeList);

	//TODO: NO TIME WRITING FILE EFFECTIVELY

	//	 fs.open('ranked-list.txt', 'r', function (err, f) {
	//      if(err) {
	//				fs.mkdir('ranked-list.txt', (err) => {
	//    if (err) {
	//        return console.error(err);
	//    }
	//    console.log('Directory created successfully!');
	//});
	//			}
	//});

	//fs.writeFile("ranked-list.txt", rankOneList.join("\n"), (err) => {
	//  if (err)
	//    console.log(err);
	//  else {
	//    console.log("File written successfully\n");
	//  }
	//});
}



// This function groups words for distance matching.
// Maximum distance of 2 is implemented.
function groupData(data, pattern) {
	const arr = data.split(/\n/);
	const pat = pattern.toLowerCase();

	//Array Family stores the patterns that directly matches with the original pattern.
	const family = [];
	//Array CloseFriends stores the patterns that is one word different from the original pattern.
	const closeFriends = [];
	//Array Friends stores the patterns that is two word different from the original pattern.
	const friends = [];

	for (let i = 0; i < arr.length; i++) {
		const element = arr[i].toLowerCase();

		if (element == pat) family.push(arr[i]);
		else {
			const elementChars = element.split("");
			const patternChars = pat.split("");
			let diffCounter = 0;
			for (let i = 0; i < elementChars.length; i++) {
				if (elementChars[i] != patternChars[i]) diffCounter++;
			}
			if (diffCounter == 1) closeFriends.push(arr[i]);
			else friends.push(arr[i]);
		}
	}

	return {
		family: family,
		closeFriends: closeFriends,
		friends: friends,
	};
}


//This function ranks the data based on case . 
function resultRanker(data, pattern) {
	/**
	 * Ranking Algorithm explanation:
	 *
	 *There are two possible cases(upper-case and lower case) for a particular letter at a position in the pattern.
	 * That particular case for that particular letter at that position get a value.
	 *
	 * TODO: Finish the algorithm explanation
	 */
	const trimmedPattern = pattern.trim();
	const searchResults = data;

	const rankValue = [];
	for (let i = 0; i < searchResults.length; i++) {
		const element = searchResults[i].trim();
		//Finding rank value for particular element
		let rankValueCounter = 0;
		//TODO ; check for case using ASCII for ranking closeFriends and friends correctly.
		//This logic works only for family.
		for (let j = 0; j < element.length; j++) {
			if (element.charAt(j) === trimmedPattern.charAt(j)) rankValueCounter += 2;
			else rankValueCounter += 1;
		}
		rankValue.push(rankValueCounter);
	}

	/**
	 * RankValue array and the Search Results are sent for sorting
	 */
	sort(rankValue, searchResults, 0, rankValue.length - 1);

	return searchResults;
}


//This is the main function that processes files and finds patterns . 
//This would work for LINUX/UNIX systems. 
//For windows , findstr could be used.
//Grep was very faster than fs and few other algorithms . Hence chose this.
function patternFinder(file, pattern, done) {
	try {
		const spawn = require("child_process").spawn;
		let res = "";

		const patternToMatch = patternCreator(pattern);

		const child = spawn("grep", ["-ioE", patternToMatch, file]);
		child.stdout.on("data", function (buffer) {
			res += buffer.toString();
		});
		child.stdout.on("end", function () {
			done(res, pattern);
		});
	} catch (e) {
		console.log(`Errored occured while searching pattern ${e.message}`);
	}
}

patternFinder(fileLocation, pattern, responseHandler);
