import firebase_app from "@/firebase/config"
import {  createUserWithEmailAndPassword, getAuth, IdTokenResult, sendEmailVerification, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth"



export const FirebaseAuth = {
    signup: async (email: string, password: string) => {
        const auth = getAuth(firebase_app);

        const mail = email.trim()
        const pass = password.trim()

        let user: User | null = null;
        let err: any = null;

        try {
            await createUserWithEmailAndPassword(auth, mail, pass)
                .then((userCredential) => {
                    user = userCredential.user;
                    sendEmailVerification(user)
                })
                .then(() => signOut(auth))
                .catch (error => {
                    err = error;
                })

        } catch (error: any) {
            alert(error)
        }

        return { user, err }
    },
    signin: async (email: string, password: string) => {

        const auth = getAuth(firebase_app);

        let user: User = {
            emailVerified: false,
            isAnonymous: false,
            metadata: {},
            providerData: [],
            refreshToken: "",
            tenantId: null,
            delete: function (): Promise<void> {
                throw new Error("Function not implemented.");
            },
            getIdToken: function (forceRefresh?: boolean | undefined): Promise<string> {
                throw new Error("Function not implemented.");
            },
            getIdTokenResult: function (forceRefresh?: boolean | undefined): Promise<IdTokenResult> {
                throw new Error("Function not implemented.");
            },
            reload: function (): Promise<void> {
                throw new Error("Function not implemented.");
            },
            toJSON: function (): object {
                throw new Error("Function not implemented.");
            },
            displayName: null,
            email: null,
            phoneNumber: null,
            photoURL: null,
            providerId: "",
            uid: ""
        }
        let err: any = null;

        const mail = email.trim()
        const pass = password.trim()

        try {
             await signInWithEmailAndPassword(auth, mail, pass)
                .then((userCredential: UserCredential) => {
                    
                    user = userCredential.user;
                })
                
                .catch (error => {
                    err = error;
                    // alert(err.code)
                })
                
        } catch (error: any) {
            alert(`Oops !! ${error}`);
            alert("have problem")

        }
        return { user, err }
    }
}