import { useEffect, useState } from "react";

import {
  FieldErrors,
  FieldValues,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import { FiTrash2 } from "react-icons/fi";
import Input from "../../Input";

interface ItemListItemProps {
  id: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  watch: UseFormWatch<FieldValues>;
  setCustomValue: (id: string, value: any) => void;
  remove: UseFieldArrayRemove;
  index: number;
  calculateTotal?: () => void;
}

const ItemListItem: React.FC<ItemListItemProps> = ({
  id,
  required,
  register,
  errors,
  watch,
  setCustomValue,
  remove,
  index,
  calculateTotal,
}) => {
  const quantity = watch(`${id}.quantity`);
  const price = watch(`${id}.price`);

  const [total, setTotal] = useState("0");

  useEffect(() => {
    const value = (quantity * price).toFixed(2);
    setTotal(`${value}`);
    calculateTotal && calculateTotal();
    setCustomValue(`${id}.total`, value);
  }, [quantity, price]);

  return (
    <div className="grid items-center grid-cols-12 gap-4">
      <div className="col-span-12 sm:col-span-5">
        <Input
          label="Item Name"
          id={`${id}.name`}
          required={required}
          register={register}
          errors={errors}
          itemIndex={index}
        />
      </div>
      <div className="col-span-4 sm:col-span-2">
        <Input
          label="Qty."
          id={`${id}.quantity`}
          type="number"
          required={required}
          register={register}
          errors={errors}
          itemIndex={index}
        />
      </div>
      <div className="col-span-4 sm:col-span-2">
        <Input
          label="Price"
          id={`${id}.price`}
          type="number"
          required={required}
          register={register}
          errors={errors}
          itemIndex={index}
        />
      </div>
      <div className="flex flex-col sm:justify-center col-span-3 sm:col-span-2 text-[12px] font-bold">
        <span className="block sm:hidden pb-5 text-xs font-medium leading-4 text-[#7E88C3] dark:text-[#DFE3FA]">
          Total
        </span>
        {total}
      </div>
      <div>
        <button
          type="button"
          onClick={() => remove(index)}
          className="flex justify-center w-full pt-5 sm:pt-0"
        >
          {/* <Delete /> */}
          <FiTrash2 className="text-slate-600 dark:text-slate-600" />
        </button>
      </div>
    </div>
  );
};

export default ItemListItem;
