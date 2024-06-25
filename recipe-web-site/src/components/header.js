import React from 'react';
import { useSelector } from "react-redux";
const Header = () => {
    const { count } = useSelector(state => ({ count: state.count }));

    return <p>  count:{count}</p>
}

export default Header