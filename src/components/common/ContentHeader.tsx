import { Box, Typography } from "@mui/material";
import Breadcrumbs, { BreadcrumbData } from "./Breadcrumbs";

export default function ContentHeader({
  breadcrumbs,
  title,
}: {
  breadcrumbs: BreadcrumbData[];
  title: string;
}) {
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Box pb={3} pt={1} mt={6}>
        <Typography textAlign="center" variant="h1" component="h2">
          {title}
        </Typography>
      </Box>
    </>
  );
}