import { client } from "@/libs/client";
import { Box, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const newsPerPage = 10;

export const getStaticPaths: GetStaticPaths = async () => {
  const newsData = await client.get({
    endpoint: "news",
    queries: { 
      limit: 1,
    },
  });
  console.log("Fetched news data in getStaticPaths:", newsData);

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

  console.log("Fetched news data in getStaticProps:", { news, totalCount, page });

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


  return (
    <Container>
      <Box>
        <List>
          {news.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={
                  <Link href={`/news/${item.id}`} passHref legacyBehavior>
                    <a>
                      <Typography>
                        {item.title}
                      </Typography>
                    </a>
                  </Link>
                }
              />

            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  )

}

export default NewsList;