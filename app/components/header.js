import Image from "next/image";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

export default function Header() {
    return (
        <header className='flex items-center justify-between'>
            <div className='max-w-20 flex items-center'>
                <Image src='/images/logo.png' width={50} height={50} alt="ZennSpace | Logo" />
                <p className='text-2xl font-bauhaus mt-3 tracking-[10px] ml-4 font-semibold'>ZENNSPACE</p>
            </div>
            <Link href="https://x.com/zennspace">
                <FaXTwitter size={25} />
            </Link>
        </header>
    )
}