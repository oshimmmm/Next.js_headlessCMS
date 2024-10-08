
import ContentHeader from "@/src/components/common/ContentHeader";
import { client } from "@/src/libs/client";
import { Box, Container, List, ListItem, ListItemText, Pagination, Typography } from "@mui/material";
import { format } from "date-fns";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const newsPerPage = 10;

export const getStaticPaths: GetStaticPaths = async () => {
  const newsData = await client.get({
    endpoint: "news",
    queries: { 
      limit: 1,
      filters: "type[contains]更新情報",
    },
  });

  const totalCount = newsData.totalCount;
  const pageCount = Math.ceil(totalCount / newsPerPage);

  const paths = Array.from({ length: pageCount }, (_, index) => ({
    params: { page: (index + 1).toString() },
  }));
  
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = params?.page ? parseInt(params.page as string, 10) : 1;
  const { news, totalCount } = await fetchNews(page);

  return {
    props: {
      news,
      totalCount,
      page,
    },
  };
};

const fetchNews = async (page: number) => {
  const offset = (page - 1) * newsPerPage;

  const newsData = await client.get({
    endpoint: "news",
    queries: {
      limit: newsPerPage,
      offset,
      filters: "type[contains]更新情報",
    },
  });

  return {
    news: newsData.contents,
    totalCount: newsData.totalCount,
  };
};

interface News {
  id: string;
  title: string;
  publishedAt: string;
}

interface NewsListProps {
  news: News[];
  totalCount: number;
  page: number;
}

const NewsList: React.FC<NewsListProps> = ({ news, totalCount, page }) => {
  const router = useRouter();
  const pageCount = Math.ceil(totalCount / newsPerPage);

  const breadcrumbs = [
    { title: "ホーム", path: "/" },
    { title: "お知らせ一覧", path: "/news/newslist/1" },
  ];


  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Box>
        <Box sx={{ flex: 1 }}>
          <ContentHeader breadcrumbs={breadcrumbs} title="お知らせ一覧" />
        </Box>
        <List>
          {news.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={
                  <Link href={`/news/${item.id}`} passHref legacyBehavior>
                    <a style={{ textDecoration: "none", color: "inherit"}}>
                      <Typography component="span" color="primary">
                        {item.title}
                      </Typography>
                    </a>
                  </Link>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary" mr={4}>
                    {format(new Date(item.publishedAt), "yyyy年MM月dd日 HH:mm")}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, value) => {
            router.push(`/news/newslist/${value}`);
          }}
          color="primary"
        />
      </Box>
    </Container>
  )

}

export default NewsList;