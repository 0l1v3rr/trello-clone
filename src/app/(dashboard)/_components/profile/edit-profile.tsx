import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Session } from "next-auth";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { profileSchema } from "@/lib/schemas/profile";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "@/app/(dashboard)/actions";

interface EditProfileProps {
  user: Session["user"];
  onEditModeExit: () => void;
}

const EditProfile: FC<EditProfileProps> = ({ user, onEditModeExit }) => {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      status: user.status ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    await updateUser(user.id, values);
    onEditModeExit();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-stretch space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Full-Stack Developer | Next.js, Express"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-start gap-2">
          <LoadingButton
            type="submit"
            loading={form.formState.isSubmitting}
            size="sm"
          >
            Submit
          </LoadingButton>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onEditModeExit}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProfile;
