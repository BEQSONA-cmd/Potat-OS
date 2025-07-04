export default function Dock() {
    return (
        <div className="absolute bottom-0 left-0 w-full h-10 bg-black bg-opacity-80 flex items-center justify-center gap-6 px-4 z-50">
            <button className="w-6 h-6 bg-white rounded" title="Files" />
            <button className="w-6 h-6 bg-yellow-500 rounded-full" title="Chrome" />
            <button className="w-6 h-6 bg-gray-700 rounded" title="Empty" />
        </div>
    );
}
