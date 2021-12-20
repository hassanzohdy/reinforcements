import escapeRegex from "../escapeRegex";

/**
* Remove the given needle from the start of string
*
* @param string needle
* @return string
*/
export default function rtrim(string: string, needle: string = ' '): string {
    var pattern = escapeRegex(needle) + '+$',
        regex = new RegExp(pattern, 'g');

    return string.replace(regex, "");
};