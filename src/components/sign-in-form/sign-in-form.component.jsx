import { SignInContainer, OpeningQuestion, ButtonsContainer } from './sign-in-form.styles'
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';


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
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const { email, password } = formFields
        try {
            await signInAuthUserWithEmailAndPassword(email, password);
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
                    // console.log(error)
                    break;
            }
        }
    }



    return (
        <SignInContainer>
            <OpeningQuestion>Already have an account?</OpeningQuestion>
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
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={logGoogleUser}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
}

export default SignInForm