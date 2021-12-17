import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoginActions from './LoginAction';
import * as RegisterActions from './RegisterAction';
import * as ProductActions from './ProductActions';

export const useActions = () => 
{
    const actions = {
        ...LoginActions,
        ...ProductActions
    };
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
}

export const useActionsRegister = () => 
{
    const dispatch = useDispatch();
    return bindActionCreators(RegisterActions, dispatch);
}
