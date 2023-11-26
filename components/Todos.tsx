"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface Props {
  items?: Activity[];
  setItems?: React.Dispatch<React.SetStateAction<Activity[]>>;
}

import { SortableItem } from "./SortableItem";
import { Activity } from "@/components/Body";
const Todos: React.FC<Props> = ({ items, setItems }) => {
  const [itemsDone, setItemsDone] = useState<Activity[]>(
    items.filter((item) => item.state === "done")
  );
  const [itemsToDo, setItemsToDo] = useState<Activity[]>(
    items.filter((item) => item.state === "toDo")
  );
  const [itemsProgress, setItemsProgress] = useState<Activity[]>(
    items.filter((item) => item.state === "progress")
  );
  const placeHolder = {
    done: {
      id: Math.random(),
      title: "No Tasks",
      desc: "",
      date: "",
      state: "done",
    },
    todo: {
      id: Math.random(),
      title: "No Tasks",
      desc: "",
      date: "",
      state: "toDo",
    },
    progress: {
      id: Math.random(),
      title: "No Tasks",
      desc: "",
      date: "",
      state: "progress",
    },
  };
  const sets = useCallback(() => {
    items.filter((item) => item.state === "done").length === 0
      ? setItemsDone([placeHolder.done])
      : setItemsDone(items.filter((item) => item.state === "done"));
    items.filter((item) => item.state === "toDo").length === 0
      ? setItemsToDo([placeHolder.todo])
      : setItemsToDo(items.filter((item) => item.state === "toDo"));
    items.filter((item) => item.state === "progress").length === 0
      ? setItemsProgress([placeHolder.progress])
      : setItemsProgress(items.filter((item) => item.state === "progress"));
  }, [
    items,
    itemsDone,
    itemsProgress,
    itemsToDo,
    placeHolder.done,
    placeHolder.progress,
    placeHolder.todo,
  ]);
  useEffect(() => {
    sets();
  }, [items.length]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    >
      <div className="flex flex-col lg:flex-row justify-around mt-16 gap-5 mx-5 overflow-auto">
        <div className="bg-slate-500/10 shadow-md min-w-[300px] p-2 rounded-xl">
          <h3 className="mb-3">To Do</h3>
          <SortableContext
            items={itemsToDo}
            strategy={verticalListSortingStrategy}
            id="toDo"
          >
            {itemsToDo.map((item: Activity) => (
              <SortableItem
                key={item?.id}
                item={item || placeHolder.todo}
                items={items}
                setItems={setItems}
              />
            ))}
          </SortableContext>
        </div>
        <div className="bg-slate-500/10 shadow-md min-w-[300px] p-2 rounded-xl ">
          <h3 className="mb-3">Progression</h3>
          <SortableContext
            items={itemsProgress}
            strategy={verticalListSortingStrategy}
            id="progress"
          >
            {itemsProgress.map((item: Activity) => (
              <SortableItem
                key={item?.id}
                item={item || placeHolder.progress}
                items={items}
                setItems={setItems}
              />
            ))}
          </SortableContext>
        </div>
        <div className="bg-slate-500/10 shadow-md min-w-[300px] p-2 rounded-xl">
          <h3 className="mb-3">Done</h3>
          <SortableContext
            items={itemsDone}
            strategy={verticalListSortingStrategy}
            id="done"
          >
            {itemsDone.map((item: Activity) => (
              <SortableItem
                key={item?.id}
                item={item || placeHolder.done}
                items={items}
                setItems={setItems}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );

  function handleDragEnd(event) {}

  function handleDragOver(event: DragOverEvent) {
    const { active, over, collisions } = event;

    const holden = items.filter((item) => item.id === active.id)[0];

    if (!holden) return;

    holden.state = over.data.current.sortable.containerId;
    sets();
  }

  function handleDragStart(event) {
    const { active, over } = event;
  }
};

export default Todos;
