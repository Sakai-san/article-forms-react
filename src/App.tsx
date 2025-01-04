import { FormEvent } from "react";
import "./App.css";
import { FormProvider, useForm } from "react-hook-form";
import { WorkingExperiences, WorkingExperiencesTypes } from "./WorkingExperiences";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkingPermit, workingPermitSchema, WorkingPermitSchema } from "./WorkingPermit";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type Form = WorkingExperiencesTypes.ValidationSchema & WorkingPermitSchema;

function App() {
  // merge all the misc subforms' validation rules together
  const formSchema = WorkingExperiencesTypes.getSchema().and(workingPermitSchema());

  const formContext = useForm<Form>({
    defaultValues: {
      attachments: [],
    },
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = formContext;

  const handleValidatedSubmit = async (data: Form) => console.log("data", data);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    await delay(5000);
    e.preventDefault();

    handleSubmit(handleValidatedSubmit)();
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={isValid && !isDirty ? () => null : onSubmit}>
      <FormProvider {...formContext}>
        <WorkingExperiences />
        <WorkingPermit />
      </FormProvider>

      <LoadingButton type="submit" size="medium" loading={isSubmitting} variant="contained">
        Submit
      </LoadingButton>
    </Box>
  );
}

export default App;
