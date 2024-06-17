import { Button } from '@/components/common-ui/shadcn-ui/button'
import { Dialog, DialogTrigger } from '@/components/common-ui/shadcn-ui/dialog'
import React from 'react'

type Props = {}

const FilterButton = (props: Props) => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button className="btn btn-primary">Filter</Button>
        </DialogTrigger>
    </Dialog>
  )
}

export default FilterButton