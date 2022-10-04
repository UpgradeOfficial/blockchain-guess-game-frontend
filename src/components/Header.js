import React from "react";
import { ConnectButton, Link } from "web3uikit";
const Header = () => {
  return (
    <nav className="p-5 border-b-2 flex flex-col justify-between items-center sm:flex-row">
      <h1 className="py-4 px-4 font-bold text-3xl">Guess Game <span className="text-sm text-zinc-500">by Odeyemi Increase</span></h1>
      <div className="flex flex-row items-center">
        <ConnectButton moralisAuth={false} />
      </div>
      
    </nav>
  );
};

export default Header;
