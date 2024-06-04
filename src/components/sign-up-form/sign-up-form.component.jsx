import { useState, useContext } from 'react';
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-up-form.styles.scss'
import { UserContext } from '../../contexts/user.context';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const { setCurrentUser } = useContext(UserContext)

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
            setCurrentUser(user)

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
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
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
        </div>
    );
}

export default SignUpForm