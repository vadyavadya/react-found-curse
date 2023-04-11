import React from "react";
import MyButton from "./UI/button/MyButton";
import { useNavigate } from "react-router-dom";



const PostItem = (props) => {
    const navigate = useNavigate();

    return (
        <div className="post">
            <div className="post__container">
                <div className="post__content">
                    <h2 className="post__title">{props.value.id}. {props.value.title}</h2>
                    <div className="post__text">{props.value.body}</div>
                </div>
                <div className="post__btn">

                    <MyButton onClick={() => navigate(`/post/` + props.value.id)} > Открыть</MyButton>

                    <MyButton onClick={e => props.remove(props.value)} >
                        Удалить
                    </MyButton>
                </div>
            </div >
        </div >
    )
}

export default PostItem;

