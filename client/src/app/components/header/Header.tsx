import Link from 'next/link'
import s from './Header.module.css'
import Image from 'next/image'

const Header = () => (
    <header className={s.header}>
        <Link href='/' className={s.logo}>To-Do</Link>
        <div className={s.userName} >UserName</div>
        <Link href='/pages/profile'>
        <Image src='profileIcon.svg' alt='profile Icon' width={35} height={35} />
        </Link>
    </header>
)

export { Header }