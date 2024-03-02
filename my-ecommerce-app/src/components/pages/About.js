import { Container, Row, Col } from "react-bootstrap";
import Header from "../Header";
import classes from './About.module.css';
import image from '../../images/Band Members.png';

const About = () => {
    return(
        <section>
        <div className={classes.about} >
            <h1>The Generics</h1>
        </div>
        <Container className={classes.container}>
            <Row>
                <h2>About</h2>
                <Col md={12}>
                    <div><div><img src={image} alt="music_band" /></div>
                    
                    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
          dignissimos magnam quod vel accusantium repellendus vero, molestias
          labore fugit fuga fugiat, corrupti, tenetur perferendis qui impedit
          facilis. Architecto, quaerat pariatur quibusdam vitae porro eaque
          suscipit aut totam esse quam est earum omnis maiores, et quae
          doloremque cumque. Ab, laboriosam laborum at velit quae necessitatibus
          itaque, nulla nesciunt in aut harum vero unde voluptas minima ad illum
          eligendi fugiat tenetur consectetur quisquam architecto. Debitis,
          cumque necessitatibus non aliquam autem, voluptatem doloremque alias
          facilis, accusantium laudantium incidunt rem. Nemo modi sequi, iure
          maxime rerum dolore veniam dolorum non sed, quia magni enim. Dicta
          modi sapiente magni repudiandae itaque harum aspernatur. Commodi nobis
          ab voluptas minima omnis debitis corporis alias facilis sit eaque illo
          cumque ullam a quod repellendus exercitationem dolore ratione, atque
          dicta sunt incidunt. Temporibus voluptatibus laborum dolores ut
          repellendus dolorum autem mollitia non nihil molestias culpa soluta
          error minus sunt ratione pariatur, nesciunt id ab voluptates
          inventore, deserunt reiciendis porro! Illo nisi enim omnis commodi
          deserunt numquam. Omnis dolores perferendis obcaecati quisquam,
          impedit quam veniam aut autem voluptatem fuga facilis nobis
          accusantium enim expedita inventore officia quibusdam, voluptates eum
          voluptate accusamus, eos neque non doloremque? Fugiat voluptatibus
          officia accusantium rem?
          </div>
                    </div>
                </Col>
            </Row>
        </Container>
        </section>
    )
};

export default About;