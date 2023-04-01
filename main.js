const DomManipulator = window.Aestron.DomManipulator;

const btn = $('#btn-img');
const center = $('.center')
btn.on('click', function() {
     btn.text('hello')  ;
     btn.css('user-select' ,'none' )
    
}) ;
function hello() {
center.mergeElement('div', {
        class: ['pb1, pt1','pr1'] ,
        replace: false,
        code: '<p> hello am goof </p>',
        style: {
           background: 'yellow',
           color: 'blue' ,
           width: '200px'
        }
});
}
setInterval(hello(),1000000000000);
function createRipple(event) {
  const button = event.currentTarget;

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

const buttons = document.getElementsByTagName("button");
for (const button of buttons) {
  button.addEventListener("click", createRipple);
}
