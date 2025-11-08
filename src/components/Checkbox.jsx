function Checkbox({ title, checked, onChange }) {
  return (
    <label className="flex items-center w-fit gap-2 cursor-pointer text-gray-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-6"
      />
      <span>{title}</span>
    </label>
  );
}

export default Checkbox;
