"use client";

import MyModal from "@/components/Modal";
import Todos from "@/components/Todos";
import React, { useState, useEffect } from "react";

export interface Activity {
  id: number;
  title: string;
  desc: string;
  state: string;
}

export default function Body() {
  const [items, setItems] = useState<Activity[]>([
    
  ]);
  useEffect (() => {
    if (window.localStorage.getItem("items")) {
      setItems(JSON.parse(localStorage.getItem("items")));
    }
  },[])
  useEffect (() => {
    window.localStorage.setItem("items", JSON.stringify(items))
  },[items])
  
  return (
    <main>
      <MyModal items={items} setItems={setItems} />
      <Todos items={items} setItems={setItems} />
    </main>
  );
}
