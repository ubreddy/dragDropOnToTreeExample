
export const genName = ({ current, collection, type }) => {
    if (!type && !current) return
    let name = current || (type + (Math.round(Math.random() * 10)))
    if (!collection) return name
    else {
        if (collection[name] || (collection.includes && collection.includes(name))) {
            name += (Math.round(Math.random() * 10));
            return genName({ current: name, collection, type })
        }
        else return name
    }
}
