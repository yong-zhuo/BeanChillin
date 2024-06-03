import Button from "@/components/common-ui/button/Button";

const Messaging = () => {
  return (
    <div>
      <Button
        isCircular
        action="button"
        orientation="left"
        src="/home/messaging.svg"
        width={30}
        height={30}
        alt="message"
        addClass="h-12 w-12 border-2 border-pri cursor-pointer focus:outline-none focus:ring-0 hover:ring-2 ring-pri m-0 p-0"
      />
    </div>
  );
};

export default Messaging;
