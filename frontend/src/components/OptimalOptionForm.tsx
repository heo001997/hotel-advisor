import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcnui/components/ui/form"
import { Input } from "@/shadcnui/components/ui/input"
import {Button} from "@/shadcnui/components/ui/button.tsx";

export const OptimalOptionForm = () => {
  const formSchema = z.object({
    guest_count: z.coerce.number({
      required_error: "Number of guests is required",
      invalid_type_error: "Number of guests must be a number",
    }).gte(1, { message: "Minimum number of guests is 1" })
      .int({ message: "Number of guests must be an integer" })
      .safe()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guest_count: 1,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="w-[100%] border rounded-md p-2 pb-3">
      <div className="text-center text-3xl">Find the best option for you</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="m-auto space-y-8 max-w-[300px] mt-2 text-center">
          <FormField
            control={form.control}
            name="guest_count"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <div className="flex gap-3 items-center justify-center">
                    <FormLabel className="">Number of Guests</FormLabel>
                    <Input className="w-[30%]" type="number" autoComplete="off" {...field} />
                  </div>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Button className="!mt-4" type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
