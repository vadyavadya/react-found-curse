import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/loader/Loader";
import CommentPost from "../components/commet/CommentPost";

export default function EditPost() {

    let params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    //* Запрос постов
    const [fetchingByPost, isLoading] = useFetching(async () => {
        const response = await PostService.getById(params.id);
        setPost(response.data);
    });

    const [fetchingByComments, isLoadingComments] = useFetching(async () => {
        const response = await PostService.getById(params.id + '/comments');
        setComments(response.data);
    });
    useEffect(() => {
        fetchingByPost();
        fetchingByComments();
    })

    return (

        <div className="container">


            {
                isLoading
                    ? <Loader />
                    : <div>
                        <h1>{post.id} {post.title}</h1>
                        <p>{post.body}</p>

                    </div>
            }

            {
                isLoadingComments
                    ? <Loader />
                    : (
                        <>
                            <h1 style={{ marginTop: '50px' }}>Комментарии</h1>
                            <CommentPost comments={comments} />
                        </>
                    )
            }



        </div>
    )
}
