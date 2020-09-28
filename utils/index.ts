
export const fetcher = (url,cb) =>
fetch(url).then((r) =>
  r.json().then((data) =>
    cb(data.map((d) => ({
      ...d,
      //lading data may not be available
      land_success: !!(
        d.rocket.first_stage &&
        d.rocket.first_stage.cores &&
        d.rocket.first_stage.cores[0] &&
        d.rocket.first_stage.cores[0].land_success
      ),
    })))
  )
);

//to prevent excessive calls
export const  debounce =(func, wait, immediate) =>{
	let timeout;
	return function() {
		let context = this, args = arguments;
		let later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};