import React from "react";
import { HStack, Text, VStack, Heading, Avatar } from "@chakra-ui/react";

const Message = ({ text, user = "other", name, uri }) => {
  return (
    <>
      <HStack
        boxSizing="border-box"
        bg={"gray.100"}
        paddingY={"1"}
        paddingX={user === "me" ? "4" : "2"}
        borderRadius={"base"}
        alignSelf={user === "me" ? "flex-end" : "flex-start"}
        maxW={"80%"}
      >
        {user === "other" && <Avatar src={uri} />}
        <VStack overflow={'auto'}>
          <Heading color={"purple"} fontSize={"0.8rem"}>
            {user === "me" ? "Me" : name}
          </Heading>
          <Text fontSize={"0.9rem"} m={"1"}>
            {text}
          </Text>
        </VStack>
        {user === "me" && <Avatar src={uri} />}
      </HStack>
    </>
  );
};

export default Message;
