import { Controller, useFormContext } from "react-hook-form";
import { WorkingPermitTypes } from ".";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import FormHelperText from "@mui/material/FormHelperText";

export const WorkingPermit = () => {
  const { control } = useFormContext<WorkingPermitTypes.ValidationSchema>();

  return (
    <List sx={{ py: 0 }}>
      <Stack py={2} gap={1}>
        <Controller
          control={control}
          name="hasValidWorkPermit"
          render={({ field, fieldState }) => (
            <FormControl error={Boolean(fieldState.error)} variant="standard">
              <FormLabel id="working-permit-radio-buttons-group-label">
                Do you have a valid visa/work permit for Germany?
              </FormLabel>
              <RadioGroup
                {...field}
                value={field.value ?? ""}
                row
                aria-labelledby="working-permit-radio-buttons-group-label"
              >
                <FormControlLabel value="no" control={<Radio />} label="no" />
                <FormControlLabel value="yes" control={<Radio />} label="yes" />
              </RadioGroup>
              <FormHelperText>{fieldState.error?.message ?? " "}</FormHelperText>
            </FormControl>
          )}
        />
      </Stack>
    </List>
  );
};
