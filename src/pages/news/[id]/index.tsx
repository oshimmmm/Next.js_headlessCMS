import { client } from "../../../libs/client";
import { Container, Typography, Box } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import ContentHeader from "../../../components/common/ContentHeader";

export default function BlogId({ news }: { news: any }) {
  const formattedPublishedDate = format(
    new Date(news.publishedAt),
    "yyyy年MM月dd日"
  );
  const formattedUpdatedDate = format(
    new Date(news.updatedAt),
    "yyyy年MM月dd日"
  );

  const isNewsUpdate = news.type.includes("更新情報");
  const isBlog = news.type.includes("ブログ");

  const breadcrumbs = isNewsUpdate
    ? [
        { path: "/", title: "ホーム" },
        { path: "/news/newslist/1", title: "お知らせ一覧" },
        { path: "", title: news.title },
      ]
    : isBlog
    ? [
        { path: "/", title: "ホーム" },
        { path: "/news/bloglist/1", title: "ブログ一覧" },
        { path: "", title: news.title },
      ]
    : [];

  return (
    <Container maxWidth="md">
      <ContentHeader breadcrumbs={breadcrumbs} title={news.title} />
      <Box
        display="flex"
        justifyContent="flex-start"
        mb={2}
        sx={{
          flexDirection: { xs: "column", sm: "row" },
        }}
        mt={8}
      >
        <Typography
          variant="caption"
          color="textSecondary"
          mr={{ sm: 2, xs: 0 }}
          mb={{ xs: 1, sm: 0 }}
        >
          公開日: {formattedPublishedDate}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          更新日: {formattedUpdatedDate}
        </Typography>
      </Box>
      <Box
        component="img"
        src={news.eyecatch?.url}
        alt={news.name}
        sx={{ width: "100%", height: "auto", marginTop: "20px" }}
      />
      <Box
        sx={{
          marginTop: "20px",
          "& img": {
            maxWidth: "100%",
            height: "auto",
          },
          "& p": {
            wordBreak: "break-word",
          },
          "& td": {
            border: "1px #ACACAC solid",
            padding: "8px",
            wordWrap: "break-word",
            "& p": {
              marginBottom: "0px",
            },
          },
          "& th": {
            border: "1px #ACACAC solid",
            padding: "8px",
            background: "#ffa500",
            fontWeight: "normal",
            wordWrap: "break-word",
            "& p": {
              my: 0,
            },
          },
          "& h2": {
            borderBottom: "2px #ffa500 solid",
            margin: "56px 0px 16px",
            paddingBottom: "4px",
            color: "#333",
          },
          "& h3": {
            borderLeft: "2px #ffa500 solid",
            margin: "32px 0px 16px 0px",
            paddingLeft: "8px",
            color: "#333",
          },
          "& ul": {
            marginBottom: "8px",
          },
          "& li": {
            color: "#333",
            paddingBottom: "8px",
            "&:nth-last-child(1)": {
              padding: 0,
            },
          },
          "& table": {
            borderCollapse: "collapse",
            borderSpacing: 0,
            width: "100%",
            margin: "8px 0",
            tableLayout: "fixed",
          },
        }}
        dangerouslySetInnerHTML={{
          __html: `${news.content ?? ""}`,
        }}
      />
    </Container>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "news" });

  const paths = data.contents.map((content: any) => `/news/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "news", contentId: id });

  return {
    props: {
      news: data,
    },
  };
};
