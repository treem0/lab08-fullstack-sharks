import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        return /*html*/`
        <section class="header-section">
        <header>
            <img class="logo" src="./assets/shark.png" alt="cool shark pic">
            <h1>SHARKS</h1>
        </header>
        <nav>
            <a href="../">Home</a>
            <a href="../shark-list.html">SHARKS</a>
            <a href="../shark-form.html">Create a SHARK</a>
        </nav>
        </section>
        `; 
    }
}

export default Header;