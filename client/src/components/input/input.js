import React from 'react'

const Input = (props) => {
    const { onChange, fieldValue, type, value, labelCaption } = props
    const placeholder = `input ${fieldValue}`
    return (
        <div className="input-field">
            <input
                placeholder= {placeholder}
                id={fieldValue}
                type={type}
                name={fieldValue}
                onChange={onChange}
                value={value}
            />
            <label htmlFor={fieldValue}>{labelCaption}</label>
        </div>
    )
}

export default Input