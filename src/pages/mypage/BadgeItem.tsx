// BadgeItem.tsx
import React from 'react';
import Image from 'next/image';

interface BadgeItemProps {
    src: string;
    title: string;
    date: string;
}

const BadgeItem: React.FC<BadgeItemProps> = ({ src, title, date }) => {
    return (
        <div>
            <div className='w-[153px] h-[154px]' style={{backgroundColor: '#D5C8AE'}}>
                <Image className="z-50" src={src} width={152} height={153} alt={title} />
            </div>
            <div className='mt-[10px] text-[36px]'>{title}</div>
            <div className='mt-[10px] text-[16px]' style={{color:'#8A8170'}}>{date}</div>
        </div>
    );
};

export default BadgeItem;
