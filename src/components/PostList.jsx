import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PostItem from "./PostItem";

const PostList = ({ remove, posts, title }) => {
    if (!posts.length) {
        return (<h2 style={{ fontSize: '36px', textAlign: 'center' }}>Посты не найдены</h2>)
    }
    return (
        <div>
            <h1 style={{ textAlign: 'center', paddingBottom: '40px' }}>{title}</h1>
            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}

                        timeout={500}
                        classNames="post"
                    >
                        <PostItem remove={remove} number={index} value={post} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>

        /* <div>
            <h1 style={{ textAlign: 'center', paddingBottom: '40px' }}>{title}</h1>
            {posts.map((post, index) =>
                <PostItem remove={remove} number={index} value={post} key={post.id} />
            )}
        </div> */
    )
}

export default PostList;