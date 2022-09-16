import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, HStack, Icon } from "@chakra-ui/react";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaInstagram,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const Index = () => {
  const { user, loggedIn } = useAuth();

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Link to="/">eBlog</Link>
          </div>

          <ul className={styles.menu}>
            <li>
              <Link to="/">Blogs</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/">Contact</Link>
            </li>
          </ul>
        </div>

        <div className={styles.right}>
          <HStack>
            <Icon as={FaFacebookF}></Icon>
            <Icon as={FaTwitter}></Icon>
            <Icon as={FaGooglePlusG}></Icon>
            <Icon as={FaInstagram}></Icon>
          </HStack>
          {!loggedIn && (
            <>
              <Link to="/signin">
                <Button ml={5} colorScheme="pink" variant="ghost">
                  Login
                </Button>
              </Link>
            </>
          )}

          {loggedIn && (
            <>
              {user?.role === "admin" && (
                <Link to="/new-blog">
                  <Button colorScheme="pink" variant="ghost">
                    Blog Oluştur
                  </Button>
                </Link>
              )}
              <Link to="/profile">
                <Button>Profile</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Index;
