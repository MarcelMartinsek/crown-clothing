import { FormInputGroup, FormInputElement, FormInputLabel } from './form-input.styles.jsx'

const FormInput = ({ label, ...otherProps }) => {
    return (
        <FormInputGroup>
            <FormInputElement className='form-input' {...otherProps} />
            {label && (// if label is truthy
                <FormInputLabel shrink={otherProps.value.length}>
                    {label}
                </FormInputLabel>
            )}
        </FormInputGroup>
    )

}

export default FormInput