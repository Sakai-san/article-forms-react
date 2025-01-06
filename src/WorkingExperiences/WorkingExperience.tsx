import { FC, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { WorkingExperiencesTypes } from ".";
import { Avatar, Button, ClickAwayListener, IconButton, ListItem, Stack, Tooltip, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

type WorkingExperienceProps = {
  fileName?: string;
  file?: File;
  order: number;
  onRemove: (order: number) => void;
};

/*
const WARNING_FILE_SIZE = 1e8; // 100 MB

const getFileSizeWarning = (hasError: boolean, file?: File) =>
  !hasError && file && file.size > WARNING_FILE_SIZE
    ? "File sizes of more than 100 MB can lead to longer upload times."
    : true;
 */

export const WorkingExperience: FC<WorkingExperienceProps> = ({ order, file, fileName, onRemove }) => {
  const { control } = useFormContext<WorkingExperiencesTypes.ValidationSchema>();
  const isCreationMode = !!file;
  const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);
  return (
    <ListItem sx={{ py: 0, pl: 2, pr: 1.5 }}>
      <Controller
        control={control}
        name={`attachments.${order}.file`}
        render={({ field, fieldState }) => {
          const hasError = Boolean(fieldState.error);
          /*
          const resultWarning = getFileSizeWarning(hasError, field.value);
          const warningMessage = typeof resultWarning === "string" ? true : null;
           */
          return (
            <Stack direction="row" width="100%" gap={2} justifyContent="space-between">
              <Typography noWrap component="p" sx={{ display: "inline-flex", alignItems: "center" }}>
                <Avatar>
                  <InsertDriveFileIcon />
                </Avatar>
                <Typography
                  variant="body2"
                  sx={(theme) => ({
                    ml: theme.spacing(2),
                    color: hasError ? theme.palette.error.light : theme.palette.text.primary,
                  })}
                  noWrap
                >
                  {isCreationMode ? field?.value?.name : fileName}
                </Typography>
              </Typography>
              <Stack>
                {/*
                warningMessage && (
                  <Tooltip
                    IconProps={{
                      sx: {
                        fontSize: "1.05rem !important",
                      },
                    }}
                    title={warningMessage}
                  />
                )}
                {hasError && (
                  <Tooltip
                    IconProps={{
                      sx: {
                        fontSize: "1rem !important",
                        color: (theme) => `${theme.palette.error.light} !important`,
                      },
                    }}
                    icon="warning"
                    title={fieldState.error?.message}
                  />
                )
                  */}
                <ClickAwayListener onClickAway={() => setShowDeleteTooltip(false)}>
                  <Tooltip
                    open={showDeleteTooltip}
                    placement="right"
                    disableHoverListener
                    title={
                      <Stack gap={2} p={2} maxWidth={(theme) => theme.spacing(140)}>
                        <Typography textAlign="center">Do you want to remove this attachment?</Typography>
                        <Button
                          tabIndex={0}
                          startIcon={<WarningAmberIcon />}
                          size="small"
                          onClick={() => onRemove(order)}
                        >
                          Yes, remove
                        </Button>
                      </Stack>
                    }
                  >
                    <IconButton aria-label="delete" onClick={() => setShowDeleteTooltip(true)}>
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </ClickAwayListener>
              </Stack>
            </Stack>
          );
        }}
      />
    </ListItem>
  );
};
