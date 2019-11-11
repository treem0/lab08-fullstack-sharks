import Component from '../Component.js';
import Header from '../common/Header.js';

class App extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main>
                    <a href="shark-list.html">
                    <img class="jaws-image" src="./assets/jaws.jpg">
                    </a>
                </main>
            </div>
        `;
    }
}

export default App;