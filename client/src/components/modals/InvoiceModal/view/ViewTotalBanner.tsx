const ViewTotalBanner = ({ total }: { total: number }) => {
  return (
    <div className="flex flex-col w-72 border p-4 gap-y-2 rounded-md">
      <div className="flex justify-between">
        <span className="text-sm">Subtotal</span>
        <span className="text-sm">${total}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm">Tax</span>
        <span className="text-sm">{(total * 0.1).toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm">Total</span>
        <span className="text-sm">${total + total * 0.1}</span>
      </div>
    </div>
  );
};

export default ViewTotalBanner;
