import Link from "next/link";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  CardActionArea,
  styled,
} from "@mui/material";
import { format } from "date-fns";
import Image from "next/image";
import { client } from "../libs/client";
import HouseIcon from '@mui/icons-material/House';

const MainVisual = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "300px",
  overflow: "hidden",
  position: "relative",
  [theme.breakpoints.down("md")]: {
    height: "45vh",
  },
  [theme.breakpoints.down("sm")]: {
    height: "32vh",
  },
}));

const TextOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "32px",  // テキストの周りに少し余白を追加
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  zIndex: 10,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",  // 背景ボックスの幅を画面の80%に設定
  maxWidth: "600px",  // 最大幅を設定して、大きすぎることを防止
  display: "flex",
  justifyContent: "center",  // テキストとアイコンを横方向中央に配置
  alignItems: "center",  // アイコンとテキストの垂直方向を中央に揃える
  gap: "8px",
  [theme.breakpoints.down("sm")]: {
    width: "90%",  // 画面が小さくなったときの幅を調整
  },
}));

const HalfBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "50%",
  height: "100%",
  "& img": {                  // img 要素のスタイルを正しく指定
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },
}));

const Home = ({ news, blog, projects }: { news: any; blog: any; projects: any }) => {
  const showMoreLink = news.length >= 5;

  return (
    <div>
      <MainVisual>
       <HalfBox>
         <Image
            src="/main4.jpg"
            alt="Left Image"
            layout="fill"
            quality={100}
            priority={true}
          />
        </HalfBox>
        <HalfBox>
          <Image
            src="/main.jpg"
            alt="Right Image"
            layout="fill"
            quality={100}
            priority={true}
          />
        </HalfBox>
        <TextOverlay>
          <HouseIcon sx={{ fontSize: '3rem' }} color="primary"></HouseIcon>
          <Typography component="div" sx={{ fontSize: '3rem' }}>
            ペットホテル
          </Typography>
        </TextOverlay>
      </MainVisual>

      <Container
        maxWidth="lg"
        sx={{
          mt: { xs: 4, sm: 8, md: 16 },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: "16px",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ textAlign: "left", color: "inherit", ml: 4 }}
          >
            更新情報
          </Typography>
          <List>
            {news.map((item: any) =>(
              <ListItem key={item.id} alignItems="flex-start">
                <Typography variant="body2" color="text.secondary" mr={4}>
                    {format(new Date(item.publishedAt), "yyyy年MM月dd日 HH:mm")}
                </Typography>
                <Link href={`/news/${item.id}`} passHref legacyBehavior>
                  <a style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography
                      component="span"
                      variant="body1"
                      color="primary"
                    >
                      {item.title}
                    </Typography>
                  </a>
                </Link>
              </ListItem>
            ))}
          </List>
          {showMoreLink && (
            <Link href="/news/newslist/1" passHref legacyBehavior>
              <a style={{ textDecoration: "none", color: "inherit" }}>
                <Typography
                  component="span"
                  sx={{
                    cursor: "pointer",
                    color: "#2680C2",
                    mt: 2,
                    display: "block",
                  }}
                >
                  もっと見る
                </Typography>
              </a>
            </Link>
          )}
        </Paper>

        <Paper
          elevation={3}
          sx={{
            padding: "16px",
            textAlign: "center",
            marginTop: "20px"
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ textAlign: "left", color: "inherit", ml: 4 }}
          >
            ブログ
          </Typography>
          <List>
            {blog.map((item: any) =>(
              <ListItem key={item.id} alignItems="flex-start">
                <Typography variant="body2" color="text.secondary" mr={4}>
                    {format(new Date(item.publishedAt), "yyyy年MM月dd日 HH:mm")}
                </Typography>
                <Link href={`/blog/${item.id}`} passHref legacyBehavior>
                  <a style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography
                      component="span"
                      variant="body1"
                      color="primary"
                    >
                      {item.title}
                    </Typography>
                  </a>
                </Link>
              </ListItem>
            ))}
          </List>
          {showMoreLink && (
            <Link href="/news/newslist/1" passHref legacyBehavior>
              <a style={{ textDecoration: "none", color: "inherit" }}>
                <Typography
                  component="span"
                  sx={{
                    cursor: "pointer",
                    color: "#2680C2",
                    mt: 2,
                    display: "block",
                  }}
                >
                  もっと見る
                </Typography>
              </a>
            </Link>
          )}
        </Paper>

        <Paper
         elevation={3}
         sx={{
          padding:"16px",
          textAlign:"center",
          marginTop:"20px",
         }}
        >

        <Typography
        　fontWeight="bold"
          sx={{textAlign: "center"}}>
          事業紹介
        </Typography>

        <Grid container spacing={4} my={4}>
            {projects.map((item: any) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card sx={{ border: "2px solid #d3d3d3", borderRadius: "8px" }}>
                  <CardActionArea href={`/projects/${item.id}`}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.eyecatch?.url}
                      alt={item.name}
                    />
                    <CardContent>
                      <Typography>
                        {item.name}
                      </Typography>
                      <Typography>
                        {item.overview}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>

        </Paper>
      </Container>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const newsData = await client.get({
    endpoint: "news",
    queries: {
      limit: 5,
      filters: 'type[contains]更新情報'
    },
  });
  const blogData = await client.get({
    endpoint: "news",
    queries: {
      limit: 5,
      filters: 'type[contains]ブログ'
    },
  });
  const projects = await client.get({ endpoint: "projects"});

  return {
    props: {
      news: newsData.contents,
      blog: blogData.contents,
      projects: projects.contents
    },
  };

};