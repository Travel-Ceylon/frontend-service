import React from 'react';

function BillViewer({
  image,
  title,
  subtitle,
  sections = [],
  totalAmount,
  id
}) {
  return (
    <div className='max-w-xl p-4 md:p-8 rounded-md bg-white border border-gray-200 max-h-fit mx-auto'>
      {/* Top Info */}
      <div className='grid grid-cols-[1fr_2fr] gap-4'>
        <img src={image} className='max-w-full max-h-32 rounded-md' alt="Preview" />
        <div className='flex flex-col items-start justify-end'>
          <h3 className='text-2xl font-semibold'>{title}</h3>
          <p className='text-lg'>{subtitle}</p>
        </div>

      </div>

      <p className='text-base my-4 text-gray-700'>
        <span className='text-gray-500'>TRANSACTION ID: </span> {id?.toString()}
      </p>

      {/* Sections */}
      {sections.map((section, sIdx) => (
        <div key={sIdx}>
          <hr className='mt-4' />
          <h4 className='mt-4 text-xl font-semibold text-black/70'>{section.heading}</h4>
          <div className='ml-8 mt-4 space-y-2'>
            {section.items.map((item, iIdx) => (
              <div key={iIdx} className='flex justify-between items-center gap-8 text-black/70'>
                <p>{item.label}</p>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Total */}
      {totalAmount && (
        <>
          <hr className='mt-4' />
          <div className='ml-8 mt-4'>
            <div className='flex justify-between gap-8 items-center text-black/70 font-semibold'>
              <p>Total Amount</p>
              <p>{totalAmount}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BillViewer;