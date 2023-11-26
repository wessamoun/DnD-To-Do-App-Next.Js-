"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Activity } from "@/components/Body";

interface Props {
  items?: Activity[];
  setItems?: React.Dispatch<React.SetStateAction<Activity[]>>;
}

const MyModal: React.FC<Props> = ({ items, setItems }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length === 0) return;
    setItems([
      ...items,
      {
        id: Math.random(),
        title: title,
        desc: desc,
        state: "toDo",
      },
    ]);
    setTitle("")
    setDesc("")

  };

  return (
    <>
      <div className="mt-10 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Add New Task
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add New Task
                  </Dialog.Title>
                  <div className="mt-2">
                    <form action="" onSubmit={handleSubmit}>
                      <label htmlFor="title" className="capitalize text-black">
                        title
                        <input
                          type="text"
                          name="title"
                          placeholder="Title"
                          value={title}
                          
                          onChange={(event) => setTitle(event.target.value)}
                          className="w-full p-2 border outline-none text-black"
                        />
                      </label>
                      <label
                        htmlFor="desc"
                        className="capitalize text-black mt-6 block"
                      >
                        Description
                        <textarea
                          name="description"
                          placeholder="Description"
                          value={desc}
                          onChange={(event) => setDesc(event.target.value)}
                          className="w-full p-2 border outline-none text-black"
                        />
                      </label>

                      <div className="mt-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            
                            closeModal();
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MyModal;
