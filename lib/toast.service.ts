import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastService = {
	success,
	error,
	info
};

const defaultId = '',
	duration = 4000;

function success(msg: string, options?: any) {
	toast.success(msg, {
		position: toast.POSITION.TOP_CENTER,
		autoClose: options && options.duration ? options.duration : duration,
		toastId: options && options.id ? options.id : defaultId
	});
}

function error(msg: string, options?: any) {
	toast.error(msg, {
		position: toast.POSITION.TOP_CENTER,
		autoClose: options && options.duration !== undefined ? options.duration : duration,
		toastId: options && options.id ? options.id : defaultId
	});
}

function info(msg: string, options?: any) {
	toast.info(msg, {
		position: toast.POSITION.BOTTOM_RIGHT,
		autoClose: options && options.duration !== undefined ? options.duration : duration,
		toastId: options && options.id ? options.id : defaultId,
		// onClick: history.push('/message')
	});
}