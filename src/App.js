import { app } from "./firebase";
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Container,
  VStack,
  Input,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import Message from "./components/Message";
import Footer from "./components/Footer";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

const logoutHandler = () => signOut(auth);

function App() {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const divforscroll = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
        name: user.displayName,
      });
      divforscroll.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));
    const unsusbcribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
      console.log(data);
    });

    const unsubscribeformessage = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        })
      );
    });

    return () => {
      unsusbcribe();
      unsubscribeformessage();
    };
  }, []);

  return (
    <Box bg={"red.50"}>
      {user ? (
        <Container h={"100vh"} bg={"white"}>
          <VStack h={"full"} paddingY={"4"}>
            <Button w={"full"} onClick={logoutHandler} colorScheme="purple">
              Logout
            </Button>
            <VStack
              overflowY={"auto"}
              h={"full"}
              w={"full"}
              css={{ "&::-webkit-scrollbar": { display: "none" } }}
            >
              {messages.map((item) => (
                <Message
                  key={item.id}
                  text={item.text}
                  uri={item.uri}
                  user={item.uid === user.uid ? "me" : "other"}
                  name={item.name}
                />
              ))}
              <div ref={divforscroll}></div>
            </VStack>
            <form onSubmit={submitHandler} style={{ width: "100%" }}>
              <HStack>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message"
                  fontSize={"1rem"}
                  border={"1px solid purple"}
                />
                <Button type={"submit"} variant={"solid"} colorScheme="purple">
                  Send
                </Button>
              </HStack>
            </form>
          </VStack>
        </Container>
      ) : (
        <VStack h={"100vh"} bg={"white"}>
          <VStack p={"2"} my={"10"} h={["20vh", "30vh"]}>
            <Heading marginBottom={["7", "9"]}>Welcome to</Heading>
            <Heading size={["3xl", "4xl"]} letterSpacing={"0.3rem"}>
              GroupCh
              <ChatIcon marginRight={"2"} boxSize={"10"} />t
            </Heading>
          </VStack>
          <Button
            onClick={loginHandler}
            colorScheme={"purple"}
            marginTop={"10"}
          >
            Sign in with Google
          </Button>
          <Footer />
        </VStack>
      )}
    </Box>
  );
}

export default App;
