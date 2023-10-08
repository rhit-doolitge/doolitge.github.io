/**
 * @fileoverview
 * Provides the JavaScript interactions for all pages.
 *
 * @author 
 * PUT_YOUR_NAME_HERE
 */


/* Main */
/** function and class syntax examples */
 function main() {
	console.log("Ready");

	document.querySelector("#toTopButton").onclick = (event) => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }

	$(document).scroll(function () {
		var y = $(this).scrollTop();
		if (y > 500) {
			$('#toTopButton').fadeIn();
		} else {
			$('#toTopButton').fadeOut();
		}
	
	});
};

main();
