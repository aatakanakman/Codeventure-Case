import React, { useContext, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { postBlog, fetchMe } from "../../../api";
import { useMutation, useQueryClient } from "react-query";
import "./styles.css";
import {
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex,
} from "@chakra-ui/react";

import { Formik, FieldArray } from "formik";
import validationSchema from "./validations";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user, loggedIn } = useAuth();

  const history = useNavigate();
  const queryClient = useQueryClient();
  const newBlogMutation = useMutation(postBlog, {
    onSuccess: () => queryClient.invalidateQueries("blogs"),
  });

  const handleSubmit = async (values, bag) => {
    const newValues = {
      ...values,
    };

    newBlogMutation.mutate(newValues, {
      onSuccess: () => {
        history("/");
      },
    });
  };

  useEffect(() => {
    const localUser = localStorage.getItem("access-token");
    if ((user && user.role !== "admin") || !localUser) {
      history("/signin");
    }
  }, [user]);

  return (
    <div className="blog-form">
      <Text fontSize="2xl">New Blog</Text>

      <Formik
        initialValues={{
          title: "Blog Başlık",
          description: "Lorem ipsum",
          content: "",
          photo: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
        }) => (
          <>
            <Flex align="center" width="full" justifyContent="center">
              <Box my="5" textAlign="left">
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      disabled={isSubmitting}
                      isInvalid={touched.title && errors.title}
                    />

                    {touched.title && errors.title && (
                      <Text color="red.500">{errors.title}</Text>
                    )}
                  </FormControl>
                  <FormControl mt="4">
                    <FormLabel>Content</FormLabel>
                    <Textarea
                      name="content"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.content}
                      disabled={isSubmitting}
                      isInvalid={touched.content && errors.content}
                    />
                    {touched.content && errors.content && (
                      <Text color="red.500">{errors.content}</Text>
                    )}
                  </FormControl>
                  <FormControl mt="4">
                    <FormLabel>Description</FormLabel>
                    <Input
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      disabled={isSubmitting}
                      isInvalid={touched.description && errors.description}
                    />
                    {touched.description && errors.description && (
                      <Text color="red.500">{errors.description}</Text>
                    )}
                  </FormControl>

                  <FormControl mt="4">
                    <FormLabel>Photo</FormLabel>
                    <Input
                      name="photo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.photo}
                      disabled={isSubmitting}
                      isInvalid={touched.photo && errors.photo}
                    />
                    {touched.photo && errors.photo && (
                      <Text color="red.500">{errors.photo}</Text>
                    )}
                  </FormControl>

                  <Button
                    mt={4}
                    width="full"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Save
                  </Button>
                </form>
              </Box>
            </Flex>
          </>
        )}
      </Formik>
    </div>
  );
}

export default Home;
