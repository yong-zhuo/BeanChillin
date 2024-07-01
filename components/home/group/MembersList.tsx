import { Group, Membership, User } from "@prisma/client"
import MembersPreview from "./MembersPreview"
import prisma from "@/lib/prisma"
import { getFriendCount } from "@/lib/friends/getFriendCount"



interface MembersListProps {
    members: User[] 
    group?: Group
    currUser?: User | null
}

const MembersList = async (props: MembersListProps) => {
    const membersFriendCount = await getFriendCount(props.members)

  return (
    <div>{props.members.map((member) => <MembersPreview otherUser={member} friends={membersFriendCount[member.id]} key={member.id} group={props.group} currUser={props.currUser}/>)}</div>
  )
}

export default MembersList