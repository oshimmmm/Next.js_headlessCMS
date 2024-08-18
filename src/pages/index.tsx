import Link from "next/link";
import { client } from "@/libs/client";
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

const MainVisual = styled(Box)(({ theme }) => ({
  position: "relative",
  margin: "0 calc(50% - 50vw)",
  width: "100vw",
  height: "65vh",
  overflow: "hidden",
  "&::before": {
    content: '""',
    display: "block",
    paddingTop: "56.25%", // Maintain 16:9 aspect ratio (adjust as needed)
  },
  "& img": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    [theme.breakpoints.down("md")]: {
      objectPosition: "top",
    },
  },
  [theme.breakpoints.down("md")]: {
    height: "45vh",
  },
  [theme.breakpoints.down("sm")]: {
    height: "32vh",
  },
}));

const Home = ({ news, projects }: { news: any; projects: any }) => {
  return (
    <div>
      <MainVisual>
        <Image
          src="/main-image.png"
          alt="Main Visual"
          layout="fill"
          quality={100}
          priority={true}
        />
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
                <Link href={`/news/${item.id}`}>{item.title}</Link>
              </ListItem>
            ))}
          </List>
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
  const data = await client.get({
    endpoint: "news"});
  const projects = await client.get({ endpoint: "projects"});

  return {
    props: {
      news: data.contents,
      projects: projects.contents
    },
  };

};