import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Activity } from "@/components/Body";

export interface Props {
  item?: Activity;
  items?: Activity[];
  setItems?: React.Dispatch<React.SetStateAction<Activity[]>>;
}

export const SortableItem: React.FC<Props> = ({ item, items, setItems }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  const deleteTask = (): void => {
    
    setItems(items.filter((task) => task.id !== item.id))
    window.localStorage.setItem("items", JSON.stringify(items));
  };

  return (
    <div
      className="p-3 w-full bg-slate-300 mb-3 hover:bg-slate-400 text-black rounded-lg cursor-grab"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="flex gap-2 justify-between w-full flex-wrap">
        <div className="flex gap-2 items-center flex-wrap ">
          <div>{item.title}</div>
        </div>
        <div
          onClickCapture={(e) => {
            deleteTask();
            
          }}
          className={`${item.title === "No Tasks" ? "hidden" : "flex"} w-5 h-5 cursor-pointer rounded-full hover:bg-red-600 justify-center items-center hover:text-white transition-all`}
        >
          X
        </div>
      </div>
      <div className="text-slate-500 font-light max-w-full ">{item.desc}</div>
    </div>
  );
};
