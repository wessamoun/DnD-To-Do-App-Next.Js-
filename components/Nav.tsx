
function Nav() {
  
  return (
    <div>
      <div className="h-96 w-full filter blur-3xl opacity-50 -z-40 absolute bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 "></div>
      <div className="flex items-center justify-center px-10 py-5 bg-slate-500/10 shadow-md ">
        <div className="logo text-2xl cursor-pointer">
          <span className="bg-white text-slate-900 rounded-lg p-3 mr-2 font-bold">DnD</span>
          To Do App
        </div>
        
      </div>
    </div>
  );
}

export default Nav;
