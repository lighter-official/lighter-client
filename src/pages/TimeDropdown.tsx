import React from 'react';

interface TimeDropdownProps {
    items: { name: string; value: number }[];
    onSelect: (selectedItem: { name: string; value: number }) => void;
}

const TimeDropdown: React.FC<TimeDropdownProps> = ({ items, onSelect }) => {
    return (
        <div className="relative inline-block">
            <div className="absolute bg-white w-[112px] rounded-md max-h-[150px] overflow-y-auto">
                {items.map((item) => (
                    <div
                        key={item.value}
                        className="h-[50px] text-left p-[16px] cursor-pointer"
                        onMouseDown={() => {
                            onSelect(item);
                        }}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimeDropdown;
