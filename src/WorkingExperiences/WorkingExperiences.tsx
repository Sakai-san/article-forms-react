import { useFieldArray, useFormContext } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useDropzone } from "react-dropzone";
import { WorkingExperience, WorkingExperiencesTypes } from ".";
import { Section } from "../Section";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

export const WorkingExperiences = () => {
  const { control, watch, trigger } = useFormContext<WorkingExperiencesTypes.ValidationSchema>();
  const { fields, remove, append } = useFieldArray({
    control,
    name: "attachments",
  });

  const watchFieldArray = watch("attachments");
  const controlledFields = fields.map((field, index) => ({
    ...field,
    ...watchFieldArray[index],
  }));

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.map((file) =>
      append({
        title: file.name,
        file: file,
      })
    );
  };

  const doValidation = () => trigger("attachments");

  const { open, getInputProps } = useDropzone({
    onDrop,
    onDropAccepted: doValidation,
    multiple: true,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <List sx={{ py: 0 }}>
      <input {...getInputProps()} />
      <Section
        title="Attachments"
        icon={<AttachFileIcon sx={{ color: "text.secondary", fontSize: "1rem" }} />}
        addButton={
          <IconButton onClick={open}>
            <AddIcon fontSize="small" />
          </IconButton>
        }
      >
        <Stack py={2} gap={1}>
          {controlledFields.length > 0 ? (
            controlledFields.map((field, index) => (
              <WorkingExperience
                key={field.id}
                fileName={field.title}
                file={field.file}
                order={index}
                onRemove={remove}
              />
            ))
          ) : (
            <Stack alignItems="center" justifyContent="center">
              <Typography
                textAlign="center"
                variant="body2"
                color="text.secondary"
                px={4}
                py={2}
                sx={{ userSelect: "none" }}
              >
                Click on "+" to add an attachment
              </Typography>
            </Stack>
          )}
        </Stack>
      </Section>
    </List>
  );
};
