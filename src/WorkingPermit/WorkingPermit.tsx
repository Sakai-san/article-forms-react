import { Controller, useFormContext } from "react-hook-form";
import { WorkingPermitTypes } from ".";
import { Section } from "../Section";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";

export const WorkingPermit = () => {
  const { control, watch, trigger } = useFormContext<WorkingPermitTypes.ValidationSchema>();

  return (
    <List sx={{ py: 0 }}>
      <Stack py={2} gap={1}>
        <Controller
          control={control}
          name="hasValidWorkPermit"
          render={({ field, fieldState }) => {
            console.log("field", field);
            return (
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Do you have a valid visa/work permit for Germany?
                </FormLabel>
                <RadioGroup
                  {...field}
                  value={field.value ?? ""}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="yes" control={<Radio />} label="yes" />
                  <FormControlLabel value="no" control={<Radio />} label="no" />
                </RadioGroup>
              </FormControl>
            );
          }}
        />
      </Stack>
    </List>
  );
};
