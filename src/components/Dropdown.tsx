import React, { useState } from 'react';

type DropdownItem = {
  name: string;
  value: number;
};

interface DropdownProps {
  items: DropdownItem[];
  onSelect: (selectedItem: DropdownItem) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, onSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

  const handleSelect = (item: DropdownItem) => {
    setSelectedItem(item);
    setIsDropdownOpen(false);
    onSelect(item);
  };

  if (!items || items.length === 0) {
    return null;
  }


  return (
    <div className="relative inline-block">
      <button
        onClick={() => {
          setIsDropdownOpen((prev) => !prev);
        }}
        className="w-[112px] bg-white h-[40px] rounded-md flex items-center justify-between p-[16px]"
      >
        <div className={`${selectedItem?.name === '선택' && 'text-[#a0a0a0]'} w-fit`}>
          {selectedItem?.name || '선택'}
        </div>
        <div className={`${isDropdownOpen && 'rotate-180'}`} />
      </button>
      <div
        className={`${
          isDropdownOpen ? '' : 'hidden'
        } absolute bg-white w-[112px] rounded-md max-h-[150px] overflow-y-auto`}
      >
        {items.map((item) => (
          <div
            key={item.value}
            className="h-[50px] text-left p-[16px] cursor-pointer"
            onMouseDown={() => {
              setSelectedItem(item);
              setIsDropdownOpen(false);
              handleSelect(item);
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
