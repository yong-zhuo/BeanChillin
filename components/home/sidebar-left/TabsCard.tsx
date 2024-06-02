import Button from "@/components/common-ui/button/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common-ui/shadcn-ui/card";
import { tabsButton } from "@/constants/tabsContent";

const TabsCard = () => {
  return (
    <Card className="">
      <CardContent className="p-2 m-2">
        {tabsButton.map((tab) => (
          <Button
            key={tab.alt}
            action="button"
            addClass="bg-transparent hover:bg-sec gap-4 justify-start font-semibold text-xl mt-3 mb-3 px-2"
            text={tab.text}
            height={30}
            width={30}
            orientation="left"
            src={tab.src}
            alt={tab.alt}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default TabsCard;
