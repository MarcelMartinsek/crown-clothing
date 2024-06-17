import { useState } from 'react';
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { SignUpContainer, OpeningQuestion } from './sign-up-form.styles'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(formFields)
        const { displayName, email, password, confirmPassword } = formFields
        if (!(password === confirmPassword)) {
            alert("Password confirmation Failed")
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            const userDocRef = await createUserDocumentFromAuth(user, { displayName });

            resetFormFields();
        } catch (error) {
            if (error.code == 'auth/email-already-in-use') {
                alert("Email already in use!")
            }
            console.log("User creation encountered an error:", error);
        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }
    return (
        <SignUpContainer>
            <OpeningQuestion>Don't have an account?</OpeningQuestion>
            <span>Sign Up With Email/Password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Display Name"
                    type="text"
                    required onChange={handleChange}
                    name='displayName'
                    value={displayName}
                />
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
                <FormInput
                    label="Confirm Password"
                    type="password"
                    required onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    );
}

export default SignUpForm