import Component from '../Component.js';
import Header from '../common/Header.js';
import SharkList from './SharkList.js';
import { getSharks } from '../services/shark-api.js';

class SharkListApp extends Component {

    onRender(dom) {
        console.log('IM HERE');
        const header = new Header({ title: 'List of Sharks' });
        dom.prepend(header.renderDOM());

        const list = new SharkList({ sharks: [] });
        const main = dom.querySelector('main');
        main.appendChild(list.renderDOM());

        getSharks().then(sharks => {
            list.update({ sharks });
        });
    }

    renderHTML() {
        return /*html*/`
            <div>
            <main></main>
            </div>
        `;
    }
}

export default SharkListApp;