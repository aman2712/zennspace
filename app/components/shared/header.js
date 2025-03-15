import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../ui/logo";

export default function Header() {
    return (
        <header className='flex items-center justify-between'>
            <Logo />
            <Link href="https://x.com/zennspace">
                <FaXTwitter size={25} />
            </Link>
        </header>
    )
}