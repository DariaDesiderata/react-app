import React, { Component } from 'react';

function getRandomInt(max, count) {
    let arrayOfUniqueNumbers = [];
    while (arrayOfUniqueNumbers.length < count) {
        const newNumber = Math.floor(Math.random() * Math.floor(max));
        if (!arrayOfUniqueNumbers.includes(newNumber)) {
            arrayOfUniqueNumbers.push(newNumber);
        }
    }
    return arrayOfUniqueNumbers;
}
function capitalizeString(string) {
    return string
        .split(' ')
        .map(title => title.charAt(0).toUpperCase() + title.slice(1))
        .join(' ');
}
export default class Users extends Component {
    state = {
        users: [],
        selectedUser: null,
    };
    componentDidMount() {
        this.fetchData('https://jsonplaceholder.typicode.com/users')
            .then(users => {
                this.setState({ users });
            })
    }
    fetchData(url) {
        let dataToRender = [];
        return fetch(url)
            .then(response => response.json())
            .then(response => {
                if (response) {
                    let uniqueNumbers = getRandomInt(response.length, 3)
                    dataToRender = uniqueNumbers.map(number => response[number])
                    this.getAvatar(dataToRender);
                    this.getPosts(dataToRender);
                    console.log(dataToRender)
                    return dataToRender;
                }
            })
    };
    getAvatar(data) {
        const users = data.map(user => {
            let url = `https://api.adorable.io/avatars/150/${user.email}.png`;
            user.imgUrl = url;
            return user;
        })
        return users;
    }
    getPosts(data) {
        const users = data.map(user => {
            return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
                .then(response => response.json())
                .then(response => {
                    if (response) {
                        let uniqueNumbers = getRandomInt(response.length, 5);
                        user.posts = uniqueNumbers.map(number => response[number])
                    }
                })
        })
        return users;
    }
    renderUsers(users) {
        return users.map(user => {
            return (
                <article className={this.state.selectedUser === user.id ? "article__userInfo selected" : "article__userInfo"}
                    key={user.id}
                    onClick={() => this.setSelectedUser(user.id)}>
                    <img src={user.imgUrl} alt='avatar' />
                    <div className="article__text">
                        <q className="article__text italic">{user.company.catchPhrase}</q>
                        <p className="article__text bold">{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                </article>
            )
        })
    }
    renderDropDown(selectedUser) {
        const componentClasses = ['article__dropdown'];

        if (selectedUser) {
            componentClasses.push('open')
        } else if (selectedUser !== null && selectedUser === this.state.selectedUser) {
            componentClasses.push('roll-up')
        }
        return (
            <div className={componentClasses.join(' ')}>
                {selectedUser
                    ?
                    <div className="posts__wrapper">
                        {this.renderPosts(selectedUser)}
                    </div>
                    : 'Click a card to view five of their posts'}
            </div>
        )
    }
    renderPosts(selectedUser) {
        let postsToRender = this.state.users.find(user => user.id === selectedUser).posts;
        return postsToRender.map(post => {
            const capitalizedTitle = capitalizeString(post.title)
            const capitalizedBody = post.body.charAt(0).toUpperCase() + post.body.slice(1)
            return (
                <article
                    key={post.id}
                    className="article__post">
                    <header className="article__post-title">
                        {capitalizedTitle}
                    </header>
                    <p>
                        {capitalizedBody}
                    </p>
                </article>
            )
        })
    }
    setSelectedUser(id) {
        if (this.state.selectedUser === id) {
            return this.setState({ selectedUser: undefined })
        }
        return this.setState({ selectedUser: id })
    }
    render() {
        return (
            <main>
                <section className="article__wrapper">
                    {this.state.users.length ? this.renderUsers(this.state.users) : <p>Loading...</p>}
                </section>
                {this.renderDropDown(this.state.selectedUser)}
            </main>
        )
    }
}
