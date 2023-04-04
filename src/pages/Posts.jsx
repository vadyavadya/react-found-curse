import React, { useState, useEffect } from "react";
import usePost from "../hooks/usePosts"
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import countPages from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";





function Posts() {

    const [posts, setPosts] = useState([]);

    const addPost = (newPost) => {
        setPosts([...posts, { ...newPost, id: Date.now() }]);
        setModal(false);
    }

    const remove = (removePost) => {
        setPosts(posts.filter(p => p.id !== removePost.id));
    }

    //* Сортировка и поиск

    const [filter, setFilter] = useState({ sort: '', query: '', })

    const sortedAndSearchPost = usePost(posts, filter.sort, filter.query)

    //* Модальное окно
    const [modal, setModal] = useState(false);

    //* Несколько страниц
    const [pageCurrent, setPageCurrent] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pageTotal, setPageTotal] = useState('');



    //* Запрос постов
    const [getPosts, isLoading, error] = useFetching(async () => {
        const response = await PostService.getAll(limit, pageCurrent);
        setPosts(response.data);
        setPageTotal(countPages(response.headers['x-total-count'], limit));
    });

    useEffect(() => {
        getPosts();
    }, [pageCurrent])

    return (
        <div className="App">

            <div className="container">
                <div className="buttons">
                    <MyButton onClick={() => setModal(true)} >Создать пост</MyButton>
                </div>

                <MyModal visible={modal} setVisible={setModal}>
                    <PostForm added={addPost} />
                </MyModal>

                <hr style={{ margin: '20px  0' }} />

                <PostFilter
                    filter={filter}
                    setFilter={setFilter}
                />

                <Pagination
                    pageTotal={pageTotal}
                    pageCurrent={pageCurrent}
                    setPage={setPageCurrent}
                />

                {
                    error
                    && <h1>Произошла ошибка {error}</h1>
                }
                {
                    isLoading
                        ? <div className="center"><Loader /></div>
                        : <PostList remove={remove} posts={sortedAndSearchPost} title='Список постов 1' />
                }

                <Pagination
                    pageTotal={pageTotal}
                    pageCurrent={pageCurrent}
                    setPage={setPageCurrent}
                />



                <Counter />
                <Counter />
                <InputValue text='Значение по умолчанию' />
            </div>

        </div>
    );
}

export default Posts;
