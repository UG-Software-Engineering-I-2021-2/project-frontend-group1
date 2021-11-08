import React, { useEffect } from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { useHistory } from "react-router";
import { LoginApp } from "../../../api/ApiEndpoints";
import { LoginResponse } from "../../../interfaces/login";
import { Flex, Stack, Box, Heading, Text, Center } from "@chakra-ui/layout";

export const Login = () => {
  const history = useHistory()


  const responseGoogle = (user: any) => {

    if (user) {
      const indexOf = user.profileObj.email.indexOf("@");
      if (indexOf && user.profileObj.email.substr(indexOf) !== "@utec.edu.pe") {
        history.push("/not-found");
      } else {
        localStorage.setItem("user", JSON.stringify(user));
      }
    }

    console.log(user)
    if (user.tokenId) {
      const token = user.tokenId;

      LoginApp(token).then((loggedUser: LoginResponse) => {
        console.log(loggedUser)
        localStorage.setItem("role", loggedUser.data.role)
        localStorage.setItem("email", user.profileObj.email)
        localStorage.setItem("name", loggedUser.data.name)
        localStorage.setItem("token", token)
        history.push("/main")
      }).catch((err) => {
        history.push("/not-found")
      })
    }

  };

  return (
    <>

      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Center>
            <Box w="100%">
              <img src="https://www.utec.edu.pe/sites/all/themes/utec_theme/LOGO_UTEC.png"></img>
            </Box>
          </Center>
          <Heading color="teal.400" mb={20}>Proyecto de Ingenieria de Software</Heading>


          <Box minW={{ base: "90%", md: "468px" }} style={{ marginTop: "100px" }}>
            <Stack
              spacing={4}
              p="3rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <Box>
                <Text>
                  Solo usuariaros permetidos podrán ingresar a la plataforma
                </Text>
              </Box>

              <GoogleLogin
                clientId="854441781361-k1cg7207b002frst5mirrhfko7tbj602.apps.googleusercontent.com"
                // render={(renderProps) => (
                //   <CustomGoogleButton
                //     onClick={renderProps.onClick}
                //     disabled={renderProps.disabled}
                //   />
                // )}
                buttonText="Continue with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />

            </Stack>
          </Box>
        </Stack>
      </Flex>

    </>
  );
};


