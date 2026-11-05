const FormDataDisplayField = ({label,value,}) => {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-bold text-gray-800 w-1/5">
        {label}
      </label>

      <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 w-4/5">
        <p className="text-sm font-medium text-gray-700">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
};

export default FormDataDisplayField;