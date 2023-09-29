import { useMembersState, useMembersDispatch } from '../../context/members/context';
import { removeMember } from '../../context/members/actions';
import trash from "../../assets/images/trash.png";
export default function MemberListItems() {
  let state: any = useMembersState();
  const dispatchMembers = useMembersDispatch();
  const { members, isLoading, isError, errorMessage } = state;

  const handleRemoveMember = async (member: any) => {
    try {
      const response = await removeMember(dispatchMembers, member.id);
      if (response.ok) {
        // Remove the member from the list without refreshing the page
        const updatedMembers = members.filter((m:any) => m.id !== member.id);
        console.log("updatedMembers", updatedMembers);
      } else {
        console.error('Failed to remove member:', response.error);
      }
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  if (!members || (members.length === 0 && isLoading)) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {members.map((member: any) => (
        <div
          key={member.id}
          className="member block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">Name: {member.name}</h5>
          <p className="text-gray-500 dark:text-gray-400">Email: {member.email}</p>
          <button
            onClick={() => handleRemoveMember(member)} 
         >
          <img
              src={trash}
              style={{
                width: "10%",
                height: "auto",
              }}
              alt="Delete icon"
              className="trash"
              id="new-member-btn"
            />
          </button>
        </div>
      ))}
    </>
  );
}
