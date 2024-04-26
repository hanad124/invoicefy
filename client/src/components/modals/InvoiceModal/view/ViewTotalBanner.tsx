const ViewTotalBanner = ({ total }: { total: number }) => {
  return (
    <div className="flex flex-col w-72 border p-4 gap-y-2  bg-[#f6f6f6] rounded-md">
      <div className="flex justify-between">
        <span className="font-medium">Subtotal</span>
        <span className="font-medium">${total}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium">Tax</span>
        <span className="font-medium">{(total * 0.1).toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium">Total</span>
        <span className="font-medium">${total + total * 0.1}</span>
      </div>
    </div>
  );
};

export default ViewTotalBanner;
