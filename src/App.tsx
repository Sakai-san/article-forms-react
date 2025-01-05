import { FormEvent } from "react";
import "./App.css";
import { FormProvider, useForm } from "react-hook-form";
import { WorkingExperiences, WorkingExperiencesTypes } from "./WorkingExperiences";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import { WorkingPermit, workingPermitSchema, WorkingPermitSchema } from "./WorkingPermit";
import { personalInformationSchema, PersonalInformationSchema, PersonalInformation } from "./PersonalInformation";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type FormData = PersonalInformationSchema & WorkingExperiencesTypes.ValidationSchema & WorkingPermitSchema;

function App() {
  // merge all the misc subforms' validation rules together
  const formSchema = personalInformationSchema().and(WorkingExperiencesTypes.getSchema()).and(workingPermitSchema());

  const formContext = useForm<FormData>({
    defaultValues: {
      firstname: "",
      attachments: [],
      hasValidWorkPermit: undefined,
    },
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = formContext;

  const handleValidatedSubmit = async (data: FormData) => console.log("data", data);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await delay(5000);

    handleSubmit(handleValidatedSubmit)();
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={isValid && !isDirty ? () => null : onSubmit}>
      <FormProvider {...formContext}>
        <PersonalInformation />
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
