/**
* Convert current string to snake case
* i.e hello-world will become: hello_world
*
* @return string
*/
export default function toSnakeCase(string: string, lowerAll: boolean = true) {
    return string.replace(/(\-|\s|([A-Z]))+/g, function (match, v2, matchedUpperLetter, offset, string) {
        if (!matchedUpperLetter) return '_';

        return '_' + (lowerAll ? matchedUpperLetter.toLowerCase() : matchedUpperLetter);
    });
};