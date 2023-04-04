import React, { useEffect, useMemo, useState } from "react";
import Counter from "./components/Counter";
import InputValue from "./components/InputValue";
import "./style/App.css"
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/Modal";
import { usePost } from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";
import Loader from "./components/loader/Loader";
import { useFetching } from "./hooks/useFetching";
import { countPages, getPagination } from "./utils/pages";


function App() {

  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([...posts, { ...newPost, id: Date.now() }]);
    setModal(false);
  }

  const remove = (removePost) => {
    setPosts(posts.filter(p => p.id != removePost.id));
  }

  //* Сортировка и поиск

  const [filter, setFilter] = useState({ sort: '', query: '', })

  const sortedAndSearchPost = usePost(posts, filter.sort, filter.query)

  //* Модальное окно
  const [modal, setModal] = useState(false);

  //* Несколько страниц
  const [pageCurrent, setPageCurrent] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pageCount, setPageCount] = useState('');
  let pageArray = getPagination(pageCount);


  //* Запрос постов
  const [getPosts, isLoading, error] = useFetching(async () => {
    const response = await PostService.getAll(limit, pageCurrent);
    setPosts(response.data);
    setPageCount(countPages(response.headers['x-total-count'], limit));
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

        {
          error
          && <h1>Произошла ошибка {error}</h1>
        }
        {
          isLoading
            ? <div className="center"><Loader /></div>
            : <PostList remove={remove} posts={sortedAndSearchPost} title='Список постов 1' />
        }
        {pageArray &&
          <ul className="pagination"> Стр.
            {pageArray.map((item) =>
              <li key={item} className={pageCurrent == item
                ? 'pagination__item pagination__item_active'
                : 'pagination__item'}
                onClick={(e) => setPageCurrent(e.target.innerHTML)}
              >
                {item}
              </li>)
            }
          </ul>

        }




        <Counter />
        <Counter />
        <InputValue text='Значение по умолчанию' />
      </div>

    </div>
  );
}

export default App;
