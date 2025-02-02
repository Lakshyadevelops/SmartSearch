import { ArrowDownToLineIcon, ChevronDown, GlobeIcon, MessageSquareTextIcon } from 'lucide-react';
import React from 'react';


function Header() {
  const user_img="https://media.gettyimages.com/id/1434940863/photo/brisbane-australia-virat-kohli-poses-during-the-india-icc-mens-t20-cricket-world-cup-2022.jpg?s=612x612&w=0&k=20&c=TSWXnXJbg24zkYiS91HRsnnWGVCdUGIeVMMiGM3iL1U="
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Left - Logo & Primary Navigation */}
      <div className="flex items-center ml-20 gap-2">
        <img
          src="https://www.tbo.com/img/logo.svg"
          alt="Logo"
          className="h-6 w-36"
        />
        {/* <span className="text-[14px] font-semibold text-[#808285] hover:text-[#F26B25] flex items-center cursor-pointer">
          Shop travel
          <ChevronDown className="w-5 h-5 ml-0.5" />
        </span> */}
      </div>

      {/* Right - Navigation Links */}
      <nav className="flex items-center space-x-6 mr-20">
        <img
          src={user_img}
          alt="User Avatar"
          className="h-12 w-12 rounded-full cursor-pointer"
        />
      </nav>
    </header>
  );
}

export default Header;
