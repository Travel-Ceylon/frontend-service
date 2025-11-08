import React, { useState } from 'react';
import { SquarePen } from 'lucide-react';
import { Save } from 'lucide-react';

function DescriptionEditor({content,updateDescription}) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(content);

    const handleToggle = () => {
        if(isEditing){
            updateDescription({description:text});
        }
        setIsEditing((prev) => !prev);
    };

    return (
        <div>
                {isEditing ? (
                    <textarea
                    rows={8}
                        className="w-full p-4 bg-white border border-gray-300 rounded-md resize-y text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                ) : (
                    <p className="border-2 border-gray-200 p-4 rounded-md mt-2 text-sm leading-relaxed text-black/80 whitespace-pre-line">
                        {text}
                    </p>
                )}

                <div className="flex justify-end items-center mt-3">
                    <button
                        onClick={handleToggle}
                        className="cursor-pointer"
                    >
                        {isEditing ? <Save className='size-6' /> : <SquarePen className='size-6' />}
                    </button>
                </div>
            </div>
    );
}

export default DescriptionEditor;
