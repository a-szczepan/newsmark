export const getEnumEntries = (_enum) => {
    return Object.keys(_enum).map(key => _enum[key]).filter(value => typeof value === 'string') as string[];
}