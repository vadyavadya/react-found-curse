import React from "react";
import MyButton from "./UI/button/MyButton";

const PostItem = (props) => {

    return (
        <div className="post">
            <div className="post__container">
                <div className="post__content">
                    <h2 className="post__title">{props.number + 1} {props.value.title}</h2>
                    <div className="post__text">{props.value.body}</div>
                </div>
                <MyButton onClick={e => props.remove(props.value)}
                >
                    Удалить
                </MyButton>
            </div>
        </div>
    )
}

export default PostItem;
