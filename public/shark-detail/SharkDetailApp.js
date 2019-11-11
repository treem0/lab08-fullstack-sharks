import Component from '../Component.js';
import Header from '../common/Header.js';
import Loading from '../common/Loading.js';
import SharkDetail from './SharkDetail.js';
import { getShark } from '../services/shark-api.js';

class SharkDetailApp extends Component {

    async onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const main = dom.querySelector('main');

        const loading = new Loading({ loading: true });
        main.appendChild(loading.renderDOM());

        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');

        if (!id) {
            window.location = 'shark-list.html';
            return;
        }

        try {
            const shark = await getShark(id);
            const sharkDetail = new SharkDetail({ shark });
            main.appendChild(sharkDetail.renderDOM());
        }
        catch (err) {
            console.log(err);
        }
        finally {
            loading.update({ loading: false });
        }
    }

    renderHTML() {
        return /*html*/`
        <div>
            <main>
            </main>
        </div>
    `;
    }
}

export default SharkDetailApp;