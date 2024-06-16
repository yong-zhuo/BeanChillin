
import Image from "next/image";

interface ChatHeaderProps {
    name: string | null;
    imageUrl: string | null;
}

export default function ChatHeader({ params }: { params: ChatHeaderProps }) {
    const { name, imageUrl } = params;

    return (
        <div className="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]">
            <div className='flex sm:items-center justify-between py-3 border-b-2 border-gray-200'>
                <div className='relative flex items-center space-x-4'>
                    <div className='relative'>
                        <div className='relative w-8 sm:w-12 h-8 sm:h-12'>
                            <Image
                                src={imageUrl === null ? "/profile/default.jpg" : imageUrl}
                                alt={`${name} profile picture`}
                                className='rounded-full'
                                width={50}
                                height={50}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col leading-tight">
                        <div className="text-xl flex items-center">
                            <span className='text-gray-700 mr-3 font-semibold'>{name}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )



}