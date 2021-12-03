const sort = require("./ranking-algorithm");
const fileLocation = "./sample3.txt";
const patternToMatch = "abin";

function resultRanker(err, data) {

	if (err) {
		console.log(err);
		return;
	}

	if (data.trim().length == 0) {
		console.log(`No matching patterns found.`);
		return;
	}

	const trimmedPattern = patternToMatch.trim();
	const searchResults = data.trim().split(/\n/);
	console.log("Completed processing file and found no of items:", searchResults.length);
	console.log("Total list of patterns found :",searchResults);

	const rankValue = [];
	for (let i = 0; i < searchResults.length; i++) {
		const element = searchResults[i].trim();
		//Finding rank value for particular element
		let rankValueCounter = 0;
		for (let j = 0; j < element.length; j++) {
			if (element.charAt(j) === trimmedPattern.charAt(j)) rankValueCounter += 2;
			else rankValueCounter += 1;
		}
		rankValue.push(rankValueCounter);
	}

	sort(rankValue, searchResults, 0, rankValue.length-1);
	
	console.log("The list of patterns based on case ranking:",searchResults);
}

function patternFinder(file, pattern, done) {
	const spawn = require("child_process").spawn;
	let res = "";

	const child = spawn("grep", ["-io", pattern, file]);
	child.stdout.on("data", function (buffer) {
		res += buffer.toString();
	});
	child.stdout.on("end", function () {
		done(null, res);
	});
}

patternFinder(fileLocation, patternToMatch, resultRanker);
