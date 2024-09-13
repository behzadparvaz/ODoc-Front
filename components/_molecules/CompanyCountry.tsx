import React, { ChangeEvent, useState } from 'react';

import { TickIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import { OrderCompanyCountryDataModel } from '@utilities/interfaces/order';
import { Radio } from '@com/_atoms/Radio';

type CompanyNameProps = {
  data?: OrderCompanyCountryDataModel[];
};

const CompanyName = ({ data }: CompanyNameProps) => {
  const [value, setValue] = useState<number | string>('1');

  const handleSelectCompanyName = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    // call post api should be here
  };

  return (
    <div className="h-max flex flex-col gap-y-2">
      {data?.map((item) => (
        <div className="flex justify-between items-center" key={item?.id}>
          <Radio
            className="w-max"
            handleChange={handleSelectCompanyName}
            label={`کشور سازنده: ${item?.name}`}
            name={item?.name}
            checked={value === item?.id}
            value={item?.id}
            icon={
              <TickIcon
                width={15}
                height={15}
                stroke={colors.white}
                className="mx-auto mt-[1px]"
              />
            }
          />
          <span className="w-max text-sm leading-5">{`${item?.price} تومان`}</span>
        </div>
      ))}
    </div>
  );
};

export default CompanyName;
