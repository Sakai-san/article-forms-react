import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
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

  const handleValidatedSubmit = async (data: Form) => {
    console.log("data", data);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    // prevents default propagation into third party libraries
    e.stopPropagation();
    // prevents browser default refresh
    e.preventDefault();

    handleSubmit(handleValidatedSubmit)();
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={isValid && !isDirty ? () => null : onSubmit}>
      <FormProvider {...formContext}>
        <WorkingExperiences />
        <WorkingPermit />
      </FormProvider>

      <LoadingButton
        type="submit"
        size="medium"
        loading={isSubmitting}
        variant="contained"
        disabled={false && !(isValid && !isDirty)}
      >
        Submit
      </LoadingButton>
    </Box>
  );

  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
