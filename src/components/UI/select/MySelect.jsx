import React from "react";

const MySelect = ({ options, defaultValue, value, onChange }) => {

    return (
        <select
            style={{ marginTop: '20px' }}
            value={value}
            onChange={e => onChange(e.target.value)}
        >
            <option disabled value=''>{defaultValue}</option>
            {options.map(option =>
                <option key={option.id} value={option.value}> {option.name} </option>
            )}
        </select>
    )
}

export default MySelect;