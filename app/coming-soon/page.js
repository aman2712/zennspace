import EmailSubscription from "../components/ui/email-subscription";
import Header from "../components/shared/header";

export default function ComingSoon() {

  return (
    <div className='px-20 py-10 home_page min-h-screen h-auto'>
      <Header />
      <div className='mt-14 max-w-1/2'>
        <p className='text-lg tracking-wide'>We&apos;re almost there</p>
        <h1 className='text-[10rem] leading-40 -ml-4 mt-2 tracking font-semibold'>Coming Soon</h1>
        <p className=' max-w-4/5 mt-10'>Join our newsletter to be the first to know when ZennSpace launches and recieve updates on the latest features and tips for productivity!</p>

        <EmailSubscription />
      </div>
    </div>
  )
}
