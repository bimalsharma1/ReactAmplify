import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

const Navigation = () => (
    <div>
        <Link to="/">
            <h1>Data Distribution</h1>
        </Link>
    </div>
)

export const ConnectedNavigation = connect(state=>state) (Navigation);