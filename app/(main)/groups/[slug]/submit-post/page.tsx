import Button from '@/components/common-ui/button/Button'
import React from 'react'

interface PageProps {
    params: {
        slug:string
    }
}

const page =  async ({params}: PageProps) => {
    //Logic to check if group exists
    /*const group = await prisma.group.findFirst({
        where: {
            name: params.slug,
        },
    })*/
    //if (!group) return notFound()
        return (
            <div className='flex flex-col items-start gap-6'>
              
              <div className='border-b border-gray-200 pb-5'>
                <div className='-ml-2 -mt-2 flex flex-wrap items-baseline'>
                  <h3 className='ml-2 mt-2 text-base font-semibold leading-6 text-gray-900'>
                    Create Post
                  </h3>
                  <p className='ml-2 mt-1 truncate text-sm text-gray-500'>
                    in {params.slug}
                  </p>
                </div>
              </div>
        
              <div className='w-full flex justify-end'>
                <Button action='submit' addClass='w-full' >
                  Post
                </Button>
              </div>
            </div>
          )
}

export default page