
const MonthSelector = () => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="month" className="font-medium text-gray-700">
        Month:
      </label>
      <select
        id="month"
        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
      >
        <option>Select</option>
        <option>January</option>
        <option>February</option>
        <option>March</option>
        <option>April</option>
        <option>May</option>
        <option>June</option>
        <option>July</option>
        <option>August</option>
        <option>September</option>
        <option>October</option>
        <option>November</option>
        <option>December</option>
      </select>
    </div>
  );
};

export default MonthSelector;
