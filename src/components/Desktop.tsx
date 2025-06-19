'use client';

import { useStore } from '@/lib/store';
import { useState } from 'react';

export default function Desktop() {
  const { files, addFile } = useStore();
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    show: boolean;
  }>({ x: 0, y: 0, show: false });

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, show: true });
  };

  const handleCreateFile = () => {
    addFile(contextMenu.x, contextMenu.y);
    setContextMenu({ ...contextMenu, show: false });
  };

  return (
    <div
      className="w-screen h-screen bg-blue-500 relative"
      onContextMenu={handleRightClick}
      onClick={() => setContextMenu({ ...contextMenu, show: false })}
    >
      {/* FILE ICONS */}
      {files.map((file) => (
        <div
          key={file.id}
          className="absolute w-20 h-20 bg-white rounded-md shadow text-xs text-center flex items-center justify-center cursor-pointer"
          style={{ top: file.y, left: file.x }}
        >
          {file.name}
        </div>
      ))}

      {/* CONTEXT MENU */}
      {contextMenu.show && (
        <ul
          className="absolute bg-gray-800 text-white p-2 rounded shadow"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <li
            className="hover:bg-gray-600 px-2 py-1 cursor-pointer"
            onClick={handleCreateFile}
          >
            New File
          </li>
          <li className="hover:bg-gray-600 px-2 py-1 cursor-pointer">Refresh</li>
        </ul>
      )}
    </div>
  );
}
