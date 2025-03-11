import Image from "next/image";
import EmailSubscription from "../components/email-subscription";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

export default function MobilePage() {
    return (
        <div className="flex min-h-screen items-center justify-center flex-col mobile_home p-4 text-center">
            <div className='flex-grow flex-col flex items-center justify-center'>
                <div className='flex items-center'>
                    <Image src='/images/logo.png' width={50} height={50} alt="ZennSpace | Logo" />
                    <p className='text-2xl font-bauhaus mt-3 tracking-[10px] ml-4 font-semibold'>ZENNSPACE</p>
                </div>
                <p className='pt-10'>We&apos;re starting with a desktop experience first.<br />Stay tuned - mobile support is on the way! 🚀</p>
                <p className='pt-20'>Sign up for our newsletter and get exclusive updates straight to your inbox!</p>
                <EmailSubscription noLabel={true} />
            </div>
            <div className="pb-20">
                <Link href="https://x.com/zennspace">
                    <FaXTwitter size={25} />
                </Link>
            </div>
        </div>
    );
}
