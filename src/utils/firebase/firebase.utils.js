import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore'



const firebaseConfig = {
    apiKey: "AIzaSyC4AvxkwSOiyyYdrhKUYP_hwSNRVUXbcoI",
    authDomain: "react-course-db-39faf.firebaseapp.com",
    projectId: "react-course-db-39faf",
    storageBucket: "react-course-db-39faf.appspot.com",
    messagingSenderId: "550032041749",
    appId: "1:550032041749:web:3345ea7751e71232786b1c"
};


// const firebaseApp = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();


export async function addCollectionAndDocuments(collectionKey, objectsToAdd) {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
}

export async function getCategoriesAndDocuments(collection_name) {
    const collectionRef = collection(db, collection_name);
    const q = query(collectionRef);

    const qSnapshot = await getDocs(q);
    return qSnapshot.docs.map(docSnapshot => docSnapshot.data());
}


export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            alert("User creation encountered an error:", error)
            // console.log("Error during user creation.", error.message);
        }
    }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return null;

    return signInWithEmailAndPassword(auth, email, password)
    // .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     // ...
    // })
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode, errorMessage)
    // });
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
    if (callback) {
        return onAuthStateChanged(auth, callback);
    }
}