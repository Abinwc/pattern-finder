/**
 * Pattern creator creates a pattern from the given word that
 * can be used to collect words with two different letters
 * from the text file.
 *
 * For example : For the pattern "abin"
 * the following pattern is created "\wbin|a\win|ab\wn|abi\w|\w\win|a\w\wn|ab\w\w"
 */

function patternCreator(word) {
	let patternToMatch = "";

	for (let i = 0; i < word.length; i++) {
		const temp = word.split("");
		temp[i] = "\\w";
		patternToMatch += temp.join("") + "|";
	}
	for (let i = 0; i < word.length - 1; i++) {
		const temp = word.split("");
		temp[i] = "\\w";
		temp[i + 1] = "\\w";
		patternToMatch += temp.join("") + "|";
	}

	patternToMatch = patternToMatch.substring(0, patternToMatch.length - 1);
	return patternToMatch;
}

module.exports = patternCreator;
