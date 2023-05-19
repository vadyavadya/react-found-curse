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
import { useObserver } from "../hooks/useObserver.jsx";
import MySelect from "../components/UI/select/MySelect";



function Posts() {

    const [postsShow, setPostsShow] = useState([]);
    const [limitShow, setLimitShow] = useState(10);
    const [pageShow, setPageShow] = useState(1);
    const [pageTotal, setPageTotal] = useState('');

    //* Несколько страниц
    const [downloadPosts, setDownloadPosts] = useState([]);
    const [limitDownload, setLimitDownload] = useState(10);
    const [pageDownload, setPageDownload] = useState(1);
    const [pageTotalDownload, setPageTotalDownload] = useState('');

    const [getPosts, isLoading, error] = useFetching(async () => {
        const response = await PostService.getAll(limitDownload, pageDownload);
        setDownloadPosts([...response.data]);
        if (limitShow === limitDownload) {
            setPageTotal(countPages(response.headers['x-total-count'], limitShow));
            setPageTotalDownload(countPages(response.headers['x-total-count'], limitShow))
        } else {
            setPageTotalDownload(countPages(response.headers['x-total-count'], limitDownload))
        }
    });

    const lastElement = useRef();



    const setPageCurrentPagination = async (page) => {
        setPageShow(page);
    }

    useEffect(() => {
        getPosts();
        // eslint-disable-next-line
    }, [limitDownload, pageDownload])

    useEffect(() => {
        if (limitShow === limitDownload) {
            setPostsShow([...downloadPosts]);
        } else {
            setPostsShow([...postsShow, ...downloadPosts]);
        }
        // eslint-disable-next-line
    }, [downloadPosts])

    useEffect(() => {
        setPageDownload(pageShow);
        setLimitDownload(limitShow);
        // eslint-disable-next-line
    }, [pageShow])

    useEffect(() => {
        setPageShow(1);
        setPageDownload(1);
        setLimitDownload(limitShow);
    }, [limitShow])

    /*
        Изначально было что нажимаешь на пагинацию она меняет страницу и а при смене страницы обновляется контент
        а динамическая пагинация тоже меняет страницы но добавляет посты в список а не затирает их 
    */

    const addPost = (newPost) => {
        setPostsShow([...postsShow, { ...newPost, id: Date.now() }]);
        setModal(false);
    }

    const remove = (removePost) => {
        setPostsShow(postsShow.filter(p => p.id !== removePost.id));
    }

    //* Сортировка и поиск

    const [filter, setFilter] = useState({ sort: '', query: '', })

    const sortedAndSearchPost = usePost(postsShow, filter.sort, filter.query)


    useObserver(lastElement, pageDownload < pageTotalDownload && !filter.query, isLoading, () => {
        let subdownload = 2;
        if (postsShow.length === +limitDownload) {
            let pD = Math.floor(pageShow * limitShow / subdownload) + 1;
            setLimitDownload(subdownload);
            setPageDownload(pD);
        } else {
            setPageDownload(pageDownload + 1);
        }
    })

    //* Модальное окно
    const [modal, setModal] = useState(false);

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
                    value={limitShow}
                    onChange={value => setLimitShow(value)}
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
                    pageCurrent={pageShow}
                    setPage={setPageCurrentPagination}
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
                    pageCurrent={pageShow}
                    setPage={setPageCurrentPagination}
                />


                <h2>Два независимых счетчика</h2>
                <Counter />
                <Counter />
                <h2>Меняем значение заголовка от значение в инпуте</h2>
                <InputValue text='Значение по умолчанию' />
            </div>

        </div>
    )
}

export default Posts;

