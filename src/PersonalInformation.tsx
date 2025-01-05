import { Controller, useFormContext } from "react-hook-form";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import FormHelperText from "@mui/material/FormHelperText";
import { z } from "zod";
import { TextField } from "@mui/material";

export const personalInformationSchema = () =>
  z.object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string(),
    email: z.string().email("Email is not valid"),
  });

export type PersonalInformationSchema = z.infer<ReturnType<typeof personalInformationSchema>>;

export const PersonalInformation = () => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext<PersonalInformationSchema>();

  return (
    <>
      <h2></h2>
      <List sx={{ py: 0 }}>
        <Stack py={2} gap={1}>
          <Controller
            name="firstname"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                required
                label="First name"
                disabled={isSubmitting}
                helperText={fieldState.error?.message ?? " "}
                error={Boolean(fieldState.error)}
                {...field}
              />
            )}
          />
        </Stack>
      </List>
    </>
  );
};
