export const Balance = ({ value }) => {
  return (
    <div className="flex">
      <div className="font-bold text-lg text-gray-700">Your balance is :</div>
      <div className="font-semibold ml-2 text-gray-600 text-lg">Rs {value}</div>
    </div>
  );
};
