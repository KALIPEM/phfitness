//text animation -------------

const elts = {
	text1: document.getElementById("text1"),
	text2: document.getElementById("text2")
};

// The strings to morph between. You can change these to anything you want!
const texts = [
	"Who we are",
	"How we Do it",
	"Why we do it",
	
];

// Controls the speed of morphing.
const morphTime = 1;
const cooldownTime = 0.75;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
	morph -= cooldown;
	cooldown = 0;
	
	let fraction = morph / morphTime;
	
	if (fraction > 1) {
		cooldown = cooldownTime;
		fraction = 1;
	}
	
	setMorph(fraction);
}

// A lot of the magic happens here, this is what applies the blur filter to the text.
function setMorph(fraction) {
	// fraction = Math.cos(fraction * Math.PI) / -2 + .5;
	
	elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	fraction = 1 - fraction;
	elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	elts.text1.textContent = texts[textIndex % texts.length];
	elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
	morph = 0;
	
	elts.text2.style.filter = "";
	elts.text2.style.opacity = "100%";
	
	elts.text1.style.filter = "";
	elts.text1.style.opacity = "0%";
}

// Animation loop, which is called every frame.
function animate() {
	requestAnimationFrame(animate);
	
	let newTime = new Date();
	let shouldIncrementIndex = cooldown > 0;
	let dt = (newTime - time) / 1000;
	time = newTime;
	
	cooldown -= dt;
	
	if (cooldown <= 0) {
		if (shouldIncrementIndex) {
			textIndex++;
		}
		
		doMorph();
	} else {
		doCooldown();
	}
}

// Start the animation.
animate();



// Function to handle navigation link underlining
/*function handleNavigationUnderline() {
    const sections = document.querySelectorAll('section'); // Replace 'section' with your section selector
    const navLinks = document.querySelectorAll('.nav-items a'); // Replace '.nav-items a' with your navigation links selector
  
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY <= sectionTop + sectionHeight) {
          current = section.getAttribute('id'); // Assuming your sections have 'id' attributes.
        }
      });
  
      // Remove the 'active' class from all navigation links
      navLinks.forEach((link) => {
        link.classList.remove('active');
      });
  
      // Add the 'active' class to the corresponding navigation link
      const activeLink = document.querySelector(`.nav-items a[href="#${current}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    });
  }
  
  // Call the function when the page loads
  window.addEventListener('load', handleNavigationUnderline);*/