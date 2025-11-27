export default function Input({
  name,
  placeholder,
  onChangeFunc,
  inputType,
}: {
  name: string;
  placeholder: string;
  onChangeFunc: (e: any) => void;
  inputType?: string;
}) {
  return (
    <div className="flex flex-col gap-2 ">
      <label className=" font-semibold" htmlFor={name}>
        {name}
      </label>
      <input
        type={inputType ? inputType : "text"}
        placeholder={placeholder}
        className="px-2 py-2 mb-2 border-2 border-gray-500 rounded-md"
        onChange={(e) => onChangeFunc(e)}
      />
    </div>
  );
}
