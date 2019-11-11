import Component from '../Component.js';
import Header from '../common/Header.js';
import SharkList from './SharkList.js';
import Loading from '../common/Loading.js';
import { getSharks } from '../services/shark-api.js';

class SharkListApp extends Component {

    async onRender(dom) {
        const header = new Header({ title: 'List of Sharks' });
        dom.prepend(header.renderDOM());

        const loading = new Loading({ loading: true });
        dom.prepend(loading.renderDOM());

        const list = new SharkList({ sharks: [] });
        const main = dom.querySelector('main');
        main.appendChild(list.renderDOM());

        try {
            const sharks = await getSharks();
            list.update({ sharks: sharks });
        }
        catch (err) {
            console.log('Load sharks failed', err);
        }
        finally {
            setTimeout(() =>{
                loading.update({ loading: false });
            }, 500);
        }
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