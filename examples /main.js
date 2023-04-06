import StateManager from './StateManager.js';
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
setInterval(hello(),1000);
