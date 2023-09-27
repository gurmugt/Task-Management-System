import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addMember } from '../../context/members/actions';
import { useMembersDispatch } from '../../context/members/context';

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const NewMember = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the dispatch function for members
  const dispatchMembers = useMembersDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const closeModal = () => {
    setIsOpen(false);
    setError(null); // Clear any previous errors when closing the dialog
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, email, password } = data;

    try {
      const response = await addMember(dispatchMembers, { name, email, password });

      if (response.ok) {
        closeModal();
      } else {
        setError(response.error as string);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        New Member
      </button>
      <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
  <div className="p-4">
    <h2 className="text-xl font-semibold">Add a New Member</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4">
        <label htmlFor="name" className="block">Name:</label>
        <input type="text" id="name" {...register("name")} />
        {errors.name && <span className="text-red-500">Name is required.</span>}
      </div>

      {/* Email Field */}
      <div className="mt-4">
        <label htmlFor="email" className="block">Email:</label>
        <input type="text" id="email" {...register("email")} />
        {errors.email && <span className="text-red-500">Email is required.</span>}
      </div>

      {/* Password Field */}
      <div className="mt-4">
        <label htmlFor="password" className="block">Password:</label>
        <input type="password" id="password" {...register("password")} />
        {errors.password && <span className="text-red-500">Password is required.</span>}
      </div>

      <div className="mt-4">
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Add Member
        </button>
        <button type="button" onClick={closeModal} className="bg-red-600 text-white py-2 px-4 rounded ml-2">
          Cancel
        </button>
      </div>
    </form>
    {error && <div className="text-red-500 mt-2">{error}</div>}
  </div>
</Dialog>

      </Transition>
    </>
  );
};

export default NewMember;
