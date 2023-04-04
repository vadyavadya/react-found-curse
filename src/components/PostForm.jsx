import React, { useState } from "react";
import MyInput from "./input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({ added }) => {

    const [newPost, setNewPost] = useState({ title: '', body: '' });

    function addPost(e) {
        e.preventDefault();
        added(newPost);
        setNewPost({ title: '', body: '' })
    }

    return (
        <form action="">
            {/* Управляемый input */}
            <MyInput
                value={newPost.title}
                onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                type="text"
                placeholder="Заголовок поста" />

            <MyInput
                value={newPost.body}
                onChange={e => setNewPost({ ...newPost, body: e.target.value })}
                type="text"
                placeholder="текст"
            />

            <MyButton onClick={(e) => addPost(e)}>Создать пост</MyButton>
        </form>
    )
}

export default PostForm;