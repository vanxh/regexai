type ChipProps = {
  value: string;
  onDelete: () => void;
};

const Chip = ({ value, onDelete }: ChipProps) => {
  return (
    <div className="my-1.5 mr-2 inline-flex items-center rounded-full bg-blue-400 px-3 py-1 text-sm font-medium text-white">
      <span>{value}</span>
      <button
        className="ml-2 text-xl text-white focus:outline-none"
        onClick={onDelete}
      >
        &times;
      </button>
    </div>
  );
};

export { Chip };
