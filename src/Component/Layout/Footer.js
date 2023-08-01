import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faGoogle, faInstagram} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="text-center text-white py-4 bg-dark" style={{backgroundColor:"#929cb2",width:'100vw'}} > 
      <Container>
        <Row>
          <Col className="mb-4">
            <Link className="btn btn-outline-light btn-floating m-1" to="#">
              <FontAwesomeIcon icon={faFacebookF} />
            </Link>

            <Link className="btn btn-outline-light btn-floating m-1" to="#">
              <FontAwesomeIcon icon={faTwitter} />
            </Link>

            <Link className="btn btn-outline-light btn-floating m-1" to="#">
              <FontAwesomeIcon icon={faGoogle} />
            </Link>

            <Link className="btn btn-outline-light btn-floating m-1" to="#">
              <FontAwesomeIcon icon={faInstagram} />
            </Link>

          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            © {new Date().getFullYear()} Copyright:
            <Link className="text-white" to="#">
              swasthya.in
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
