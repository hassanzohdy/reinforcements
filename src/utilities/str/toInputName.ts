import rtrim from "./rtrim";

/**
 * Convert the current a dot notation string to compound input name
 * my.input.name >> my[input][name]
 * 
 * @param   {string} string
 * @returns {string}
 */
export default function toInputName(string: string): string {
    if (! string) return '';
    
    if (! string.includes('.')) return string;

    let namesList = string.split('.'),
        mainName = namesList.shift() || '';

    for (let name of namesList) {
        let outBrackets = '';
        if (name.endsWith('[]')) {
            name = rtrim(name, '[]');            
            outBrackets = '[]';
        }

        mainName += `[${name}]${outBrackets}`;
    }

    return mainName;
}