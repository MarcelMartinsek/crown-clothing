import './sign-in-form.styles.scss'
import { signInUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = (props) => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(formFields)
        const { email, password } = formFields
        try {
            const { user } = await signInUserWithEmailAndPassword(email, password);
            console.log(user)

            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password or email');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;

                default:
                    alert("User sign-in encountered an error:", error)
                    break;
            }
        }
    }



    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required onChange={handleChange}
                    name='email'
                    value={email}
                />
                <FormInput
                    label="Password"
                    type="password"
                    required onChange={handleChange}
                    name='password'
                    value={password}
                />
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={logGoogleUser}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm