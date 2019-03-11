import { helpers } from './utils'
export default function fetchData(url) {
    let dataToRender = [];
    return fetch(url)
        .then(response => response.json())
        .then(response => {
            if (response) {
                let uniqueNumbers = helpers.getRandomInt(response.length, 3)
                dataToRender = uniqueNumbers.map(number => response[number])
                getAvatar(dataToRender);
                getPosts(dataToRender);
                return dataToRender;
            }
        })
};
function getAvatar(data) {
    const users = data.map(user => {
        let url = `https://api.adorable.io/avatars/150/${user.email}.png`;
        user.imgUrl = url;
        return user;
    })
    return users;
}
function getPosts(data) {
    const users = data.map(user => {
        return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
            .then(response => response.json())
            .then(response => {
                if (response) {
                    let uniqueNumbers = helpers.getRandomInt(response.length, 5);
                    user.posts = uniqueNumbers.map(number => response[number])
                }
            })
    })
    return users;
}
