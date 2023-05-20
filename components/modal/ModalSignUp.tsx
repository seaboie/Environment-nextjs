import firebase_app from '@/firebase/config';
import { UserType } from '@/types/typeUser';
import { FirebaseError } from 'firebase/app';
import { doc, getFirestore, setDoc, Timestamp } from 'firebase/firestore';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import { FirebaseAuth } from '../../public/firebase/auth/fireAuth';
import { helpersAuthError } from '../../public/utils/firebase/auth/helperAuthError';
import AuthErrorComponent from '../auth/AuthErrorComponent';

type ModalSignUpProps = {
    isSignUp: boolean,
    isClose(): void,
    isClick(value: boolean): void
}

const db = getFirestore(firebase_app);

export default function ModalSignUp({ isSignUp, isClose, isClick }: ModalSignUpProps) {

    if (!isSignUp) return null;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [company, setCompany] = useState("");

    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const [error, setError] = useState<FirebaseError | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    if (!isMenuOpen) {
        isClick(false);
        return null;
    }

    const router = useRouter();

    const closeModal = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const target = e.target as HTMLElement;
        if (target.id === 'signup') {
            isClose();
        }
    }

    const clearField = () => {
        setEmail("")
        setPassword("")
        setFullname("")
        setCompany("")
    }

    const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const { user, err } = await FirebaseAuth.signup(email, password)

        if (err) {
            setError(err)
            setErrorMessage(helpersAuthError.authErrorCodeMessage(err.code))

            clearField()
            return
        }

        const docData: UserType = {
            accountId: "xrKm4SAT6etFj0KEnBOm",
            active: true,
            createdAt: Timestamp.fromDate(new Date(user?.metadata.creationTime ?? "")),
            displayName: fullname,
            email: email,
            fullName: fullname,
            phone: "",
            photo: "",
            role: "guest"
        }

        if (user) {
            const userRef = doc(db, 'users', user.uid);

            await setDoc(userRef, docData)
                .catch((error) => {
                    alert(helpersAuthError.authErrorCodeMessage(error.code))
                })

        }

        router.push("/profile/verified-email");

        clearField()

    }

    const handleFocus = () => {
        setError(null);
    }

    return (
        <div className='absolute w-screen h-screen bg-black bg-opacity-40 grid place-items-center'
            id='signup'
            onClick={(e) => closeModal(e)}
        >
            <div className='w-fit h-fit bg-white border-borderModal border-2 shadow-shadowModal px-8 pb-8 pt-14 grid place-items-center'>
                <div className='w-16 h-16 grid place-items-center'>
                    <Image
                        src={"../svg/auth/signup.svg"}
                        width={60}
                        height={60}
                        alt="Logo"
                        priority
                        className='w-full h-auto'
                    />
                </div>

                <div className='mb-[75px] mt-6 text-xl font-medium'>Sign up</div>

                <form onSubmit={handleSignup}>

                    <div className='grid gap-4 min-w-[320px]'>
                        {
                            error && (
                                <AuthErrorComponent errorMessage={errorMessage} />
                            )
                        }

                        <div className=' h-9 border-borderTextField border-[1px] rounded-md overflow-hidden flex '>
                            <div className='w-14 h-full bg-authIconBg grid place-items-center'>
                                <div className='w-7 h-5 grid place-items-center'>
                                    <Image
                                        src={"../svg/auth/auth_profile.svg"}
                                        width={20}
                                        height={20}
                                        alt="Logo"
                                        priority
                                    />
                                </div>
                            </div>
                            <div className='w-full h-full'>

                                <input
                                    type="text"
                                    name='fullname'
                                    id='fullname'
                                    value={fullname}
                                    placeholder='Full name'
                                    // required
                                    className='w-full h-full px-2'
                                    onFocus={handleFocus}
                                    onChange={(e) => setFullname(e.target.value)}
                                />

                            </div>
                        </div>
                        <div className=' h-9 border-borderTextField border-[1px] rounded-md overflow-hidden flex'>
                            <div className='w-14 h-full bg-authIconBg grid place-items-center'>
                                <div className='w-7 h-5 grid place-items-center'>
                                    <Image
                                        src={"../svg/auth/company.svg"}
                                        width={20}
                                        height={20}
                                        alt="Logo"
                                        priority
                                    />
                                </div>
                            </div>
                            <div className='w-full h-full'>

                                <input
                                    type="text"
                                    name='company'
                                    id='company'
                                    value={company}
                                    placeholder='Company'
                                    // required
                                    className='w-full h-full px-2'
                                    onFocus={handleFocus}
                                    onChange={(e) => setCompany(e.target.value)}
                                />

                            </div>
                        </div>
                        <div className=' h-9 border-borderTextField border-[1px] rounded-md overflow-hidden flex '>
                            <div className='w-14 h-full bg-authIconBg grid place-items-center'>
                                <div className='w-7 h-5'>
                                    <Image
                                        src={"../svg/auth/auth_email.svg"}
                                        width={60}
                                        height={60}
                                        alt="Logo"
                                        priority
                                    />
                                </div>
                            </div>
                            <div className='w-full h-full'>

                                <input
                                    type="email"
                                    name='email'
                                    id='email'
                                    value={email}
                                    placeholder='Email address'
                                    // required
                                    className='w-full h-full px-2'
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={handleFocus}

                                />

                            </div>
                        </div>
                        <div className=' h-9 border-borderTextField border-[1px] rounded-md overflow-hidden flex'>
                            <div className='w-14 h-full bg-authIconBg grid place-items-center'>
                                <div className='w-7 h-5 grid place-items-center'>
                                    <Image
                                        src={"../svg/auth/auth_key.svg"}
                                        width={18}
                                        height={20}
                                        alt="Logo"
                                        priority
                                    />
                                </div>
                            </div>
                            <div className='w-full h-full'>

                                <input
                                    type="password"
                                    name='password'
                                    id='password'
                                    value={password}
                                    placeholder='Password'
                                    // required
                                    title="รหัสผ่าน"
                                    className='w-full h-full px-2'
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={handleFocus}
                                />

                            </div>
                        </div>

                        <button onClick={() => { }} type='submit' className=' h-10 bg-black hover:bg-green-900 rounded-md grid place-items-center'>
                            <div className='text-white text-lg font-medium'>SIGN UP</div>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
