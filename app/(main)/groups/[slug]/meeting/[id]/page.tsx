import MeetingPage from "@/components/home/discussion_rooms/MeetingPage"
import { Metadata } from "next"


interface PageProps {
    id: string;
}

export function generateMetadata({ id }: PageProps): Metadata {
    return {
        title: `Meeting ${id} | BeanChillin`,
    }
}


export default function Page({ id }: PageProps) {

    return <MeetingPage id={id} />
}
