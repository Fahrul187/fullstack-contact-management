export default function Input({ label, type, id, name, placeholder, required, value, onChange, iconClass }) {
    return (
        <div className="mb-5">
            <label htmlFor={id} className="block text-gray-300 text-sm font-medium mb-2">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className={iconClass} />
                </div>
                <input
                    type={type}
                    id={id}
                    name={name}
                    className="w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder={placeholder}
                    required={required}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}