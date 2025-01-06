import { FC, PropsWithChildren, ReactNode } from "react";
import Stack from "@mui/material/Stack/";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export const Section: FC<
  PropsWithChildren<{
    title: ReactNode;
    icon: ReactNode;
    addButton: ReactNode;
  }>
> = ({ title, icon, children, addButton }) => (
  <Stack width="100%">
    <Stack direction="row" p={1.5} justifyContent="space-between">
      <Stack direction="row" gap={(theme) => theme.spacing(1)} pl={3}>
        {icon}
        <Typography variant="body2">{title}</Typography>
      </Stack>
      {addButton}
    </Stack>
    <Divider sx={(theme) => ({ color: theme.palette.divider })} />
    {children}
  </Stack>
);
