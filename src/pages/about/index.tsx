import React from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Box,
  TableContainer,
} from "@mui/material";
import Link from "next/link";
import { styled } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import ContentHeader from "../../components/common/ContentHeader";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  wordBreak: "break-word",
  whiteSpace: "normal",
  padding: theme.spacing(1),
  "&:first-of-type": {
    paddingLeft: theme.spacing(2),
  },
  "&:last-of-type": {
    paddingRight: theme.spacing(2),
  },
}));

const companyData = {
  会社名: "Pet Hotel",
  所在地: "〒xxx-xxxx aaaaaaaaa",
  電話: "xxx-xxx-xxxx",
  メールアドレス: "xxxxxx@xxxxx.xxx",
  設立日: "xxxx年x月",
  代表者: "xx xx",
  資格等: "xxxxxxxxxxx",
};

const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  companyData["所在地"]
)}`;

export default function About() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Container>
      <ContentHeader
        breadcrumbs={[
          { path: "/", title: "ホーム" },
          { path: "", title: "事業概要" },
        ]}
        title="事業概要"
      />
      <Paper>
        {isMobile ? (
          <TableContainer>
            <Table>
              <TableBody>
                {Object.entries(companyData).map(([key, value]) => (
                  <TableRow key={key}>
                    <StyledTableCell>
                      <Typography variant="subtitle1" component="div">
                        {key}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      {key === "所在地" ? (
                        <Link href={googleMapsUrl} target="_blank" passHref>
                          {value}
                        </Link>
                      ) : (
                        <Typography variant="body1" component="div">
                          {value}
                        </Typography>
                      )}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Table>
            <TableBody>
              {Object.entries(companyData).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>
                    <Typography variant="subtitle1" component="div">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {key === "所在地" ? (
                      <Link href={googleMapsUrl} target="_blank" passHref>
                        {value}
                      </Link>
                    ) : (
                      <Typography variant="body1" component="div">
                        {value}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
      <Typography variant="h2" align="center" gutterBottom my={6}>
        所在地
      </Typography>
      <Box>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7479757770857!2d139.74285797559065!3d35.658580472594664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bbd9009ec09%3A0x481a93f0d2a409dd!2z5p2x5Lqs44K_44Ov44O8!5e0!3m2!1sja!2sjp!4v1723911789854!5m2!1sja!2sjp"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>
    </Container>
  );
}
