import { useMembersState, useMembersDispatch } from '../../context/members/context';
import { removeMember } from '../../context/members/actions';

export default function MemberListItems() {
  let state: any = useMembersState();
  const dispatchMembers = useMembersDispatch();
  const { members, isLoading, isError, errorMessage } = state;

  const handleRemoveMember = async (member: any) => {
    try {
      const response = await removeMember(dispatchMembers, member.id);
      if (response.ok) {
        // Remove the member from the list without refreshing the page
        const updatedMembers = members.filter((m: any) => m.id !== member.id);
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
          className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">Name:{member.name}</h5>
          <p className="text-gray-500 dark:text-gray-400">Email: {member.email}</p>
          <button
            onClick={() => handleRemoveMember(member)} // Pass the member object
            className="mt-2 bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}
