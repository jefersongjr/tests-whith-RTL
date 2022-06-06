import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const renderWithRouter = (component) => {
    const history = createMemoryHistory ();
    render(
        <Router history={history} >
           { component }
        </Router>
    )
}

export default renderWithRouter;
