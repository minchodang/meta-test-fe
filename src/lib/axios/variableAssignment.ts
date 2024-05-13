function variableAssignment(string: string, options: Record<string, string>) {
    let result = string;
    const optionsKeyArray = Object.keys(options);
    for (let i = 0; i < optionsKeyArray.length; i += 1) {
        const regex = new RegExp(`\\{{${optionsKeyArray[i]}}}`, 'g');
        result = result.replace(regex, options[optionsKeyArray[i]]);
    }

    return result;
}

export default variableAssignment;
