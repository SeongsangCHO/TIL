// const React = require('react');
// const ReactDom = require('react-dom');
// const {hot} = require('react-hot-loader/root');
import React from 'react';
import ReactDom from 'react-dom';
import {hot} from 'react-hot-loader/root';

// const NumberBaseball = require('./NumberBaseball');
import Content from './Content'

const Hot = hot(Content);

ReactDom.render(<Hot />, document.querySelector('#root'));