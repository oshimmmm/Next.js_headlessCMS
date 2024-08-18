import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Link as MuiLink } from "@mui/material";
import MUIBreadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "next/link";
export type BreadcrumbData = {
  title: string;
  path: string;
};

export type BreadcrumbsProps = {
  breadcrumbs: BreadcrumbData[];
};

function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <MUIBreadcrumbs
      separator={<NavigateNextIcon color="disabled" fontSize="small" />}
      aria-label="breadcrumb"
      sx={{
        margin: "0 auto",
        padding: "16px 5px 0",
        svg: { marginTop: "3px" },
      }}
    >
      {breadcrumbs.map(({ title, path }, index) => {
        const last = index === breadcrumbs.length - 1;

        return (
          <Box key={path}>
            {last ? (
              <Typography fontSize="small" color="grey.600" mt={1}>
                {title}
              </Typography>
            ) : (
              <MuiLink
                fontSize="small"
                color="grey.600"
                underline="none"
                href={path}
                component={Link}
              >
                {title}
              </MuiLink>
            )}
          </Box>
        );
      })}
    </MUIBreadcrumbs>
  );
}

export default Breadcrumbs;
