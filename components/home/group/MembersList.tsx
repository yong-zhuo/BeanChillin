import { Group, Membership, User } from "@prisma/client"
import MembersPreview from "./MembersPreview"
import prisma from "@/lib/prisma"
import { getFriendCount } from "@/lib/friends/getFriendCount"
import { getGroupModStatus } from "@/lib/group/groupActions"



interface MembersListProps {
    members: User[] 
    group?: Group
    currUser?: User | null
    forBan?: boolean
}

const MembersList = async (props: MembersListProps) => {

  const moderator = await prisma.moderator.findFirst({
    where: {
      groupId: props.group?.id,
      userId: props.currUser?.id,
    },
  });
  const isCurrUserMod = !!moderator;

  let membersFriendCount: Record<string, number> = {}
  let membersModStatus: Record<string, boolean> = {}
  if (props.forBan) {
    membersFriendCount = await getFriendCount(props.members)
    return (
      <div>{props.members.map((member) => <MembersPreview otherUser={member} friends={membersFriendCount[member.id]} key={member.id} group={props.group} currUser={props.currUser}  forBan/>)}</div>
    )
  } else {
    [membersFriendCount, membersModStatus] = await Promise.all([getFriendCount(props.members),getGroupModStatus(props.members, props.group?.id as string)])
    return (
      <div>{props.members.map((member) => <MembersPreview otherUser={member} friends={membersFriendCount[member.id]} key={member.id} group={props.group} currUser={props.currUser} isModerator = {membersModStatus[member.id]} isCurrUserMod={isCurrUserMod}/>)}</div>
    )
  }
    
  
}

export default MembersList