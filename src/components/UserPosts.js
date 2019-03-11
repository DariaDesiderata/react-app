import React from 'react';
import { helpers } from '../modules/utils';

const UserPosts = ({ selectedUser, users }) => {
    const componentClasses = ['article__dropdown'];
    if (selectedUser) {
        componentClasses.push('open')
    } else if (selectedUser !== null) {
        componentClasses.push('roll-up')
    }
    return (
        <div className={componentClasses.join(' ')}>
            {selectedUser
                ?
                <div className="posts__wrapper">
                    {renderPosts(selectedUser, users)}
                </div>
                : 'Click a card to view five of their posts'}
        </div>
    )
}
function renderPosts(selectedUser, users) {
    let postsToRender = users.find(user => user.id === selectedUser).posts;
    return postsToRender.map(post => {
        const capitalizedTitle = helpers.capitalizeString(post.title)
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
export default UserPosts;