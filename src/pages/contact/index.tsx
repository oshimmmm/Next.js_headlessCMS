import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useSnackbar } from "../../hooks/useSnackBar";
import CustomSnackbar from "../../components/common/CustomSnackBar";
import ContentHeader from "../../components/common/ContentHeader";

type FormValues = {
  name: string;
  email: string;
  body: string;
};

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const {
    openSnackbar,
    snackbarMessage,
    snackbarSeverity,
    resetSnackbar,
    setSnackbar,
  } = useSnackbar();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const baseUrl: string = `https://${
        process.env.NEXT_PUBLIC_SERVICE_DOMAIN || ""
      }.microcms.io/api/v1`;
      const response = await fetch(`${baseUrl}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("送信に失敗しました。");
      }

      setSnackbar("お問い合わせを送信しました", "success");
      reset();
    } catch (error) {
      setSnackbar("送信に失敗しました。", "error");
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ maxWidth: 600, mx: "auto" }}
      >
        <ContentHeader
          breadcrumbs={[
            { path: "/", title: "ホーム" },
            { path: "", title: "お問い合わせ" },
          ]}
          title="お問い合わせ"
        />
        <Paper
          elevation={3}
          sx={{
            padding: "32px",
            maxWidth: 600,
            mt: 8,
          }}
        >
          <TextField
            label="名前"
            {...register("name", { required: "名前は必須です。" })}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            {...register("email", {
              required: "メールアドレスは必須です。",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "メールアドレスが正しくありません。",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="本文"
            {...register("body", { required: "本文は必須です。" })}
            error={!!errors.body}
            helperText={errors.body?.message}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            sx={{ mt: 6, mx: "auto" }}
          >
            送信
          </Button>
        </Paper>
      </Box>
      <CustomSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={resetSnackbar}
      />
    </>
  );
};

export default ContactForm;
