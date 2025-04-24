import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../redux/store/store';


/**
 * just defined the type of useSelctor hook so that we don't have to specify it again while using useSelector
 * instead of useSelector call this hook in the project 
 */
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;