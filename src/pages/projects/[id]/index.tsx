import { client } from "../../../libs/client";
import { Container, Typography, Box } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import ContentHeader from "../../../components/common/ContentHeader";

export default function BlogId({ project }: { project: any }) {
    return (
        <Container maxWidth="md">
            <ContentHeader
                breadcrumbs={[
                    { path: "/", title: "ホーム" },
                    { path: "", title: project.name },
                  ]}
                  title={project.name}
            />
            <Box
                component="img"
                src={project.eyecatch?.url}
                alt={project.name}
                sx={{ width: "100%", height: "auto", marginTop: "20px" }}
            />
            <Box
                dangerouslySetInnerHTML={{
                    __html: `${project.content ?? ""}`,
                  }}
                />
        </Container>
    );
}

export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "projects"});

    const paths = data.contents.map((content: any) => `/projects/${content.id}`);
    return { paths, fallback: false };
};

export const getStaticProps = async (context: any) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: "projects", contentId: id });
    
    return {
        props: {
            project: data,
        },
    };
};