import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Logo } from '../components';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis
            dignissimos dicta sapiente laboriosam ut quisquam recusandae
            nesciunt doloremque, minus est optio, assumenda nisi nam? Rem
            eligendi laudantium reiciendis assumenda architecto.
          </p>
          <Link to='/register' className='btn register-link'>
            Register
          </Link>
          <Link to='/login' className='btn'>
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt='Job Hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
