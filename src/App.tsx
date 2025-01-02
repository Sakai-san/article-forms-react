import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { FormProvider, useForm } from "react-hook-form";
import { WorkingExperiences, WorkingExperiencesTypes } from "./WorkingExperiences";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkingPermit, WorkingPermitTypes } from "./WorkingPermit";

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

  return (
    <FormProvider {...formContext}>
      <WorkingExperiences />
      <WorkingPermit />
    </FormProvider>
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
