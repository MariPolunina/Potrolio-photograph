//menuburger
const menuburger=document.querySelector('.header__burger');
const headermenu=document.querySelector('.header__menu');

menuburger.addEventListener('click', ()=>{
    headermenu.classList.toggle('visibly');
    menuburger.classList.toggle('displayflex');
})
window.addEventListener('scroll', function(){
    headermenu.classList.remove('visibly');
    menuburger.classList.remove('displayflex');
})
//scroll
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]'));
let animationTime = 500;
let framesCount = 20;

anchors.forEach(function(item) {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
    animationTime=coordY>3000?1300:500;
    let scroller = setInterval(function() {
      let scrollBy = coordY / framesCount;
      if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        window.scrollBy(0, scrollBy);
      } else {
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
      
    }, animationTime / framesCount);
  });
});

const animItems=document.querySelectorAll('._anim-items');
if(animItems.length>0){
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(){
      for(let i=0;i<animItems.length;i++){
          const animItem=animItems[i];
          const animItemHeight=animItem.offsetHeight;
          const animItemOffset=offset(animItem).top;
          const animStart=4;
          let animItemPoint=window.innerHeight - animItemHeight/animStart;
          if(animItemHeight>window.innerHeight){
              animItemPoint=window.innerHeight - window.innerHeight/animStart;
          }
          if((scrollY>animItemOffset-animItemPoint) &&(scrollY<animItemOffset+animItemHeight)){
              animItem.classList.add('_active');
          }
          else{
              animItem.classList.remove('_active');
          }
      }  
    }
    function offset(el){
        const rect=el.getBoundingClientRect(),
            scrollLeft=window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop=window.pageYOffset || document.documentElement.scrollTop;
            return {top:rect.top+scrollTop, left:rect.left+scrollLeft}
    }
    setTimeout(()=>{
        animOnScroll();
    },400 )
}