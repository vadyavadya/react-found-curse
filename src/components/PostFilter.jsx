import React from "react";
import MyInput from "./input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({ filter, setFilter }) => {

    return (
        <div>
            <MyInput
                value={filter.query ?? ''}
                onChange={e => setFilter({ filter, query: e.target.value })}
                type='text'
                placeholder='Поиск...'
            />

            <MySelect
                value={filter.sort}
                onChange={e => setFilter({ filter, sort: e })}
                defaultValue='Сортировка по'
                options={[
                    { id: 1, value: 'title', name: 'По названию' },
                    { id: 2, value: 'body', name: 'По содержанию' },
                ]} />
        </div>
    )
}

export default PostFilter;