import { useState, FormEvent } from "react";
import "./App.css";
import { FormProvider, useForm } from "react-hook-form";
import { WorkingExperiences, WorkingExperiencesTypes } from "./WorkingExperiences";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkingPermit, WorkingPermitTypes } from "./WorkingPermit";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";

type Form = WorkingExperiencesTypes.ValidationSchema & WorkingPermitTypes.ValidationSchema;

function App() {
  // merge all the misc subforms' validation rules together
  const formSchema = WorkingExperiencesTypes.getSchema().and(WorkingPermitTypes.getSchema());

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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
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
