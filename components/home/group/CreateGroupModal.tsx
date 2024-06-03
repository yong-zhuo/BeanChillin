import Button from "@/components/common-ui/button/Button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
} from "@/components/common-ui/shadcn-ui/dialog";

const CreateGroupModal = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            text="Create Group"
            action="button"
            addClass="shadow bg-pri text-sec mt-2 mb-2 hover:bg-slate-500"
          />
        </DialogTrigger>
        <DialogContent className="w-[400px] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create your Group</DialogTitle>
            <DialogDescription>
              Please fill in all fields. Click create to create your new Group.
            </DialogDescription>
          </DialogHeader>
          <div>
            <form>
                
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateGroupModal;
