import Component from '../Component.js';
import Header from '../common/Header.js';
import Loading from '../common/Loading.js';
import SharkForm from '../shark-form/SharkForm.js';
import { getDangerLevel } from '../services/shark-api.js';

class SharkFormApp extends Component {

    async onRender(dom) {
        const header = new Header({ title: 'Add a Shark' });
        dom.prepend(header.renderDOM());

        const main = dom.querySelector('main');

        const loading = new Loading({ loading: true });
        dom.appendChild(loading.renderDOM());

        try {
            const danger = await getDangerLevel();
            const sharkForm = new SharkForm({ danger });
            main.appendChild(sharkForm.renderDOM());
        }
        catch (err) {
            console.log('Load sharks failed', err);
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

export default SharkFormApp;