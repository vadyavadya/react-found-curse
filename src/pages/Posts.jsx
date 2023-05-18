import React, { useEffect, useRef, useState } from "react";
import Counter from "../components/Counter";
import InputValue from "../components/InputValue";
import "../style/App.css"
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/modal/Modal";
import { usePost } from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { countPages } from "../utils/pages";
import Pagination from "../components/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";



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
    // const [getPostsMore, isLoadingMore, errorMore] = useFetching(async () => {
    //     const response = await PostService.getAll(limit, pageCurrent);
    //     setPosts([...posts, ...response.data]);
    //     setPageTotal(countPages(response.headers['x-total-count'], limit));
    // });

    const [getPosts, isLoading, error] = useFetching(async () => {
        const response = await PostService.getAll(limit, pageCurrent);
        setPosts([...response.data]);
        setPageTotal(countPages(response.headers['x-total-count'], limit));
    });

    const lastElement = useRef();

    useObserver(lastElement, pageCurrent < pageTotal, isLoading, () => {
        setLimit(+limit + 5);
    })

    useEffect(() => {
        getPosts();
    }, [limit, pageCurrent])



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
                <MySelect
                    value={limit}
                    onChange={value => setLimit(value)}
                    defaultValue={'Кол-во элементов'}
                    options={[
                        { id: 0, value: 5, name: '5' },
                        { id: 1, value: 10, name: '10' },
                        { id: 2, value: 25, name: '25' },
                        { id: 3, value: -1, name: 'Показать все' },
                    ]}
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
                <PostList remove={remove} posts={sortedAndSearchPost} title='Список постов 1' />
                <div ref={lastElement} style={{ height: '20px', background: 'red' }}>Невидимый элемент. За ним следим чтобы обновить</div>
                {
                    isLoading
                    && <div className="center"><Loader /></div>
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
    )
}

export default Posts;
