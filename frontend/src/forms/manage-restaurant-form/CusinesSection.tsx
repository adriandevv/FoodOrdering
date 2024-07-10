import {
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-options-config";

import { useFormContext } from "react-hook-form";
import CuisineCheckbox from "./CuisineCheckbox";

export const CusinesSection = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <p className="text-gray-500">
          Select the cuisines your restaurant serves
        </p>
      </div>
      <div>
        <FormField
          control={control}
          name="cuisines"
          render={({ field }) => (
            <FormItem>
              <div className="grid md:grid-cols-5 gap-1">
                {cuisineList.map((cuisine) => (
                  <CuisineCheckbox
                    key={cuisine}
                    cuisine={cuisine as string}
                    field={field}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
