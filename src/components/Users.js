import React, { Component } from 'react';

import fetchData from '../modules/fetchData';
import UserCards from './UserCards';
import UserPosts from './UserPosts';

export default class Users extends Component {
    state = {
        users: [],
        selectedUser: null,
    };
    componentDidMount() {
        fetchData('https://jsonplaceholder.typicode.com/users')
            .then(users => {
                this.setState({ users });
            })
    }
    setSelectedUser = (id) => {
        if (this.state.selectedUser === id) {
            return this.setState({ selectedUser: undefined })
        }
        return this.setState({ selectedUser: id })
    }
    render() {
        return (
            <main>
                <section className="article__wrapper">
                    {this.state.users.length
                        ? <UserCards
                            users={this.state.users}
                            selectedUser={this.state.selectedUser}
                            setSelectedUser={this.setSelectedUser}
                        />
                        : <p>Loading...</p>}
                </section>
                <div className="dropdown">
                    <UserPosts selectedUser={this.state.selectedUser} users={this.state.users} />
                </div>
            </main>
        )
    }
}
