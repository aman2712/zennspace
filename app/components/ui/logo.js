import Image from "next/image";

export default function Logo(){
    return (
        <div className='flex items-center'>
            <Image src='/images/logo.png' width={50} height={50} alt="ZennSpace | Logo" />
            <p className='text-2xl font-bauhaus mt-3 tracking-[10px] ml-4 font-semibold select-none'>ZENNSPACE</p>
        </div>
    )
}