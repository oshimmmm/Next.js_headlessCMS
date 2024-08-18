
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
      filters: "type[contains]ブログ",
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
  const { blog, totalCount } = await fetchNews(page);

  return {
    props: {
      blog,
      totalCount,
      page,
    },
  };
};

const fetchNews = async (page: number) => {
  const offset = (page - 1) * newsPerPage;

  const blogData = await client.get({
    endpoint: "news",
    queries: {
      limit: newsPerPage,
      offset,
      filters: "type[contains]ブログ",
    },
  });

  return {
    blog: blogData.contents,
    totalCount: blogData.totalCount,
  };
};

interface blog {
  id: string;
  title: string;
  publishedAt: string;
}

interface blogListProps {
  blog: blog[];
  totalCount: number;
  page: number;
}

const BlogList: React.FC<blogListProps> = ({ blog, totalCount, page }) => {
  const router = useRouter();
  const pageCount = Math.ceil(totalCount / newsPerPage);

  const breadcrumbs = [
    { title: "ホーム", path: "/" },
    { title: "ブログ一覧", path: "/blog/bloglist/1" },
  ];


  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Box>
        <Box sx={{ flex: 1 }}>
          <ContentHeader breadcrumbs={breadcrumbs} title="ブログ一覧" />
        </Box>
        <List>
          {blog.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={
                  <Link href={`/blog/${item.id}`} passHref legacyBehavior>
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
            router.push(`/blog/bloglist/${value}`);
          }}
          color="primary"
        />
      </Box>
    </Container>
  )

}

export default BlogList;