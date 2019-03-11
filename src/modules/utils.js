export const helpers = {
    getRandomInt(max, count) {
        let arrayOfUniqueNumbers = [];
        while (arrayOfUniqueNumbers.length < count) {
            const newNumber = Math.floor(Math.random() * Math.floor(max));
            if (!arrayOfUniqueNumbers.includes(newNumber)) {
                arrayOfUniqueNumbers.push(newNumber);
            }
        }
        return arrayOfUniqueNumbers;
    },
    capitalizeString(string) {
        return string
            .split(' ')
            .map(title => title.charAt(0).toUpperCase() + title.slice(1))
            .join(' ');
    }
}