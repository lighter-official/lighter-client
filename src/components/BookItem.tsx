import React from 'react';

interface BookItemProps {
    imageUrl: string;
    title: string;
    date: string;
}

const BookItem: React.FC<BookItemProps> = ({ imageUrl, title, date }) => {
    return (
        <div>
            <div className='w-[266px] h-[367px]' style={{ backgroundColor: '#D5C8AE', border: '1px solid gray' }}>
                <img className="z-50" src={imageUrl} alt={title} />
            </div>
            <div className='mt-[10px] text-[32px]'>{title}</div>
            <div className='mt-[10px] text-[16px]' style={{ color: '#8A8170' }}>{date}</div>
        </div>
    );
};

export default BookItem;
