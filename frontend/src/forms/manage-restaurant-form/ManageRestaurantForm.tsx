import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { CusinesSection } from "./CusinesSection";
import { Separator } from "@/components/ui/separator";
import { MenuSection } from "./MenuSection";
import { ImageSection } from "./ImageSection";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/LoadingButton";

const formSchema = z.object({
  restaurantName: z.string({
    required_error: "Restaurant name is required",
  }),
  city: z.string({
    required_error: "City is required",
  }),
  country: z.string({
    required_error: "Country is required",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "Delivery price is required",
    invalid_type_error: "Delivery price must be a number",
  }).min(1, { message: "Delivery price must be greater than or equal to 0" }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "Estimated delivery time is required",
    invalid_type_error: "Estimated delivery time must be a number",
  }).min(1, { message: "Estimated delivery time must be greater than 0" }),
  cuisines: z
    .array(z.string())
    .nonempty({ message: "please select at least one item" }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, { message: "Name is required" }),
      price: z.coerce.number().min(1, { message: "Price is required" }),
    })
  ),
  imageFile: z.instanceof(File, { message: "Image is required" }),
});

type restaurantFormData = z.infer<typeof formSchema>;
type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<restaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
     restaurantName: "",
      city: "",
      country: "",
      deliveryPrice: 0,
      estimatedDeliveryTime: 0,
      cuisines: [],
      menuItems: [{ name: "", price: 0 }]
    },
  });
  const onSubmit = (formDataJson: restaurantFormData) => {
    // TODO - convert formDataJson to FormData object
    const formData = new FormData();
    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("deliveryPrice", (formDataJson.deliveryPrice*100).toString());
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
   formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    }
    );
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price*100).toString()
      );
    });
    formData.append("imageFile", formDataJson.imageFile);
    // formData.forEach((value, key) => console.log(key, value));
    // console.log(formDataJson);
    onSave(formData);

  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CusinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};
export default ManageRestaurantForm;
