import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common-ui/shadcn-ui/card";
import { Bean } from "lucide-react";
import HomeFeed from "../feed/HomeFeed";

const HomeCard = () => {
  return (
    <div>
      <Card className="mt-7 h-full mb-5">
        <CardContent className="mt-3 flex flex-col justify-center">
          <CardHeader className="flex justify-center items-center">
            <Bean size={50} color="#4D869C" />
          </CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Welcome to BeanChillin
          </CardTitle>
          <p className="text-center text-zinc-500">
            BeanChillin is a platform for discussing topics and meeting new friends. Create
            groups, share memories and stay connected.
          </p>
        </CardContent>
      </Card>
      <HomeFeed />
    </div>
  );
};

export default HomeCard;
