'use client'
import { Button } from '@/components/common-ui/shadcn-ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/common-ui/shadcn-ui/dialog';
import { Settings } from 'lucide-react';
import React, { useState } from 'react'

type Props = {}

const SettingsButton = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button
      className="flex w-fit flex-row items-center justify-center gap-1 bg-gray-400 text-white transition hover:scale-105 hover:bg-gray-600"
     
    >
      Settings
      <Settings className="h-5 w-5" />
    </Button>
        </DialogTrigger>
        <DialogContent
          className="max-h-[90vh] w-[300px] overflow-y-auto sm:w-[800px] sm:max-w-[425px] "
          onInteractOutside={(e) => {
            if (isLoading)
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>[Work In Progress] Edit your profile</DialogTitle>
            <DialogDescription>
              Set your new details and click change once you are done.
            </DialogDescription>
          </DialogHeader>

          <form>
            
            
             
            

          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
  
}

export default SettingsButton