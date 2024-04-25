import './form-input.styles.scss'

const FormInput = ({ label, ...otherProps }) => {
    return (
        <div className='group'>
            <input className='form-input' {...otherProps} />
            {label && (// if label is truthy
                <label className={
                    `${otherProps.value.length ? 'shrink' : ''// if sth typed in, add 'shrink' class
                    } form-input-label`
                }>
                    {label}
                </label>
            )}
        </div>
    )

}

export default FormInput