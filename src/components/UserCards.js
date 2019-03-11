import React from 'react';

const UserCards = ({ users, selectedUser, setSelectedUser }) => {
    return users.map(user => {
        return (
            <article className={selectedUser === user.id ? "article__userInfo selected" : "article__userInfo"}
                key={user.id}
                onClick={() => setSelectedUser(user.id)}>
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

export default UserCards;