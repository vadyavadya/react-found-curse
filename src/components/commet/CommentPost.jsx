import React, { useState } from "react";
import cls from "./comment.module.css"

export default function CommentPost(props) {
    const [comments] = useState(props.comments);
    return (
        <div className={cls.container}>
            {
                comments.map((comment) =>
                    <div key={comment.id} className={cls.comment}>
                        <p className={cls.name}>{comment.email}</p>
                        <p className={cls.title}>{comment.name}</p>
                        <p className={cls.text}>{comment.body}</p>
                    </div>
                )
            }
        </div>
    )
}