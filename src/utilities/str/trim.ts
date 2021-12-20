import escapeRegex from "../escapeRegex";

/**
* Remove the given needle from the start and the end of string
*
* @param string $needle
* @return string
*/
export default function trim(string: string, needle: string = ' '): string {
    if (needle == ' ') {
        return string.replace(/^\s+|\s+$/g, '');
    }

    needle = escapeRegex(needle);

    var pattern = '^' + needle + '+|' + needle + '+$',
        regex = new RegExp(pattern, 'g');

    return string.replace(regex, "");
};